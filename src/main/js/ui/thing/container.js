import React from 'react';
import ListThing from './list-thing';

import FormEvent from './form-event';
import FormListenerEndpoint from './form-listener-endpoint';
import FormThing from './form-thing';

export default class ContainerThing extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="p-4 position-relative">
        <ListThing/>
        <FormThing/>
        <FormEvent />
        <FormListenerEndpoint />
      </div>
    );
  }
}