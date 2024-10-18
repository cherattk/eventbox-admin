// import React, { useRef, useState } from 'react';
import React from 'react';
import { UIEvent } from '../../lib/ui-event';

export function SummaryEvent(props) {

	//let thingName = props.event.thingd ? ThingStore.getThing({ id: props.event.thingId })[0].name : "";

	const getClientCode = () => {
	    UIEvent.dispatch("show-client-code" , { event_id : props.event.id });
  };
	
	return (
		<div className="border-bottom mb-3 pb-2 px-1">
			<p className="m-0 mb-1">
				<label className='text-primary me-2 fw-bold'>Event : </label>
				{props.event.name}
			</p>
			<p className="m-0 mb-1">
				<label className='text-primary me-2 fw-bold'>Publisher : </label>
				{props.event.thing.name}
				<span className='badge text-bg-primary ms-3'>{props.event.thing.category.replace("_", " ").toLowerCase()}</span>
			</p>
			<p className="m-0 mb-1">
				<label className='text-primary me-2 fw-bold'>Cloudevent - Source : </label>
				{props.event.source}
			</p>
			<p className="m-0 mb-1">
				<label className='text-primary me-2 fw-bold'>Cloudevent - Type : </label>
				{props.event.type}
			</p>
			
			<div className="align-items-center d-flex py-2">
				{
					props.showAttributes ?  (<button className="btn btn-sm btn-primary" 
																	onClick={getClientCode}>Show Cloudevent Attributes</button>) 
															 : null
					
				}
			</div>
			
		</div>
	)

}
