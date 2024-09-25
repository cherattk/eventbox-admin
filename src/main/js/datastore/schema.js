module.exports = {
  thingSchema: function () {
    return {
      id: "",
      name: "",
      description: "",
			category : ""
    };
  },
  eventSchema: function () {
    return {
      /**
       * App Attributes
       */
      id: "",
      name: "",
      thing: this.thingSchema(),
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
      datacontenttype: "",
			dataschema : ""
    }
  },

  listenerEndpointSchema: function () {
    return {
      id: "",
      thing: this.thingSchema(),
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