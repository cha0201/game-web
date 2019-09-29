export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/table', title: '规则', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '规则列表', component: 'BasicTable'},
                { key: '/app/table/uploadPanel/:ruleId/:ruleName', title: '上传数据', component: 'UploadPanel'},
                { key: '/app/table/uploadRegionalPanel/:ruleId/:ruleName', title: '上传', component: 'UploadRegionalPanel'}
                
            ],
        },
    ],
    others: [] // 非菜单相关路由
}