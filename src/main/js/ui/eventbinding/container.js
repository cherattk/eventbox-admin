import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import ElementEventBinding from './element-eventbinding';
import FormEventBinding from './form-eventbinding';
import EventBindingStore from '../../datastore/eventbindingstore'
import { EmptyState } from '../component/message';
import Thingstore from '../../datastore/thingstore';
import ModalClientCode from './modal-client-code';

export default class ContainerEventBinding extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			listEvent: Thingstore.getEvent()
		}
		this.internalListener = [];

	}

	componentDidMount() {
		var self = this;
		this.internalListener.push(DataEvent.addListener('update-list-eventbinding', function() {
			self.updateEventBinding();
		}));
		/*
		this.internalListener.push(DataEvent.addListener('update-list-thing', function(dataEvent) {
			self.setState({ listEventBinding: EventBindingStore.getEventBinding() });
		}));
		this.internalListener.push(DataEvent.addListener('update-list-listener', function(dataEvent) {
			self.setState({ listEventBinding: EventBindingStore.getEventBinding() });
		}));*/
	}

	componentWillUnmount() {
		this.internalListener.forEach(element_id => {
			DataEvent.removeListener(element_id);
		});
	}

	getListenersByEvent(event) {
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

	updateEventBinding() {
		var self = this;
		EventBindingStore.loadEventBindingStore(function() {
				self.setState({ listEvent: Thingstore.getEvent() });
//			Thingstore.loadEventStore(function() {
//			});
		});
	}

	render() {
		var self = this;
		return (
			<div className="p-4 position-relative">
				{
					this.state.listEvent.length > 0 ?
						this.state.listEvent.map(function(event) {
							var listeners = self.getListenersByEvent(event);
							return <ElementEventBinding
								key={"evl-" + event.id}
								event={event}
								listeners={listeners} />
						}) : <EmptyState text="There is no registered event to listen to" />
				}

				<FormEventBinding />
				
				<ModalClientCode/>
				
			</div>
		)
	}
}