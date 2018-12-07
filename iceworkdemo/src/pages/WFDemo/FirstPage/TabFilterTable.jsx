import React, { Component } from 'react';
import { Tab, DatePicker } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import Track from './Track';
import Scheme from './Scheme';
import CustomTable from './CustomTable';

const TabPane = Tab.TabPane;

const tabs = [
  { tab: '埋点维度', key: 'track', content: <Track /> },
  { tab: '方案维度', key: 'scheme', content: <Scheme /> },
  { tab: '表格信息', key: 'customTable', content: <CustomTable /> },
];

function handleChange(key) {
  console.log('change', key);
}

function handleClick(key) {
  console.log('click', key);
}

export default class TabFilterTable extends Component {
  static displayName = 'TabFilterTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTabExtraContent = () => {
    return <DatePicker size="large" style={{ marginRight: '20px' }} />;
  };

  render() {
    return (
      <IceContainer style={styles.container}> 
        <Tab
          onChange={handleChange}
          tabBarExtraContent={this.renderTabExtraContent()}
        >
          {tabs.map((item) => {
            return (
              <TabPane key={item.key} tab={item.tab} onClick={handleClick}>
                {item.content}
              </TabPane>
            );
          })}
        </Tab>
      </IceContainer>
    );
  }
}

const styles = {
  container: {
    margin: '20px',
    padding: '10px 0',
  },
};