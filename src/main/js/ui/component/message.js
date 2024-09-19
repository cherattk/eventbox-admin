import React, { useRef, useState } from 'react';
import { UIEvent } from '../../lib/ui-event';

export function Spinner(props) {
  return (
    <div className="list-status-panel text-primary">
      <p>{props.text}</p>
      <span className="spinner-border"></span>
    </div>
  );
}

export function EmptyState(props) {
  return (
    <div className="bg-light border mb-3 px-3 py-4 text-primary">
      <h5>{props.text}</h5>
    </div>
  );
}

export function WarningMessage(props) {
  return (
    <p className="alert alert-warning m-1" role="alert">
      {props.text}
    </p>);
}
export function Alert() {
	const ALERT_TIMEOUT = 3000;
  const [display, setDisplay] = useState("d-none");
  const [text, setText] = useState("warning message");
  const [color, setColor] = useState("alert-warning");

  UIEvent.addListener('alert-msg', function (uiEvent) {
    if (uiEvent.message.status == "success") {
      setColor('alert-success');
    }
    else {
      setColor('alert-warning');
    }
    setText(uiEvent.message.text);
    setDisplay("d-block");
    var interval_id = window.setInterval(() => {
		setDisplay("d-none");
		window.clearInterval(interval_id);
	},ALERT_TIMEOUT);
	
  });

  return (
		<div className="position-fixed w-100 top-0 start-0 z-1">
    <div className={`alert alert-dismissible alert-success rounded-0 shadow text-center ${color} ${display}`} role="alert">
      {text}
      <button type="button" onClick={() => { setDisplay('d-none'); }} 
        className="btn-close" aria-label="Close"></button>
    </div>
		</div>
	);
}
