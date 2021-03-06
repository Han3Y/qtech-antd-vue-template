/**
 * 弹窗大小
 * @type {{}}
 */
export const MODAL_SIZE = {
  XS:400,
  SMALL: 560,
  MIDDLE: 720,
  LONG: 1200,
  MD:920,
  EDIT:800,
  VERSION:600
};


export const FORM_ITEM_LAYOUT_WITHOUT_LABEL = {
  WRAPPER_COL: {
    xs: { span: 24, offset:0 },
    sm: { span: 13, offset: 7 },
  },
};

/**
 * 表单label布局
 * @type {{sm: {span: number}, xs: {span: number}}}
 */
export const LABEL_COL = {
  xs: { span: 24 },
  sm: { span: 7 }
};

/**
 * 表单输入控件布局
 * @type {{sm: {span: number}, xs: {span: number}}}
 */
export const WRAPPER_COL= {
  xs: { span: 24 },
  sm: { span: 13 }
};

/**
 * 表格分页参数
 * @type {{showTotal: (function(*): string), showSizeChanger: boolean}}
 */
export const PAGINATION =  {
  showTotal: function(total){
    return `记录总数：${total}`
  },
  showSizeChanger:true
}

/**
 * 表单单选框样式--垂直模式
 * @type {{}}
 */
export const RADIO_STYLE = {
  display: 'block',
  height: '30px',
  lineHeight: '30px',
}

/**
 * 下拉框搜索逻辑
 * @param input
 * @param option
 * @returns {boolean}
 * @constructor
 */
export function FILTER_OPTION(input, option){
  return (
    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
  );
}