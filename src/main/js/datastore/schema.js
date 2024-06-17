module.exports = {
  thingSchema: function () {
    return {
      id: "",
      name: "",
      description: ""
    };
  },
  eventSchema: function () {
    return {
      /**
       * App Attributes
       */
      id: "",
      name: "",
      thingId: "",
      description: "",
      /**
       * CloudEvent attributes
       */
      /** 
      * Require CloudEvent attributes
      * */
      specversion: "1.0",
      type: "",
      source: "",
      /** 
       * Optional CloudEvent attributes
       * */
      datacontenttype: ""
    }
  },

  listenerEndpointSchema: function () {
    return {
      id: "",
      thingId: "",
      url: "",
      active: true,
      description: ""
    }
  },
  BindingEvent : function(){
    return  {
      thingId: "",
      event_id: ""
    }
  }

}