export default {
    menus: [ // 菜单相关路由
        { key: '/app/dashboard/index', title: '首页', icon: 'mobile', component: 'Dashboard' },
        {
            key: '/app/table', title: '赛事查询', icon: 'copy',
            subs: [
                { key: '/app/table/basicTable', title: '查询任务列表', component: 'BasicTable'},
                { key: '/app/table/gameTaskDetail/:taskId/:taskName', title: '上传数据', component: 'GameTaskDetail'},
                { key: '/app/table/gameRecordReport/', title: '报表', component: 'GameRecordReport'}
                
            ],
        },
    ],
    others: [] // 非菜单相关路由
}