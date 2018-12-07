import React, { Fragment } from 'react';
import styles from './LockLayout.less';
 

class LockLayout extends React.PureComponent {

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div>
       {children}
      </div>
    );
  }
}

export default LockLayout;
