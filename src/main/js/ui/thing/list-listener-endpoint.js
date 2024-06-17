import React from 'react';
import { WarningMessage, EmptyState } from '../component/message';
import ThingStore from '../../datastore/thingstore';
import { UIEvent, DataEvent } from '../../lib/ui-event';
import Config from '../../config';

export default class ListListenerEndpoint extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   thingId: null
    // }

    // this.DataEventListener = [];
    // this.UIEventListener = [];
  }

  componentDidMount() {
    var self = this;
    // this.DataEventListener.push(DataEvent.addListener('update-list-listener', function () {
    //   // when adding a new endpoint
    //   // self.forceUpdate();
    // }));
    // this.DataEventListener.push(DataEvent.addListener('update-element-listener', function () {
    //   // when updating an endpoint
    //   // self.forceUpdate();
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

  getListenerForm(e) {
    UIEvent.dispatch('get-listener-form', {
      actionForm: e.currentTarget.dataset.action,
      thingId: this.props.thingId,
      listener_id: parseInt(e.currentTarget.value)
    });
  }

  deleteListener(e) {
    let listener = ThingStore.getListennerEndpoint({id : parseInt(e.target.value)});
    // todo : use some modal component
    var msg = `You are going to delete the listener :\n ${listener[0].url} \n Are you sure ?`;
    let ok = confirm(msg);
    if (ok) {
      var method = "delete".toLocaleLowerCase();
		var url = Config.url.data.listener_endpoint(method, null, listener[0].id);
		ThingStore.saveData(url, method, listener[0].id, function () {
		  ThingStore.loadListenerEndpointStore(function () {
		    DataEvent.dispatch('update-list-listener');
		    UIEvent.dispatch('alert-msg', { status: "success", text: "listener endpoint has been successfully deleted" });
		  });
		});
    }
  }


  renderListenerEndpoint() {
    // set list of endpoint
    var list = [];
    this.props.endpoints.forEach((listener, idx) => {
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
          this.props.endpoints.length ? this.renderListenerEndpoint() :
            <EmptyState text="There is no listening endpoint" />}
      </React.Fragment>
    );
  }
}