import EventSet from 'eventset';

// ui
const UIEvent = EventSet.Topic('ui-event');
// UIEvent.addEvent('show-event');
UIEvent.addEvent('get-thing-form');
UIEvent.addEvent('show-thing-list');
UIEvent.addEvent('show-client-code');
UIEvent.addEvent('show-event-form');
UIEvent.addEvent('get-listener-form');
UIEvent.addEvent('show-eventbinding-form');
UIEvent.addEvent('show-create-eventbinding-form');
UIEvent.addEvent('login-status');
UIEvent.addEvent('alert-msg');

// DataEvent
const DataEvent = EventSet.Topic('data-event');
['thing' , 'event' , 'listener' , 'eventbinding'].forEach(function(type){
  DataEvent.addEvent('update-list-' + type);
  DataEvent.addEvent('update-element-' + type);
});

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

export { UIEvent  , DataEvent }