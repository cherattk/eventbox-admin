import React from 'react';
import { EmptyState, Spinner } from '../component/message';
import { UIEvent, DataEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import EventBindingStore from '../../datastore/eventbindingstore'

export default class ElementEventBinding extends React.Component {

	constructor(props) {
		super(props);
		/*var eventBinding = EventBindingStore.getEventBinding({ id: props.eventBindingId });
		this.state = {
			event: eventBinding.event,
			listener: eventBinding.listener
		}*/
		this.__internalListener = [];
	}

	componentDidMount() {}


	componentWillUnmount() {
		this.__internalListener.forEach(element_id => {
			DataEvent.removeListener(element_id);
		});
	}

	editElement(e) {
		UIEvent.dispatch('show-eventbinding-form', {
			actionForm: "edit",
			eventbinding_id: e.currentTarget.value
		});
	}

	deleteElement(e) {
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
		if (this.props.eventBinding.listener.length) {
			this.state.listener.forEach((element, idx) => {
				let thing = ThingStore.getThing({ id: element.thingId });
				let endpoint = ThingStore.getListennerEndpoint({ id: element.id });
				// console.log("endpoint : ", endpoint);
				htmlList.push(
					<div key={idx + "-" + endpoint[0].id}
						className="bg-white border p-3">
						<p>
							<label className='fw-bold'>Thing : </label>
							{thing[0].name}
						</p>
						<p>
							<label className='fw-bold'> Endpoint : </label>
							<label>
								{endpoint[0].url}
							</label>
						</p>
					</div>
				);
			});
		}
		return htmlList;
	}

	render() {
		// if (!this.state.ListThingListener) {
		//   return (<Spinner text="chargement de la list" />)
		// }
		//let event = ThingStore.getEvent({ id: this.state.event });
		var self = this;
		let Thing = ThingStore.getThing({ id: this.props.eventBinding.event.thingId});
		// console.log("Event : " , ThingEvent);
		// console.log("Thing : " , Thing);
		return (
			<div className="bg-light border mb-4 p-3">
				<div className="pb-3">
					<label className="bg-white border border-bottom-0 fw-bold p-2 px-3 text-primary" style={{ marginBottom: "-1px" }}>
						Events
					</label>
					<div className="bg-white border p-3">
						<p className="m-0">
							<label className='text-primary me-2'>Thing : </label>
							{Thing[0].name}
						</p>
						<p className="m-0">
							<label className='text-primary me-2'>Event : </label>
							{this.props.eventBinding.event.name}
						</p>
						<p className="m-0">
							<label className='text-primary me-2'>CloudEvent Type : </label>
							{this.props.eventBinding.event.type}
						</p>
					</div>
				</div>

				<div className="pb-3">
					<label className="bg-white border border-bottom-0 fw-bold p-2 px-3 text-primary" style={{ marginBottom: "-1px" }}>
						Listeners
					</label>
					{ this.props.eventBinding.listener != null &&
						this.props.eventBinding.listener.length > 0 ? this.renderListenerEndpoint()
						: <div className="border bg-white p-3">There is no listener attached to this event </div>
					}
				</div>

				<div className="d-flex justify-content-between">
					<button type="button" className="btn btn-primary me-2 px-3"
						value={this.props.eventBinding.id}
						onClick={this.editElement.bind(this)}>
						Edit
						<i className="bi bi-pencil-square ms-2"></i>
					</button>
					<button type="button" className="btn btn-danger px-3"
						value={this.props.eventBinding.id}
						onClick={this.deleteElement.bind(this)}>
						Delete
						<i className="bi bi-trash3-fill ms-2"></i>
					</button>
				</div>

			</div>
		);
	}
}