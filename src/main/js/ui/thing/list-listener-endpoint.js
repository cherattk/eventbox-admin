import React from 'react';
import { WarningMessage, EmptyState } from '../component/message';
import ThingStore from '../../datastore/thingstore';
import { UIEvent, DataEvent } from '../../lib/ui-event';
import Config from '../../config';

export default class ListListenerEndpoint extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			endpoints: []
		}
		this.DataEventListener = [];
		this.UIEventListener = [];
	}

	componentDidMount() {
		var self = this;
		this.DataEventListener.push(DataEvent.addListener('update-list-listener', function(dataEvent) {
			self.updateListListener(dataEvent.message.thingId);
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

	updateListListener(thingId) {
		if (this.props.thingId === thingId) {
			var list = ThingStore.getListenerByArrayCriteria(['thing.id', thingId]);
			this.setState({
				endpoints: list
			});
		}
	}

	getListenerForm(e) {
		UIEvent.dispatch('get-listener-form', {
			actionForm : e.currentTarget.dataset.action,
			thingId : this.props.thingId,
			listener_id : parseInt(e.currentTarget.value)
		});
	}

	deleteListener(e) {
		let listener = ThingStore.getListenerByArrayCriteria(['id', parseInt(e.target.value)]);
		// todo : use some modal component
		var msg = `You are going to delete the subscribing endpoint :\n ${listener[0].url} \n Are you sure ?`;
		let ok = confirm(msg);
		var self = this;
		if (ok) {
			var method = "delete".toLocaleLowerCase();
			var url = Config.url.data.listener_endpoint(method, listener[0].id);
			ThingStore.saveData(url, method, null , function() {
				ThingStore.loadListenerEndpointStore(function() {
					self.updateListListener(self.props.thingId);
					DataEvent.dispatch('update-list-listener');
					DataEvent.dispatch('update-list-eventbinding');
					UIEvent.dispatch('alert-msg', { status: "success", text: "listening endpoint has been successfully deleted" });
				});
			});
		}
	}


	renderListenerEndpoint() {
		// set list of endpoint
		var list = [];
		this.state.endpoints.forEach((listener, idx) => {
			let optionID = "listener-item-" + idx;
			list.push(
				<li key={optionID} className="list-group-item d-flex justify-content-between">
					<div>{listener.url}</div>
					<div>
						<button className="btn btn-primary btn-sm me-3"
							value={listener.id}
							data-action="edit"
							onClick={this.getListenerForm.bind(this)}>
							Edit<i className="bi bi-pencil-square ms-2"></i>
						</button>
						<button className="btn btn-sm btn-danger"
							value={listener.id}
							onClick={this.deleteListener.bind(this)}>
							Delete<i className="bi bi-trash3-fill ms-2"></i>
						</button>
					</div>
				</li>);
		});
		return (
			<ul className="list-group">
				{list}
			</ul>
		);
	}

	render() {
		return (
			<React.Fragment>
				<button type="button" className="btn btn-primary mb-3"
					data-action="add"
					onClick={this.getListenerForm.bind(this)}>
					New Endpoint
					<i className="bi bi-plus-circle ms-2"></i>
				</button>
				{
					this.state.endpoints.length ? this.renderListenerEndpoint() :
						<EmptyState text="There is no subscribing endpoint" />
				}
			</React.Fragment>
		);
	}
}