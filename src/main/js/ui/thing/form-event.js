import React from 'react';
import { DataEvent, UIEvent } from '../../lib/ui-event';
import ThingStore from '../../datastore/thingstore';
import DataSchema from '../../datastore/schema';
import Config from '../../config';


export default class FormEvent extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.initialState();
  }

  initialState() {
    return {
      actionForm: "",
      event: DataSchema.eventSchema()
    };
  }
 
  componentDidMount() {
    var self = this;
    //===============================================
    UIEvent.addListener('show-event-form', function (uiEvent) {
      var event;
      // edit item
      if (uiEvent.message.actionForm == "edit") {
        // console.log(ThingStore);
        let _event = ThingStore.getEventByArrayCriteria([ "id" , uiEvent.message.eventId ]);
        if (_event.length > 0) {
          event = _event[0];
        }
      }
      // add new item
      else if (uiEvent.message.actionForm == "add") {
        event = DataSchema.eventSchema();
        event.thing = ThingStore.getThing({ id: uiEvent.message.thingId })[0];
      }

      
      self.setState(function () {
        return {
          actionForm: uiEvent.message.actionForm,
          event: event
        };
      }, function () {
        $(self.modal).modal('show');
      });
    });
  }

  close() {
    let self = this;
    this.setState(function () {
      return self.initialState();
    }, function () {
      $(self.modal).modal('hide');
    });
  }

  saveEvent(e) {
    e.preventDefault();
		
    var self = this;
    var method = "";
    var url = "";
    if (this.state.actionForm == "edit") {
      method = "put".toLocaleLowerCase();
    }
    else if (this.state.actionForm == "add") {
      method = "post".toLocaleLowerCase();
    }
		
		var url = Config.url.data.event(method, this.state.event.id);
    ThingStore.saveData(url, method, this.state.event, function () {
      ThingStore.loadEventStore(function () {
        DataEvent.dispatch('update-list-event' , {thingId : self.state.event.thing.id});
				DataEvent.dispatch('update-list-eventbinding');
        UIEvent.dispatch('alert-msg', { status: "success", text: "Event has been successfully saved" });
        self.close();
      });
    });
		
  }

  formValue(event) {
    this.state.event[event.target.name] = event.target.value;
    this.setState(this.state);
  }

//  copyEventCode() {
//    var ce_code = JSON.stringify(this.state.event, null, 2);
//    navigator.clipboard.writeText(ce_code);
//  }

  render() {
    return (
      <div className="modal fade app-modal-form" id="formEvent"
        tabIndex="-1" role="dialog"
        aria-labelledby="formEventLabel"
        aria-hidden="true"
        ref={node => (this.modal = node)}>

        <div className="modal-dialog modal-xl" role="document">
          <div className="modal-content">
            <div className="modal-header text-primary">
              <h5 className="modal-title" id="formEventLabel">
                Event definition
              </h5>
              <button type="button" className="btn-close" onClick={this.close.bind(this)} aria-label="Close"></button>
            </div>
            <div className='modal-body'>

                <div id="event_details" className="p-3">
                  <form onSubmit={this.saveEvent.bind(this)} onReset={this.close.bind(this)}>

                    <div>
                      <div className="mb-3">
                        <label className="form-label text-primary">
                          Thing
                        </label>
                        <p className="bg-light rounded px-3 py-2 m-0">{this.state.event.thing.name}</p>
                        <div className="form-text">
                          Read only value
                        </div>
                      </div>

                      <div className="mb-3 mb-3">
                        <label htmlFor="event_name" className="form-label text-primary">
                          Event Name
                        </label>
                        <input id="event_name" type="text" className="form-control"
                          name="name"
                          value={this.state.event.name}
                          onChange={this.formValue.bind(this)} 
													required/>
                      </div>
                    </div>

                    <div className='card mb-3'>
                      <div className='card-header text-primary'>
                        Cloudevent
                      </div>
                      <div className='card-body'>
                        <div className="mb-3">
                          <label htmlFor="ce_source" className="form-label text-primary">
                            Source
                          </label>
                          <input id="ce_source" type="text" className="form-control"
                            name="source"
                            value={this.state.event.source}
                            onChange={this.formValue.bind(this)} 
														required/>
                          <div className="form-text">Example : www.company.com</div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="ce_type" className="form-label text-primary">
                            Type
                          </label>
                          <input id="ce_type" type="text" className="form-control"
                            name="type"
                            value={this.state.event.type}
                            onChange={this.formValue.bind(this)} 
														required/>
                          <div className="form-text">Example : com.company.entity.update</div>
                        </div>

                        <div className="mb-3">
                          <label htmlFor="ce_datacontenttype" className="form-label text-primary">
                            Data Content Type
                          </label>
                          <input id="ce_datacontenttype" type="text" className="form-control"
                            name="datacontenttype"
                            value={this.state.event.datacontenttype}
                            onChange={this.formValue.bind(this)} 
														required/>
                          <div className="form-text">
                            Example :
                          </div>
                        </div>
                        <div className="mb-3">
                          <label htmlFor="event_description" className="form-label text-primary">
                            Description
                          </label>
                          <textarea id="event_description" className="form-control"
                            name="description"
                            value={this.state.event.description}
                            onChange={this.formValue.bind(this)}></textarea>
                        </div>
                      </div>
                    </div>
                    <div className='d-flex justify-content-start'>
                      <button type="submit" className="btn btn-success me-3">Save</button>
                      <button type="reset" className="btn btn-secondary">Close</button>
                    </div>
                  </form>
              </div>							
            </div>

          </div>
        </div >
      </div >
    )
  }
}