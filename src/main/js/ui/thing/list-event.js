import React from 'react';
import { UIEvent, DataEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import { Spinner, EmptyState } from '../component/message';
import Config from '../../config';

export default class ListEvent extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      thingId: "",
      events: []
    };
    // this.DataEventListener = [];
    // this.UIEventListener = [];
  }

  componentDidMount() {
    var self = this;
    // this.DataEventListener.push();
    // this.UIEventListener.push(UIEvent.addListener('get-thing-form', function (uiEvent) {
    //   self.updateListEvent(uiEvent.message.thingId);
    // }));
    // this.DataEventListener.push(DataEvent.addListener('update-list-event', function (uiEvent) {
    //   self.updateListEvent(uiEvent.message.thingId);
    // }));
    // this.DataEventListener.push(DataEvent.addListener('update-element-event', function () {
    //   self.updateListEvent();
    // }));
  }

  // componentWillUnmount() {
  //   this.DataEventListener.forEach(element_id => {
  //     DataEvent.removeListener(element_id);
  //   });
  //   this.UIEventListener.forEach(element_id => {
  //     UIEvent.removeListener(element_id);
  //   });
  // }

  getEventForm(e) {
    UIEvent.dispatch('show-event-form', {
      actionForm: e.currentTarget.dataset.action,
      event_id: parseInt(e.currentTarget.value),
      thingId: this.props.thingId
    });
  }

  deleteEvent(e) {
    let event = ThingStore.getEvent({ id: parseInt(e.target.value) });
    // todo : use some modal component
    var msg = `You are going to delete the event :\n ${event[0].name} \n Are you sure ?`;
    let ok = confirm(msg);
    if (ok) {
      var method = "delete".toLocaleLowerCase();
		var url = Config.url.data.event(method, null, event[0].id);
		ThingStore.saveData(url, method, event[0].id, function () {
		  ThingStore.loadEventStore(function () {
		  	UIEvent.dispatch('alert-msg', { status: "success", text: "Event has been successfully deleted" });
		    DataEvent.dispatch('update-list-event');
		    
		  });
		});
    }
  }

  // updateListEvent(thingId){
  //   var list = ThingStore.getEvent({ thingId:  thingId});
  //   this.setState({
  //     thingId : thingId,
  //     events : list
  //   });
  // }

  renderList() {
    var list = [];
    // if (!this.state.thingId) { return null; }
    // var listevent = ThingStore.getEvent({ thingId: this.state.thingId });
    // return event list
    this.props.events.forEach(function (event, idx) {
      let _key = (new Date()).getTime() + '-' + idx + '-event-list';
      // list.push(<ElementEvent key={_key} thingId={this.state.thingId} event={event} index={idx} />);
      list.push(
        <li key={_key} className="list-group-item d-flex justify-content-between">
          <div> {event.name} </div>
          <div>
            <button className="btn btn-sm btn-primary me-2" value={event.id}
              data-action="edit"
              onClick={this.getEventForm.bind(this)}>
              Edit<i className="bi bi-pencil-square ms-2"></i>
            </button>
            <button className="btn btn-sm btn-danger me-2" value={event.id}
              onClick={this.deleteEvent.bind(this)}>
              Delete<i className="bi bi-trash3-fill ms-2"></i>
            </button>
          </div>
        </li>
      );
    }, this);
    return (
      <ul className='list-group'>
        {list}
      </ul>
    );
  }

  render() {
    return (
      <React.Fragment>
        <button type="button" className="btn btn-primary mb-3"
          data-action="add"
          onClick={this.getEventForm.bind(this)}>
          New Event
          <i className="bi bi-plus-circle ms-2"></i>
        </button>
        {
          this.props.events.length ? this.renderList() :
            <EmptyState text="There is no event" />
        }
      </React.Fragment>
    );
  }
}