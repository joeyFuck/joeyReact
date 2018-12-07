import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Layout, Button } from 'antd'; 
import logoImg from '@/assets/images/logo-r.png';
import pattern from '@/assets/images/pattern.png'; 
const { Content } = Layout;

import styles from './screenLock.less'; 

/**
 * 锁屏界面
 */
class ScreenLock extends PureComponent {
  state = {
    showPattern: false,
    patternError: null
  };

  static contextTypes = {
    router: PropTypes.object
  };

  onChange = lock => {
    if (lock) {
      this.context.router.history.replace('/dashboard');
    } else {
      this.setState({
        patternError: true
      });
    }
  };

  togglePattern = () => {
    this.setState({
      showPattern: !this.state.showPattern
    });
  };

  render() {
    const { title } = this.props;
    const { patternError, showPattern } = this.state;
    return (
      <Layout className={styles.screenLockPage}>
        <Content>
          <div className={styles.container}>
            <div className={styles.patternLogo}>
              <img src={logoImg} alt="logo" />
              <b>LANIF</b>
              <span>Admin</span>
            </div>
            <div className={styles.patterContainer}>
              <div className={styles.patterTitle}>{title || '欢迎您回来'}</div>
              <p>使用图案进行解锁</p>
              

              
            </div>
            <div className={styles.patterTip}>
              <Button
                type="primary"
                icon="question-circle"
                onClick={this.togglePattern}
              >
                图案提示
              </Button>
            </div>
          </div> 
        </Content>   
      </Layout>
    );
  }
}

export default ScreenLock;
