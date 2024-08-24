import React from 'react';
import { EmptyState, Spinner } from '../component/message';
import { UIEvent, DataEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import EventBindingStore from '../../datastore/eventbindingstore'
import { SummaryEvent } from './component.js';

export default class ElementEventBinding extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			//event: eventBinding.event,
			listeners: []
		}
		this.internalListener = [];
	}

	componentDidMount() {
		var _event = this.props.event;
		var self = this;
		this.internalListener.push(DataEvent.addListener('update-element-eventbinding', function(dataEvent) {
			if (dataEvent.message.eventId === _event.id) {
				this.setState(() => {
					return {
						listeners: self.getListenerByEvent(_event)
					}
				});
			}
		}));

		this.setState(() => {
			return {
				listeners: this.getListenerByEvent(_event)
			}
		});
	}

	componentWillUnmount() {
		this.internalListener.forEach(element_id => {
			DataEvent.removeListener(element_id);
		});
	}

	getListenerByEvent(event) {
		var listEventBinding = EventBindingStore.getEventBinding();
		var listeners;
		for (let i = 0; i < listEventBinding.length; i++) {
			if (listEventBinding[i].event.id === event.id) {
				listeners = listEventBinding[i].listeners;
				i = listEventBinding.length;
			}
		}
		return listeners;
	}

	getBindListenerForm(e) {
		UIEvent.dispatch('show-eventbinding-form', {
			actionForm: "edit",
			event_id: parseInt(e.currentTarget.value)
		});
	}

	deleteListener(e) {
		// todo : use some modal component
		let ok = window.confirm(`You are going to delete the listener : ${e.currentTarget.value} ? ' + '\n Are you sure ?`);
		if (ok) {
			//EventMapManager.deleteData('listener', this.state.listener.id);
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
		// console.log("listener endpoint :", this.props.listener);
		//if (this.props.eventBinding.listeners.length) {
		this.state.listeners.forEach((element, idx) => {
			let thingName = ThingStore.getThing({ id: element.thingId })[0].name;
			let endpoint = ThingStore.getListennerEndpoint({ id: element.id });
			// console.log("endpoint : ", endpoint);
			htmlList.push(
				<div key={idx + "-" + endpoint[0].id}
					className="list-group-item pt-2 align-items-center d-flex justify-content-between">
					<div>
						<p className="m-0 mb-1">
							<label className='text-primary me-2'>Thing :</label>
							{thingName}
						</p>
						<p className="m-0 mb-1">
							<label className='text-primary me-2'> Endpoint :</label>
							<label>
								{endpoint[0].url}
							</label>
						</p>
					</div>
					<div>
						<button type="button" className="btn btn-danger btn-sm"
							value={element.id}
							onClick={this.deleteListener.bind(this)}>
							Delete
							<i className="bi bi-trash3-fill ms-2"></i>
						</button>
					</div>
				</div>
			);
		});
		//}
		return (
			<div className="pb-3">
				<label className="bg-white border border-bottom-0 fw-bold p-2 px-3 text-primary" style={{ marginBottom: "-1px" }}>
					Listeners
				</label>
				<div className="bg-white list-group list-group-flush border pt-2 px-2">
					{htmlList}
				</div>
			</div>
		);
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
			<div className="bg-light border mb-4 p-3">

				<SummaryEvent event={this.props.event} />

				{this.state.listeners != null && this.state.listeners.length > 0 ? this.renderListenerEndpoint()
					: <div className="align-items-center bg-white border d-flex mb-4 p-3 rounded">
						<i className="bi bi-info-circle-fill me-3 text-primary fs-3"></i> There is no listener attached to this event
					</div>
				}

				<div className="d-flex justify-content-between">
					<button type="button" className="btn btn-primary px-3"
						value={this.props.event.id}
						onClick={this.getBindListenerForm.bind(this)}>
						Bind listener
						<i className="bi bi-plus-circle ms-2"></i>
						{/*<i className="bi bi-diagram-3-fill ms-2"></i>*/}
					</button>
				</div>

			</div>
		);
	}
}