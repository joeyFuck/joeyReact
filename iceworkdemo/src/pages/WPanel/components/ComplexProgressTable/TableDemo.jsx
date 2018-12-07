/* eslint no-plusplus:0 */
import React, { Component } from 'react';

import SplitPane from 'react-split-pane';

import './Panel.scss';
 
 

export default class TableDemo extends Component {
  static displayName = 'TableDemo';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
 
    this.state = { 
    };
  } 


  render() {
    return (
      <SplitPane
      split="vertical"
      minSize={50}
      maxSize={300}
      defaultSize={100}
      className="primary"
    >
      <div>min: 50px, max: 300px</div>
      <SplitPane split="horizontal">
        <div>default min: 50px</div>
        <div />
      </SplitPane>
    </SplitPane> 
    );
  }
}
