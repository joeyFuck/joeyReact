import React, { Component } from 'react';
import TabFilterTable from './components/TabFilterTable';

export default class Page20 extends Component {
  static displayName = 'Page20';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="page20-page">
        <TabFilterTable />
      </div>
    );
  }
}
