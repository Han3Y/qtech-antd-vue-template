export const MoreTab = [
  {
    titlePath:['/tab1','/tab2'],
    child:[
      {
        name:'TAB1',
        path:'/tab1'
      },
      {
        name:'TAB2',
        path:'/tab2'
      },
    ]
  }
]

/**
 * 不需要展示页面头部标题的路径在这里声明
 * @type {string[]}
 */
export const NO_TITLE_PAGES = [
  '/systemStatus',
  '/systemMgt/basic',
  '/systemMgt/advance'
];