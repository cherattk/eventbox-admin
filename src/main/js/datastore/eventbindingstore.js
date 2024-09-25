/**
 * @module EventMapMananger
 * @copyright Copyright (c) 2019-present cheratt karim
 * @license MIT Licence
 */

const DataEvent = require('../lib/ui-event').DataEvent;
const Config = require('../config').default;
const _dataStore = require('./store').default;

const EventBindingStore = new _dataStore("eventbinding");

module.exports = {

  loadEventBindingStore: function (callback) {
    const sessionToken = sessionStorage.getItem('eventbox_session');
    jQuery.ajax({
      url: Config.url.data.eventbinding('get'),
      method: "GET",
      dataType: "JSON",
      headers: {
        "Authorization": 'Bearer ' + sessionToken
      }
    })
      .done(function (responseData, textStatus, jqXHR) {
        EventBindingStore.init(responseData);
        callback();
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Error from EventBindingStore');
        console.error(textStatus);
        console.error(errorThrown);
      });
  },

  saveData: function (type, method , data , callback) {
    jQuery.ajax({
      url: Config.url.data[type],
      method: method,
      dataType: "JSON", // response format
      processData: false,
      data: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Authorization": "Bearer " + sessionStorage.getItem('eventbox_session')
      }
    }).done(function (responseData) {
      callback(responseData);
    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Error from EventMapManager.loadDataStore');
        console.error(textStatus);
        console.error(errorThrown);
      });
  },

  addData: function (data) {
    var eventName = 'update-list-' + type;
    var self = this;
    this.saveData("POST" , type , data, function (ajaxResponse) {
      self.loadDataStore(function () {
        DataEvent.dispatch(eventName, { id: ajaxResponse.id });
      });
    });
  },

  updateData: function (data) {
    var eventName = 'update-element-' + type;
    var self = this;
    this.saveData("PUT" , type , data , function (saveResponse) {
      self.loadDataStore(function () {
        DataEvent.dispatch(eventName, { id: data.id });
      });
    });
  },

  ///////////////////////////////////////////////////////////
  deleteData: function (id) {
    var eventName = 'update-list-' + type;
    var self = this;
    this.saveData("DELETE" , id , function (saveResponse) {
      self.loadDataStore(function () {
        DataEvent.dispatch(eventName);
      });
    });
  },

  ///////////////////////////////////////////////////////////
  getEventBinding: function (criteria) {
    return EventBindingStore.getData(criteria);
  },

  getEvent: function (criteria) {
    //return EventBindingStore.getData(criteria);
  },

  getListenerEndpoint: function (criteria) {
    // const list = ListenersEndpointStore.getData(criteria);
    // return list;
  }

}