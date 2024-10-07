import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import EventBindingStore from '../../datastore/eventbindingstore';
import { EmptyState } from '../component/message';
import Config from '../../config';
import { SummaryEvent } from './summary-event.js';
import Schema from '../../datastore/schema';

export default class FormEventBinding extends React.Component {

	constructor(props) {
		super(props);

		this.state = this.setInitialState();
		this.listenerIdentifier = [];

		// this.selectListenerEndpoint = this.selectListenerEndpoint.bind(this);
	}

	setInitialState() {
		return {
			event: Schema.eventSchema(),
			freeListener: [],
			activeEndpoint: []
		}
	}

	componentDidMount() {
		var self = this;
		$(this.modal).on('hide.bs.modal', function() {
			self.setState(function() {
				return self.setInitialState();
			});
		});
		//===============================================
		this.listenerIdentifier.push(UIEvent.addListener('show-eventbinding-form', function(uiEvent) {
			var _event = ThingStore.getEvent({ id: uiEvent.message.event_id })[0];
			/////////////////////////////////////////////////
			// GET "FREE"" Listeners Endpoint
			/////////////////////////////////////////////////
			var bindedListener = self.getBindedListenerToEvent(_event.id);
			var freeListener = self.getFreeListener(bindedListener , _event.thing.id);

			self.setState(function() {
				return {
					event: _event,
					freeListener: freeListener,
					activeEndpoint: []
				}
			}, function() {
				$(self.modal).modal('show');
			});

		})
		);
	}

	componentWillUnmount() {
		this.listenerIdentifier.forEach(element_id => {
			UIEvent.removeListener(element_id);
		});
		this.listenerIdentifier = [];
	}

	close() {
		let self = this;
		this.setState(function() {
			return self.setInitialState();
		}, function() {
			$(self.modal).modal('hide');
		});
	}

	saveListener(e) {
		e.preventDefault();
		var self = this;
		var method = "post".toLocaleLowerCase();
		var url = Config.url.data.eventbinding(method);
		const data = {
			eventId: this.state.event.id,
			listenersId: this.state.activeEndpoint
		}
		console.log(data);

		ThingStore.saveData(url, method, data, function(ajaxResponse) {
			EventBindingStore.loadEventBindingStore(function() {
				DataEvent.dispatch('update-list-eventbinding', { eventId: data.eventId });
				UIEvent.dispatch('alert-msg', { status: "success", text: "have been successfully saved" });
				self.close();
			});
		});
	}

	getFreeListener(bindedListeners , eventThingId) {
		
		var allListener = ThingStore.getListennerEndpoint();

		var freeListener;
		
		if (bindedListeners.length > 0) {
			freeListener = allListener.filter((_listener) => {
				return (bindedListeners.indexOf(_listener.id) === -1);
			});
		}		
		else {
			freeListener = allListener;
		}

		// prevent a loop , 
		// an event can not listen to its own events;
		var result = freeListener.filter((_listener) => {
			return _listener.thing.id !== eventThingId;
		});

		return result;
	}

	getBindedListenerToEvent(eventId) {
		var listEventBinding = EventBindingStore.getEventBinding();
		var binded_listeners = [];
		for (let i = 0; i < listEventBinding.length; i++) {
			if (listEventBinding[i].event.id === eventId) {
				binded_listeners = listEventBinding[i].listeners.map(el => el.id);
				i = listEventBinding.length;
			}
		}
		return binded_listeners;
	}

	selectListenerEndpoint(ev) {
		// ev.preventDefault();
		const input = ev.currentTarget;
		var listenerId = parseInt(input.value);
		if (input.checked) {
			if (this.state.activeEndpoint.indexOf(input.value) == -1) {
				this.state.activeEndpoint.push(listenerId);
			}
		} else {
			this.state.activeEndpoint = this.state.activeEndpoint.filter((listener_id) => {
				return (listener_id != listenerId);
			});
		}
		this.setState({ activeEndpoint: this.state.activeEndpoint });
	}

	renderListenerEndpoint() {
		// set list of endpoint
		var htmlList = this.state.freeListener.map((listener, idx) => {
			var thingName = ThingStore.getThing({ id: listener.thing.id })[0].name;
			var key = listener.id;
			var _checked = (this.state.activeEndpoint.indexOf(listener.id) != -1);
			return (
				<div key={key} className="list-group-item pt-2">
					<div className="m-0 mb-3">
						<label className='text-primary me-2' style={{ textAlign: "right", width: "80px" }}>Thing :</label>
						{thingName}
					</div>
					<div className="align-items-center d-flex">
						<label className='text-primary me-2' style={{ textAlign: "right", width: "80px" }}>Endpoint :</label>
						<div className="form-check flex-grow-1">
							<input className="form-check-input" name="listener_endpoint" type="checkbox"
								id={listener.id}
								value={listener.id}
								checked={_checked}
								onChange={this.selectListenerEndpoint.bind(this)} />
							<label className="form-check-label" htmlFor={listener.id}>
								<span className="checkmark"></span>
								{listener.url}
							</label>
						</div>
					</div>
				</div>
			);
		}, this);

		return (
			<div className="pb-3">
				<label className="bg-white border border-bottom-0 fw-bold p-2 px-3 text-primary" style={{ marginBottom: "-1px" }}>
					Listener(s)
				</label>
				<div className="checklist bg-white list-group list-group-flush border pt-2 px-2">
					{htmlList}
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="modal fade app-modal-form" id="formListener"
				tabIndex="-1" role="dialog"
				aria-hidden="true"
				ref={node => (this.modal = node)}>

				<div className="modal-dialog modal-xl" role="document">
					<div className="modal-content">
						<div className="modal-header bg-light px-4 text-primary">
							<h5 className="modal-title " id="formListenerLabel">
								Register Listeners
							</h5>
							<button type="button" className="btn-close" onClick={this.close.bind(this)} aria-label="Close">
							</button>
						</div>
						<div className="modal-body px-4">
							<SummaryEvent event={this.state.event} />
							{
								this.state.freeListener.length > 0 ? this.renderListenerEndpoint() : null
							}
						</div>
						<div className="modal-footer justify-content-start">
							<button type="button" className="btn btn-success"
								onClick={this.saveListener.bind(this)}>Save</button>
							<button type="button" className="btn btn-secondary"
								onClick={this.close.bind(this)}>Cancel</button>
						</div>
					</div>
				</div>
			</div >
		)
	}
}