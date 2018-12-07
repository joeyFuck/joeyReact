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
    TableListDemo: () => {
        return import('../../List/TableList')
    },
    ProfileDemo: () => {
        return import('../../Profile/BasicProfile')
    },
    /**
     * 测试用内容页面------------>
     */

    /**
     * 异常页面
     */
    ExceptionWF:()=>{
        return import('../ExceptionWF')
    }
}