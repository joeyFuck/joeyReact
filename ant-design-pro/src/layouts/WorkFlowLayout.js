import React, { Fragment } from 'react'; 
 

class WorkFlowLayout extends React.PureComponent {

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

export default WorkFlowLayout;
