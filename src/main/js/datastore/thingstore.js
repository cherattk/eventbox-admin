/**
 * @module EventMapMananger
 * @copyright Copyright (c) 2019-present cheratt karim
 * @license MIT Licence
 */

const {UIEvent , DataEvent} = require('../lib/ui-event');
const Config = require('../config').default;
const _dataStore = require("./store");

const ThingStore = new _dataStore("things");
const EventStore = new _dataStore("events");
const ListenerEndpointStore = new _dataStore("listeners");

module.exports = {

  loadThingStore: function (callback) {
    const sessionToken = sessionStorage.getItem('eventbox_session');
    jQuery.ajax({
      url: Config.url.data.thing('get'),
      method: "GET",
      dataType: "JSON",
      headers: {
        "Authorization": 'Bearer ' + sessionToken
      }
    })
      .done(function (listThings, textStatus, jqXHR) {
        ThingStore.init(listThings);
        callback();
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Error ThingStore');
        console.error(textStatus);
        console.error(errorThrown);
      });
  },

  loadEventStore: function (callback) {
    const sessionToken = sessionStorage.getItem('eventbox_session');
    jQuery.ajax({
      url: Config.url.data.event('get'),
      method: "GET",
      dataType: "JSON",
      headers: {
        "Authorization": 'Bearer ' + sessionToken
      }
    })
      .done(function (listEvents, textStatus, jqXHR) {
        EventStore.init(listEvents);
        callback();
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Error ThingStore');
        console.error(textStatus);
        console.error(errorThrown);
      });
  },

  loadListenerEndpointStore: function (callback) {
    const sessionToken = sessionStorage.getItem('eventbox_session');
    jQuery.ajax({
      url: Config.url.data.listener_endpoint('get'),
      method: "GET",
      dataType: "JSON",
      headers: {
        "Authorization": 'Bearer ' + sessionToken
      }
    })
      .done(function (listEndpoints, textStatus, jqXHR) {
        ListenerEndpointStore.init(listEndpoints);
        callback();
      }).fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Error ThingStore');
        console.error(textStatus);
        console.error(errorThrown);
      });
  },

  saveData: function (url , method , data , callback) {
    jQuery.ajax({
      url: url,
      method: method,
      dataType: "JSON", // response format
      processData: false,
      data: JSON.stringify(data),
      headers: {  
	  	"Content-Type":"application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('eventbox_session')
      }
    }).done(function (responseData) {
      callback(responseData);
    })
      .fail(function (jqXHR, textStatus, errorThrown) {
        UIEvent.dispatch('alert-msg' , {status : "error" , text : "Error when saving data"});
        console.error('Error ThingStore');
        console.error(textStatus);
        console.error(errorThrown);
      });
  },

  updateData: function (type , data) {
    var eventName = 'update-element-' + type;
    var self = this;
    this.saveData("PUT" , type , data , function (saveResponse) {
      self.loadDataStore(function () {
        DataEvent.dispatch(eventName, { id: data.id });
      });
    });
  },

  ///////////////////////////////////////////////////////////
  /*deleteData: function (url , type , id) {
    var eventName = 'update-list-' + type;
    var self = this;
    this.saveData(url , "DELETE" , id , function (saveResponse) {
      self.loadDataStore(function () {
        DataEvent.dispatch(eventName);
      });
    });
  },*/

  ////////////////////////////////////////////////////////////
  getThing: function (criteria) {
    return ThingStore.getData(criteria);
  },

  ///////////////////////////////////////////////////////////
  getEvent: function (criteria) {
    const list = EventStore.getData(criteria);
    return list;
  },

  getListennerEndpoint: function (criteria) {
    const list = ListenerEndpointStore.getData(criteria);
    return list;
  }

}