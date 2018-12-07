/* eslint no-undef:0, no-unused-expressions:0, array-callback-return:0, arrow-parens: 0, no-else-return: 0 */
import React, { Component } from 'react';
import Layout from '@icedesign/layout';
import { Redirect, Switch ,Route} from 'react-router-dom'; 
import Footer from '../../components/Footer';
import { routerData } from '../../routerConfig';
import './scss/light.scss';
import './scss/dark.scss'; 
import './scss/Panel.scss'; 
 


export default class WorkFlowLayout extends Component {
  static displayName = 'WorkFlowLayout';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() { 

  }


  render() { 
    return (
      <Layout
        style={{ minHeight: '100vh' }} 
      >  
        <Layout.Section className="ice-design-layout-body">  
          <Layout.Main>
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

              <Redirect exact from="/" to="/exception/404" />
            </Switch>  
          </Layout.Main>
        </Layout.Section>
        <Footer />
      </Layout>
    );
  }
}
 
