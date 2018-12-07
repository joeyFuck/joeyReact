import React, { Component } from 'react';
import { Grid } from '@icedesign/base';

const { Row, Col } = Grid;

export default class Footer extends Component {
  static displayName = 'Footer';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footer-info" style={styles.container}> 
        <p style={styles.copyRight}>© 2018 杭州衡泰软件</p>
      </div>
    );
  }
}

const styles = {
  container: {
    background: '#fff', 
    width: '100%',
  }, 
  copyRight: {
    color: '#999999',
    textAlign: 'center',
  },
};
 