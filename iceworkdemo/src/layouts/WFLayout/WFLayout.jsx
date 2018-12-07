import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Switch, Route, Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import { routerData } from '../../routerConfig';
import './WFLayout.scss';

export default class WFLayout extends Component {
  static displayName = 'WFLayout';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <Layout className="user-layout" > 
        <Switch>
          {routerData.map((item, index) => {
            return item.component ? (
              <Route
                key={index}
                path={item.path}
                component={item.component}
                exact={item.exact}
              />
            ) : null;
          })}

          <Redirect exact from="/user" to="/user/login" />
        </Switch>
        <Footer />
      </Layout>
    );
  }
}

const styles = {
  // container: {
  //   position: 'relative',
  //   width: '100%',
  //   height: '100vh',
  //   paddingTop: '100px',
  //   background: '#f0f2f5',
  //   backgroundImage:
  //     'url(https://img.alicdn.com/tfs/TB1kOoAqv1TBuNjy0FjXXajyXXa-600-600.png)',
  //   backgroundSize: 'contain',
  // },
};

// <Switch>
//   <Route path="/user/login" exact component={UserLogin} />
//   <Redirect to="/user/login" />
// </Switch>
