import React, { Component } from 'react';
import ComplexProgressTable from './components/ComplexProgressTable';

export default class Panel extends Component {
  static displayName = 'Panel';

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
