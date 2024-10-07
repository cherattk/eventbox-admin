import React from 'react';
import { EmptyState, Spinner } from '../component/message';
import ThingStore from '../../datastore/thingstore';
import EventBindingStore from '../../datastore/eventbindingstore'
import { DataEvent, UIEvent } from '../../lib/ui-event';
import {SummaryEvent} from './summary-event.js';
import Config from '../../config';

export default class ElementEventBinding extends React.Component {

	constructor(props) {
		super(props);
		
		this.DataEventListener = [];
	}

	componentDidMount() {
//		var _event = this.props.event;
//		var self = this;
//		this.DataEventListener.push(DataEvent.addListener('update-element-eventbinding', function(dataEvent) {
//			if (dataEvent.message.eventId === _event.id) {
//				self.setState(() => {
//					return {
//						listeners: self.getListenersByEvent(_event)
//					}
//				});
//			}
//		}));
		
//		this.internalListener.push(DataEvent.addListener('update-list-eventbinding', function() {
//				self.updatelistEvent();
//		}));

//		self.updateEventBinding();
		
	}

	componentWillUnmount() {
		this.DataEventListener.forEach(element_id => {
			DataEvent.removeListener(element_id);
		});
	}

//	updateEventBinding() {
//		console.log("update element-eventbinding state");
//		var self = this;
//		self.setState(() => {
//			return {
//				listeners: self.getListenersByEvent(self.props.event)
//			}
//		});
//	}

//	getListenersByEvent(event) {
//		var listEventBinding = EventBindingStore.getEventBinding();
//		var listeners;
//		for (let i = 0; i < listEventBinding.length; i++) {
//			if (listEventBinding[i].event.id === event.id) {
//				listeners = listEventBinding[i].listeners;
//				i = listEventBinding.length;
//			}
//		}
//		return listeners;
//	}

	getBindListenerForm(e) {
		UIEvent.dispatch('show-eventbinding-form', {
			actionForm: "edit",
			event_id: parseInt(e.currentTarget.value)
		});
	}

	deleteListener(event_id, listener_id) {
		// todo : use modal component
		var self = this;
		let ok = window.confirm(`You are going to delete the listener : .... \n Are you sure ?`);
		if (ok) {
			var method = "delete".toLocaleLowerCase();
			var url = Config.url.data.eventbinding(method, event_id, listener_id);
			ThingStore.sendAjaxRequest(url, method, "", function(ajaxResponse) {
				UIEvent.dispatch('alert-msg', { status: "success", text: "have been successfully deleted" });
				DataEvent.dispatch('update-list-eventbinding');
//				EventBindingStore.loadEventBindingStore(function() {
//					self.updateEventBinding();
//				});
			});
		}
	}

	/**
	 * Check if the listener is an ACTIVE listener
	 * otherwise, set the listener as DEACTIVED
	 */
	/*getListenerStatus(listThingListener) {
		var __activeListener = {
			active: false, message: ""
		};
		let __allUnactive = listThingListener.every((el) => {
			return (!el.active);
		});
		if (!__allUnactive) {
			__activeListener.active = !__allUnactive;
			__activeListener.message = __allUnactive ? "all listeners attached to the event are disabled" : "";
		}
		else {
			__activeListener.message = "there is no listener endpoint attached to the event";
		}
		return __activeListener;
	}*/

	renderListenerEndpoint() {
		var htmlList = [];
		var self = this;
		// console.log("listener endpoint :", this.props.listener);
		//if (this.props.eventBinding.listeners.length) {
		this.props.listeners.forEach((element, idx) => {
			// console.log("endpoint : ", endpoint);
			htmlList.push(
				<div key={idx + "-" + element.id}
					className="align-items-center d-flex justify-content-between py-2 px-3 border-bottom">
					<div>
						<p className="m-0 mb-1">
							<label className='text-primary me-2'>Thing :</label>
							{element.thing.name}
						</p>
						<p className="m-0 mb-1">
							<label className='text-primary me-2'> Endpoint :</label>
							<label>
								{element.url}
							</label>
						</p>
					</div>
					<div>
						<button type="button" className="btn btn-danger btn-sm"
							onClick={this.deleteListener.bind(this, self.props.event.id, element.id)}>
							Delete
							<i className="bi bi-trash3-fill ms-2"></i>
						</button>
					</div>
				</div>
			);
		});
		//}
		return htmlList;
	}

	render() {
		// if (!this.state.ListThingListener) {
		//   return (<Spinner text="chargement de la list" />)
		// }
		//let event = ThingStore.getEvent({ id: this.state.event });
		var self = this;
		// console.log("Event : " , ThingEvent);
		// console.log("Thing : " , Thing);
		return (
			<div className="border bg-light mb-4 p-3 rounded shadow-sm">

				<SummaryEvent event={this.props.event}/>


				<div className="pb-3">
					<label className="bg-white border border-bottom-0 fw-bold p-2 px-3 text-primary" style={{ marginBottom: "-1px" }}>
						Listeners
					</label>
					
					<div className="bg-white border">					
						{ this.props.listeners != null && this.props.listeners.length > 0 ? this.renderListenerEndpoint()
								: <div className="align-items-center d-flex p-3">
									<i className="bi bi-info-circle-fill me-3 text-primary fs-3"></i> 
									There is no listener for this event
									</div>
						}
					</div>
					
				</div>
				

				<div className="d-flex justify-content-between">
					<button type="button" className="btn btn-primary px-3"
						value={this.props.event.id}
						onClick={this.getBindListenerForm.bind(this)}>
						Register Listener
						<i className="bi bi-plus-circle ms-2"></i>
						{/*<i className="bi bi-diagram-3-fill ms-2"></i>*/}
					</button>
				</div>

			</div>
		);
	}
}