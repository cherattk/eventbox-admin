import React from 'react';
// import ElementThing from './element-thing';
import ThingStore from '../../datastore/thingstore';
import { UIEvent, DataEvent } from '../../lib/ui-event';
import { Spinner, EmptyState } from '../component/message';
import Schema from '../../datastore/schema';
import Config from '../../config';

export default class ListThing extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			show: true,
			active: "",  // id of the selected item in the list
			list_thing: ThingStore.getThing(),
			thing: { name: "" }
		};

		this.listenerArray = { ui: [], data: [] };
	}

	componentDidMount() {
		var self = this;
		var id_1 = DataEvent.addListener('update-list-thing', function() {
			self.updateThingList();
		});
		this.listenerArray.data.push(id_1);
		//
		// var id_2 = DataEvent.addListener('update-element-thing', function () {
		//   self.updateThingList();
		// });
		// this.listenerArray.data.push(id_2);
		//
		var id_3 = UIEvent.addListener('show-thing-list', function(uiEvent) {
			self.setState({ show: uiEvent.message.show });
		});
		this.listenerArray.ui.push(id_3);
	}

	componentWillUnmount() {
		this.listenerArray.data.forEach(element_id => {
			DataEvent.removeListener(element_id);
		});
		this.listenerArray.ui.forEach(element_id => {
			UIEvent.removeListener(element_id);
		});
	}

	updateThingList() {
		let list_thing = ThingStore.getThing();
		this.setState(function() {
			return {
				loading: false,
				list_thing: list_thing
			}
		});
	}

	getThingForm(thingId) {
		// UIEvent.dispatch('get-thing-form', { id: null });
		// var __thing_id = thingId ? thingId : util.generateEventMapID('thing');
		UIEvent.dispatch('get-thing-form', {
			show: true,
			thingId: thingId
		});
		this.setState(function() {
			return {
				show: false,
				active: thingId
			}
		});
	}

	renderList() {
		var list = [];
		this.state.list_thing.forEach(function(thing, idx) {
			let key = (new Date()).getTime() + '-' + idx + '-thing-list-';
			// let active = this.state.active == thing.id ? ' active' : '';
			list.push(
				<button key={key} type="button"
					className="list-group-item list-group-item-action"
					onClick={this.getThingForm.bind(this, thing.id)}>
					{thing.name}
					<span className='badge text-bg-primary ms-3'>{thing.category.replace("_", " ").toLowerCase()}</span>
				</button>
			);
			// list.push(<ElementThing key={_key} thingId={thing.id} index={idx + 1} />);
		}, this);

		return (
			<div className="list-group">
				{list}
			</div>
		);
	}

	createThing(ev) {
		ev.preventDefault();
		ev.target.elements['name'].blur();
		var thingName = this.state.thing.name.trim();
		if (thingName.length == 0) {
			alert('The name of the thing can not be empty');
			return;
		}
		var thing = { name: thingName };
		var method = "post".toLocaleLowerCase();
		var url = Config.url.data.thing(method);
		ThingStore.saveData(url, method, thing, function() {
			ThingStore.loadThingStore(function() {
				DataEvent.dispatch('update-list-thing');
				UIEvent.dispatch('alert-msg', { status: "success", text: "Thing has been successfully added" });
				ev.target.reset();
			});
		});
	}

	formValue(event) {
		this.state.thing[event.target.name] = event.target.value;
		this.setState(this.state);
	}

	render() {
		return (
			<div className={this.state.show ? "" : "d-none"}>
				<form onSubmit={this.createThing.bind(this)}>
					<div className="form-floating mb-3">
						<input type="text" className="form-control" name="name" id="new_thing_name" placeholder="Thing name"
							onChange={this.formValue.bind(this)} 
							required />
						<label htmlFor="new_thing_name">New Thing</label>
					</div>

					<button type="submit" className="btn btn-success mb-2">
						Save
						<i className="bi bi-plus-circle ms-2"></i>
					</button>
				</form>
				<hr />
				{
					this.state.loading ? <Spinner text="Loading Thing List ..." /> :
						(this.state.list_thing.length ? this.renderList() :
							<EmptyState text="There is no registered thing" />)
				}
			</div >
		);
	}
}