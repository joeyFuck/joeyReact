import React, { Component } from 'react';
import ComplexProgressTable from './components/ComplexProgressTable';

export default class WorkFlow extends Component {
  static displayName = 'WorkFlow';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="work-flow-page">
        <ComplexProgressTable />
      </div>
    );
  }
}
