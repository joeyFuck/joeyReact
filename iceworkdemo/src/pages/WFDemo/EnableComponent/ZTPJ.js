export const EnableComponent = {
    /**
     * 头部
     */
    WorkFlowHeadDemo: () => {
        return import('../Head')
    },
    /**
     * <------测试用内容页面
     */
    FirstPage: () => {
        return import('../FirstPage')
    },
    SecondPage: () => {
        return import('../SecondPage')
    },
    /**
     * 测试用内容页面------------>
     */

    /**
     * 异常页面
     */
    WFException:()=>{
        return import('../WFException')
    }
}