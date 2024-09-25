// import React, { useRef, useState } from 'react';
import React, { useRef, useState } from 'react';
import ThingStore from '../../datastore/thingstore';

export function SummaryEvent(props) {

	//let thingName = props.event.thingd ? ThingStore.getThing({ id: props.event.thingId })[0].name : "";
	
	return (
		<div className="pb-3">
			<label className="bg-white border border-bottom-0 fw-bold p-2 px-3 text-primary" style={{ marginBottom: "-1px" }}>
				Events
			</label>
			<div className="bg-white border p-3">
				<p className="m-0 mb-1">
					<label className='text-primary me-2'>Thing : </label>
					{props.event.thing.name}
				</p>
				<p className="m-0 mb-1">
					<label className='text-primary me-2'>Event : </label>
					{props.event.name}
				</p>
				<p className="m-0 mb-1">
					<label className='text-primary me-2'>Cloudevent type : </label>
					{props.event.type}
				</p>
			</div>
		</div>
	)

}
