import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import EventBindingStore from '../../datastore/eventbindingstore';
import { EmptyState } from '../component/message';
import Config from '../../config';

export default class FormEventBinding extends React.Component {

  constructor(props) {
    super(props);

    this.state = this.setInitialState();
    this.__listenerIdentifier = [];

    // this.selectListenerEndpoint = this.selectListenerEndpoint.bind(this);
  }

  setInitialState() {
    return {
      actionForm: null,
      bindingId: "",
      event: [],
      listener: [],
      activeEvent: null,
      activeEndpoint: []
    }
  }

  componentDidMount() {
    var self = this;
    $(this.modal).on('hide.bs.modal', function () {
      self.setState(function () {
        return self.setInitialState();
      });
    });
    //===============================================
    this.__listenerIdentifier.push(UIEvent.addListener('show-eventbinding-form', function (uiEvent) {
      if (uiEvent.message.actionForm === "edit") {
        var eventbinding = EventBindingStore.getEventBinding({ id: uiEvent.message.eventbinding_id });
        var _event = ThingStore.getEvent({ id: eventbinding[0].event.id });
        var _activeEndpoint = eventbinding[0].listener.map(function (_listener) {
          return (_listener.id);
        });
        const listener = ThingStore.getListennerEndpoint().sort((a, b) => {
          return (_activeEndpoint.indexOf(a.id) != -1) ? -1 : 1;
        });

        self.setState(function () {
          return {
            actionForm: uiEvent.message.actionForm,
            bindingId: eventbinding[0].id,
            event: _event,
            listener: listener,
            activeEndpoint: _activeEndpoint,
            activeEvent: _event[0].id
          }
        }, function () {
          $(self.modal).modal('show');
        });
      }
      else if (uiEvent.message.actionForm === "add") {
        ///////////////////////////////////////////////////////////
        // Get the id of the events that are binded to listener
        ///////////////////////////////////////////////////////////
        var bindedEventID = EventBindingStore.getEventBinding().map(function (el) {
          return (el.event.id);
        });
        ///////////////////////////////////////////////////////////
        // Get "a free events" THAT ARE NOT binded to listener
        //////////////////////////////////////////////////////////
        var _event = ThingStore.getEvent().filter(function (el) {
          return (bindedEventID.indexOf(el.id) == -1);
        });
        /////////////////////////////////////////////////
        // Listener Endpoints
        /////////////////////////////////////////////////
        var _listener = ThingStore.getListennerEndpoint();
        //////////////////////////
        // UPDATE COMPONENT STATE
        //////////////////////////
        self.setState(function () {
          return {
            actionForm: uiEvent.message.actionForm,
            event: _event,
            listener: _listener,
            activeEvent: "",
            activeEndpoint: []
          }
        }, function () {
          $(self.modal).modal('show');
        });
      }
    })
    );
  }

  componentWillUnmount() {
    this.__listenerIdentifier.forEach(element_id => {
      UIEvent.removeListener(element_id);
    });
    this.__listenerIdentifier = [];
  }

  close() {
    let self = this;
    this.setState(function () {
      return self.setInitialState();
    }, function () {
      $(self.modal).modal('hide');
    });
  }

  saveListener(e) {
    e.preventDefault();
    var self = this;
    console.log(this.state.activeEvent);
    console.log(this.state.activeEndpoint);
    var method = "";
    var url = "";
    if (this.state.actionForm == "edit") {
      method = "put".toLocaleLowerCase();
      url = Config.url.data.eventbinding(method, this.state.bindingId);
    }
    else if (this.state.actionForm == "add") {
      method = "post".toLocaleLowerCase();
      url = Config.url.data.eventbinding(method);
    }
    const data = {
      event_id: this.state.activeEvent,
      endpoints: this.state.activeEndpoint
    }
    ThingStore.saveData(url, method, data, function (ajaxResponse) {
      EventBindingStore.loadEventBindingStore(function () {
        DataEvent.dispatch('update-list-eventbinding', { id: ajaxResponse.id });
        UIEvent.dispatch('alert-msg', { status: "success", text: "have been successfully saved" });
        self.close();
      });
    });
  }

  selectListenerEndpoint(ev) {
    // ev.preventDefault();
    const input = ev.currentTarget;
    if (input.checked) {
      if (this.state.activeEndpoint.indexOf(input.value) == -1) {
        this.state.activeEndpoint.push(input.value);
      }
    } else {
      this.state.activeEndpoint = this.state.activeEndpoint.filter((listener_id) => {
        return (listener_id != input.value);
      });
    }
    this.setState({ activeEndpoint: this.state.activeEndpoint });
  }

  renderListenerEndpoint() {
    // set list of endpoint
    var htmlList = this.state.listener.map((listener, idx) => {
      var thing = ThingStore.getThing({ id: listener.thing_id });
      var key = listener.id;
      var _checked = (this.state.activeEndpoint.indexOf(listener.id) != -1);
      return (
        <div key={key}
          className='border-bottom mb-2 pb-3'>
          <p className='fw-bold mb-2'> {thing[0].name} </p>
          <div>
            <div className="form-check">
              <input className="form-check-input" name="listener_endpoint" type="checkbox"
                id={listener.id}
                value={listener.id}
                checked={_checked}
                onChange={this.selectListenerEndpoint.bind(this)} />
              <label className="form-check-label rounded" htmlFor={listener.id}>
                <span className="checkmark"></span>
                {listener.url}
              </label>
            </div>
          </div>
        </div>
      );
    }, this);

    return (
      <div className="card">
        <h5 className="card-header">Listeners Endpoints</h5>
        <div className="card-body">
          <div className="checklist">
            <form>
              {htmlList}
            </form>
          </div>
        </div>
      </div>
    )
  }

  selectEvent(e) {
    e.preventDefault();
    this.setState({ activeEvent: e.currentTarget.dataset.eventId });
  }

  renderEvent() {
    var htmlListItem = this.state.event.map(function (ev) {
      var thing = ThingStore.getThing({ id: ev.thing_id });
      var itemCSS = "list-group-item";
      var clickHandler = e => { e.preventDefault(); };
      if (this.state.actionForm == "add") {
        itemCSS += " list-group-item-action";
        clickHandler = this.selectEvent.bind(this);
      }
      itemCSS += (ev.id == this.state.activeEvent) ? " active" : "";
      return (
        <a key={ev.id} href="#" className={itemCSS}
          data-event-id={ev.id}
          onClick={clickHandler}>
          <p className='m-0 mb-1'>
            <span className='fw-bold'>Thing : </span>{thing[0].name}
          </p>
          <p className='m-0 mb-1'>
            <span className='fw-bold'>Event Name : </span>
            {ev.name}
          </p>
          <p className='m-0 mb-1'>
            <span className='fw-bold'>Event Type : </span>
            {ev.ce_type}
          </p>
        </a>
      )
    }, this);

    return (
      <div className="card mb-3">
        <h5 className="card-header">Events</h5>
        <div className="card-body border-bottom">
          <div className="list-group">
            {htmlListItem}
          </div>
        </div>
      </div>
    );
  }

  render() {

    return (
      <div className="modal fade app-modal-form" id="formListener"
        tabIndex="-1" role="dialog"
        aria-labelledby="formListenerLabel"
        aria-hidden="true"
        ref={node => (this.modal = node)}>

        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header px-4">
              <h5 className="modal-title" id="formListenerLabel">
                Event Binding
              </h5>
              <button type="button" className="btn-close" onClick={this.close.bind(this)} aria-label="Close">
              </button>
            </div>
            <div className="modal-body px-4">
              {
                this.state.event.length == 0 ? <EmptyState text="All events are bonded to listener" /> :
                  this.renderEvent()
              }
              {
                this.state.event.length > 0 ?  this.renderListenerEndpoint() : null
              }
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-success"
                onClick={this.saveListener.bind(this)}>Save</button>
              <button type="button" className="btn btn-secondary"
                onClick={this.close.bind(this)}>Cancel</button>
            </div>
          </div>
        </div>
      </div >
    )
  }
}