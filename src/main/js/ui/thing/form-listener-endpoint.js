import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import DataSchema from '../../datastore/schema';
import Config from '../../config';

export default class FormListenerEndpoint extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      actionForm: "",
      thing: DataSchema.thingSchema(),
      listener: DataSchema.listenerEndpointSchema()
    };
    this.__eventsetListener = [];
  }

  componentWillUnmount() {
    this.__eventsetListener.forEach(element_id => {
      UIEvent.removeListener(element_id);
    });
  }

  componentDidMount() {
    var self = this;
    //===========================================================
    this.__eventsetListener.push(UIEvent.addListener('get-listener-form', function (uiEvent) {
      var listener;
      // edit listener
      if (uiEvent.message.actionForm == "edit") {
        let _listener = ThingStore.getListennerEndpoint({ id: uiEvent.message.listener_id });
        if (_listener.length > 0) listener = _listener[0];
      }
      // create a new one
      else if (uiEvent.message.actionForm == "add") {
        listener = DataSchema.listenerEndpointSchema();
        listener.thingId = uiEvent.message.thingId;
      }
      self.setState(function () {
        return {
          actionForm: uiEvent.message.actionForm,
          thing: uiEvent.message.thingId,
          listener: listener
        };
      }, function () {
        $(self.modal).modal('show');
      });
    }));
  }

  close() {
    var self = this;
    this.setState(function () {
      return {
        actionForm: "",
        thing: "",
        listener: DataSchema.listenerEndpointSchema()
      };
    }, function () {
      $(self.modal).modal('hide');
    });
  }

  isValidURL(inputName) {
    return !!inputName;
  }

  saveForm(e) {
    e.preventDefault();
    var self = this;
    var method = "";
    var url = "";
    if (this.state.actionForm == "edit") {
      method = "put".toLocaleLowerCase();
      url = Config.url.data.listener_endpoint(method, this.state.thingId, this.state.listener.id);
    }
    else if (this.state.actionForm == "add") {
      method = "post".toLocaleLowerCase();
      url = Config.url.data.listener_endpoint(method, this.state.thingId);
    }
    ThingStore.saveData(url, method, this.state.listener, function () {
      ThingStore.loadListenerEndpointStore(function () {
        DataEvent.dispatch('update-list-listener');
        UIEvent.dispatch('alert-msg', { status: "success", text: "Listener Endpoint has been successfully saved" });
        self.close();
      });
    });
  }

  listenerURLValue(event) {
    this.state.listener.url = event.target.value;
    this.setState(this.state);
  }

  render() {
    return (
      <div className="modal fade app-modal-form"
        tabIndex="-1" role="dialog"
        ref={node => (this.modal = node)}>

        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Listener Endpoint
              </h5>
            </div>

            <form>
              <div className="modal-body">
                <div className="form-group">
                  {/* <label htmlFor="thing-name" className="col-form-label">Listener:</label> */}
                  <input type="text" className="form-control mb-3"
                    value={this.state.listener.url} placeholder="ex: mydomain.com/service/endpoint"
                    onChange={this.listenerURLValue.bind(this)}/>
                </div>
              </div>

              <div className="modal-footer justify-content-between">
                <button type="submit" className="btn btn-success"
                  onClick={this.saveForm.bind(this)}>Save</button>
                <button type="reset" className="btn btn-secondary"
                  onClick={this.close.bind(this)}>Cancel</button>
              </div>
            </form>

          </div>
        </div>
      </div>
    )
  }
}