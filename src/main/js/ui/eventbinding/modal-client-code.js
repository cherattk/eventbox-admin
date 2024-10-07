import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import Schema from '../../datastore/schema';
import ThingStore from '../../datastore/thingstore';

export default class ModalClientCode extends React.Component {

	constructor(props) {
		super(props);

		this.state = this.setInitialState();
		this.listenerIdentifier = [];

		// this.selectListenerEndpoint = this.selectListenerEndpoint.bind(this);
	}

	componentDidMount() {
		var self = this;
		$(this.modal).on('hide.bs.modal', function() {
			self.setState(function() {
				return self.setInitialState();
			});
		});
		//===============================================
		this.listenerIdentifier.push(UIEvent.addListener('show-client-code', function(uiEvent) {
			var event = ThingStore.getEvent({ id: uiEvent.message.event_id })[0];
			self.setState(function() {
				return {
					event: event
				}
			}, function() {
				$(self.modal).modal('show');
			});

		})
		);
	}

	setInitialState() {
		return {
			event: Schema.eventSchema()
		}
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


	renderRawFormat() {
		var _cleanedEventAttributes = JSON.parse(JSON.stringify(this.state.event));
		delete _cleanedEventAttributes.thing;
		delete _cleanedEventAttributes.key;
		delete _cleanedEventAttributes.name;
		delete _cleanedEventAttributes.description;
		
		_cleanedEventAttributes.id = "";
		return (
			<div className="code-panel rounded">
				<pre>
					{JSON.stringify(_cleanedEventAttributes , null, 2)}
				</pre>
			</div>
		)
	}


	render() {

		return (
			<div className="modal fade app-modal-form"
				tabIndex="-1" role="dialog"
				aria-hidden="true"
				ref={node => (this.modal = node)}>

				<div className="modal-dialog modal-xl" role="document">
					<div className="modal-content">
						<div className="modal-header text-primary">
							<h5 className="modal-title ">
								Cloudevent Attributes
							</h5>
							<button type="button" className="btn-close" onClick={this.close.bind(this)}>
							</button>
						</div>
						<div className="modal-body">
							{this.renderRawFormat()}
						</div>
					</div>
				</div>
			</div >
		)

	}

}