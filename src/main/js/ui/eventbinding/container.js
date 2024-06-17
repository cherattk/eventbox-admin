import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import ElementEventBinding from './element-eventbinding';
import FormEventBinding from './form-eventbinding';
import EventBindingStore from '../../datastore/eventbindingstore'
import { EmptyState } from '../component/message';
import Thingstore from '../../datastore/thingstore';

export default class ContainerEventBinding extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			listEventBinding: EventBindingStore.getEventBinding(),
			//listEvent : Thingstore.getEvent()
		}
		this.internalListener = [];

	}

	componentDidMount() {
		var self = this;
		this.internalListener.push(DataEvent.addListener('update-list-eventbinding', function(dataEvent) {
			self.setState({ listEventBinding: EventBindingStore.getEventBinding() });
		}));
		/*this.internalListener.push(DataEvent.addListener('update-list-event', function(dataEvent) {
			self.setState({ listEventBinding: EventBindingStore.getEventBinding() });
		}));
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

	render() {
		return (
			<div className="p-4 position-relative">
				{
					this.state.listEventBinding.length > 0 ?
						this.state.listEventBinding.map(function(eventBinding) {
							return <ElementEventBinding
								key={"evl-" + eventBinding.id}
								eventBinding={eventBinding} />
						}) : <EmptyState text="There is no registered event to listen to" />
				}

				<FormEventBinding />
			</div>
		)
	}
}