> ???????????service??'@/services/apiAuth'?

> ???????????????????pageType

### ???????????????????

```js
//??????????k:string v:boolean 
export async function queryAuth(params){   
    let resultList = request('http://localhost:5005/home/GetAuth', {
        method: 'GET', 
        body:params, 
    }); 

    return resultList;  
    // {
    //     "addBtn":true,
    //     "other":false,
    // }
}
```

### ??????state???????????

```js
 state: { 
    authList:{
     //??????????k:string v:boolean 
    },
  },
 
effects: { 
    *fetchAuth({ payload }, { call, put }) {
      const response = yield call(queryAuth, payload);
      yield put({
        type: 'saveAuth',
        payload: response,
      });
    },
}

 reducers: { 
    saveAuth(state, action){
      return {
        ...state,
        authList: action.payload,
      };
    }
  },
```

### ??????????????????

```js
componentDidMount() {
    const { dispatch } = this.props; 
    dispatch({
      type: 'rule/fetchAuth',
      pageType:"TableList"
    }); 
  }
```


### ?????????? true/false

```js
checkAuth = (authType)=> {
    const {
      rule: { authList } 
    } = this.props;

    for (const key in authList) {
      if (authList.hasOwnProperty(key)) {
        const auth = authList[key];
        if(key == authType){
            return auth;
        }   
        // console.log(key+"|"+auth);
      }
    } 
    //???????
    return false;
  };
```

### ???????????????

```js
{this.checkAuth("addBtn")?(<Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                ??
</Button>):null} 
```








