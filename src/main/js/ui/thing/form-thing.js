import React from 'react';
import ListEvent from './list-event';
import ListListener from './list-listener-endpoint';

import { DataEvent, UIEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import DataSchema from '../../datastore/schema';
import Config from '../../config';

export default class FormThing extends React.Component {
	constructor(props) {
		super(props);

		this.state = this.getInitialState();
		this.DataEventListener = [];
		this.UIEventListener = [];
	}

	getInitialState() {
		return {
			show: false,
			thing: DataSchema.thingSchema(),
			events: [],
			endpoints: []
		}
	}

	componentDidMount() {
		var self = this;
		///////////////////////////////////////////////////////////
		$(this.modal).on('hide.bs.modal', function() {
			return self.close();
		});
		///////////////////////////////////////////////////////////
		UIEvent.addListener('get-thing-form', function(uiEvent) {
			var _thing = DataSchema.thingSchema();
			if (uiEvent.message.thingId) {
				var tmp_thing = ThingStore.getThing({ id: uiEvent.message.thingId });
				if (tmp_thing.length > 0) {
					_thing = tmp_thing[0];
				}
			}
			self.setState(function() {
				return {
					show: uiEvent.message.show,
					thing: _thing,
					events: ThingStore.getEvent({ thingId: uiEvent.message.thingId }),
					endpoints: ThingStore.getListennerEndpoint({ thingId: uiEvent.message.thingId })
				}
			});
		});

		this.DataEventListener.push(DataEvent.addListener('update-list-event', function(uiEvent) {
			self.updateListEvent();
		}));
		this.DataEventListener.push(DataEvent.addListener('update-list-listener', function(uiEvent) {
			self.updateListEndpoint();
		}));

	}

	componentWillUnmount() {
		this.DataEventListener.forEach(element_id => {
			DataEvent.removeListener(element_id);
		});
		this.UIEventListener.forEach(element_id => {
			UIEvent.removeListener(element_id);
		});
	}

	updateListEvent() {
		this.setState(function() {
			return {
				events: ThingStore.getEvent({ thingId: this.state.thing.id })
			}
		});
	}

	updateListEndpoint() {
		this.setState(function() {
			return {
				endpoints: ThingStore.getListennerEndpoint({ thingId: this.state.thing.id })
			}
		});
	}

	close() {
		let self = this;
		this.setState(function() {
			return self.getInitialState();
		}, function() {
			UIEvent.dispatch('show-thing-list', { show: true });
		});
	}

	saveThing(ev) {
		ev.preventDefault();
		var thingName = this.state.thing.name.trim();
		if (thingName.length == 0) {
			alert('The name of the thing can not be empty');
			return;
		}
		// console.log(this.state.thing);
		// return;
		var method = "put".toLocaleLowerCase();
		var url = Config.url.data.thing(method, this.state.thing.id);
		ThingStore.saveData(url, method, this.state.thing, function() {
			ThingStore.loadThingStore(function() {
				DataEvent.dispatch('update-list-thing');
				UIEvent.dispatch('alert-msg', { status: "success", text: "Thing has been successfully updated" });
			});
		});
	}

	formValue(event) {
		this.state.thing[event.target.name] = event.target.value;
		this.setState(this.state);
	}

	deleteThing() {
		let thingName = this.state.thing.name;
		// todo : use some modal component
		var msg = `You are going to delete the thing : \n "${thingName}" \n Are you sure ?`;
		let ok = confirm(msg);
		if (ok) {
			var method = "delete".toLocaleLowerCase();
			var url = Config.url.data.thing(method, this.state.thing.id);
			var self = this;
			ThingStore.saveData(url, method, this.state.thing.id, function() {
				ThingStore.loadThingStore(function() {
					DataEvent.dispatch('update-list-thing');
					UIEvent.dispatch('alert-msg', { status: "success", text: "Thing has been successfully deleted" });
					self.close();
				});
			});
		}
	}

	render() {
		let show = this.state.show ? '' : 'd-none';
		// let this.state.thing = this.state.thing;
		return (
			<div className={"form-thing h-100 bg-white " + show}>
				<button type="button" onClick={this.close.bind(this)} aria-label="Close"
					className="align-items-center btn btn-light d-flex mb-4 pe-3 py-0 rounded-pill">
					<i className="bi bi-arrow-left-short fs-3"></i>
					<span>Back to Thing List</span>
				</button>
				<div className='d-flex align-items-center mb-3 py-3 bg-light'>
					<h5 className="h5 m-0 px-4 text-primary">
						{this.state.thing.name ? this.state.thing.name : "New Thing"}
					</h5>
				</div>

				<nav>
					<div className="nav nav-tabs" role="tablist">
						<a className="nav-item nav-link active me-3 border-start border-top border-end"
							data-bs-toggle="tab" href='#thing-detail' role="tab">
							Thing
						</a>
						<a className="nav-item nav-link me-3 border-start border-top border-end"
							data-bs-toggle="tab" href='#thing-event' role="tab">
							Events
						</a>
						<a className="nav-item nav-link me-3 border-start border-top border-end"
							data-bs-toggle="tab" href='#thing-listener-endpoint' role="tab">
							Listening Endpoint
						</a>
					</div>
				</nav>

				<div className="tab-content detail-thing">
					<div className="tab-pane fade show active p-3" id='thing-detail' role="tabpanel">
						<form onSubmit={this.saveThing.bind(this)}>
							<div className='form-group'>
								<label className="form-label text-primary">Name</label>
								<input type="text" className="form-control mb-3" name="name" value={this.state.thing.name}
									onChange={this.formValue.bind(this)} />
							</div>
							<div className='d-flex mb-3 py-3 align-items-center'>
								<label className="pe-3 text-primary">Category : </label>
								<div className="check-btn border-end me-3 pe-3">
									<input className="d-none" type="radio" value="WEB_SERVICE" name="category" id="thing_category_ws"
										onChange={this.formValue.bind(this)} checked={this.state.thing.category == 'WEB_SERVICE'} />
									<label className="py-1 px-3 rounded-pill" htmlFor="thing_category_ws">
										Web Service
									</label>
								</div>
								<div className="check-btn">
									<input className="d-none" type="radio" value="DEVICE" name="category" id="thing_category_device"
										onChange={this.formValue.bind(this)} checked={this.state.thing.category == 'DEVICE'}/>
									<label className="py-1 px-3 rounded-pill" htmlFor="thing_category_device">
										Device
									</label>
								</div>
							</div>
							<div className='form-group'>
								<label className="form-label text-primary">Description </label>
								<textarea className="form-control mb-3" name="description" value={this.state.thing.description}
									onChange={this.formValue.bind(this)}></textarea>
							</div>
							<div className='d-flex justify-content-between'>
								<button type="submit" value="Save" className="btn btn-success">
									Save
									<i className="bi bi-check-lg ms-2"></i></button>
								<button type="reset" className="btn btn-danger"
									onClick={this.deleteThing.bind(this)}>
									Delete
									<i className="bi bi-trash3-fill ms-2"></i>
								</button>
							</div>
						</form>
					</div>

					<div className="tab-pane fade py-3" id='thing-event' role="tabpanel">
						<p className='bg-light p-3'>
							The events that are published by the present thing
						</p>
						{
							<ListEvent thingId={this.state.thing.id} events={this.state.events} />
							// <ListEvent/>
						}

					</div>
					<div className="tab-pane fade py-3" id='thing-listener-endpoint' role="tabpanel">
						<p className='bg-light p-3'>
							The listening endpoints through which the present thing receives events
							that it's listening for.
						</p>

						{
							<ListListener thingId={this.state.thing.id} endpoints={this.state.endpoints} />
						}

					</div>
				</div>

			</div >
		);

	}
}