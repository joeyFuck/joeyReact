import React, { Component } from 'react'; 
import { Grid,Icon ,Loading  } from '@icedesign/base';

const { Row, Col } = Grid;

const styles = {
    demoRow: {
        margin: '10px 0',
    },
    demoCol: {
        minHeight: '30px',  
        lineHeight: '30px',
        textAlign: 'center',
    },
    demoColInset: {
        minHeight: '30px',
        border:'1px solid #CCC',
        borderRadius: '3px',
        backgroundColor:'#ECECEC',
        lineHeight: '30px',
        textAlign: 'center',
    }, 
};

export default class Head extends Component {
  static displayName = 'Head';

  constructor(props) {
    super(props);
    this.state = {};
  }

  

  render() {
    const { params } = this.props;  
    return (
      <div className="result-page"> 
        <Row  style={styles.demoRow} align="top"> 
            <Col span="24">
                <div style={styles.demoCol} >
                    <Icon type="pin" /><span style={{fontSize:20}}>关于项目<span style={{color:'#2077ff'}}>  {params.status}</span> 当前所处环节<span style={{color:'#2077ff'}}>评级</span>,您需要做的</span>
                </div>
            </Col> 
         </Row>
         {/* <Row  style={styles.demoRow} align="top"> 
            <Col span="24">  
                <div style={styles.demoCol} > 
                    <Loading shape="fusion-reactor" style={{textAlign: 'center'}} color="#333">
                        <div className="demo" style={{height:200}}>fusion-reactor</div>  
                    </Loading> 
                 </div>  
            </Col> 
         </Row>  */}
      </div>
    );
  }
}

 
  
 
 
