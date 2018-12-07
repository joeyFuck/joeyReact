import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './CustomTable.scss';

export default class CustomTable extends Component {
  static displayName = 'CustomTable';

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    let dataSource = [
                        [ 
                          {key:"发行债券主体",value:"万科企业股份有限公司"},
                          {key:"主体评级",value:"A-1"},
                          {key:"评级机构",value:"广东联信评估有限公司"},
                        ],
                        [ 
                            {key:"业务类型",value:" (  ) 承分销     (  ) 现券买入     (  ) 远期买入     (  ) 其他业务   请打√"},
                        ],
                        [
                            {key:"债券名称",value:"14万科MTN001 "},
                            {key:"债券代码",value:"N0021256 "},
                            {key:"内部评分",value:"67.22527727 "},
                           
                        ],
                        [
                             {key:"主体/债项评级",value:"CCC"},
                             {key:"主承销商",value:""},
                             {key:"交易对手",value:""},
                        ],
                        [
                            {key:"发行规模",value:"18  亿元"},
                            {key:"期限",value:"3  年"},
                            {key:"票面利率",value:"4.7  %"},
                       ],
                       [
                            {key:"剩余期限",value:" 年"},
                            {key:"投资利率",value:" %"},
                            {key:"基准利率",value:" %"},
                       ],
                       [
                            {key:"拟申请额度",value:" 万元"},
                       ]
                    ];
    let tbodyList = [];
    for (let index = 0; index < dataSource.length; index++) {
        let trList = [];
        const tr = dataSource[index];
        for (let i = 0; i < tr.length; i++) {
            const td = tr[i];
            trList.push((<td>{td.key}</td>));
            trList.push((<td>{td.value}</td>)); 
        }
        tbodyList.push((<tr>{trList}</tr>));
    }

    return (
      <IceContainer style={{ padding: 0 }}>
        <h3 style={styles.title}>额度确认表</h3>
        <div style={{ padding: '20px' }}>
          <table className="custom-table">
            <tbody>
              {tbodyList}
              {/* <tr>
                <td>名称</td>
                <td>神经网络模型</td>
                <td>状态</td>
                <td>待上线</td>
              </tr>
              <tr>
                <td>创建人</td>
                <td>淘小宝</td>
                <td>创建时间</td>
                <td>2018-09-19 21:34:28</td>
              </tr>
              <tr>
                <td>算法场景类型</td>
                <td>分类</td>
                <td>算法实现</td>
                <td>CNN</td>
              </tr>
              <tr>
                <td>最近修改时间</td>
                <td>2018-09-19 21:34:31</td>
                <td>最新版本号</td>
                <td>0.0.1</td>
              </tr>
              <tr>
                <td>分享状态</td>
                <td>未分享</td>
                <td>调用量</td>
                <td>237,341</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </IceContainer>
    );
  }
}

const styles = {
  title: {
    margin: '0',
    padding: '15px 20px',
    fonSize: '16px',
    color: 'rgba(0, 0, 0, 0.85)',
    fontWeight: '500',
    borderBottom: '1px solid #f0f0f0',
  },
};