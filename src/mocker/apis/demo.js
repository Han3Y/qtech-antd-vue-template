const { ResultVO, MOCK_BASE_URL } = require("../mockConfig");

module.exports = {
  /**
   * 列表接口-分页
   * @param req
   * @param res
   */
  [`GET ${MOCK_BASE_URL}/demo/list`]: (req, res) => {
    res.json(new ResultVO({
      items: [
        {
          id: '1',
          key1: '字段1',
          key2: '字段2'
        },
        {
          id: '2',
          key1: '字段1',
          key2: '字段2'
        }
      ],
      total: 2,
    }));
  },
  /**
   * 列表接口-不分页
   * @param req
   * @param res
   */
  [`GET ${MOCK_BASE_URL}/demo/listWithoutPage`]: (req, res) => {
    res.json(new ResultVO([
      {
        id: '1',
        key1: '字段1',
        key2: '字段2'
      },
      {
        id: '2',
        key1: '字段1',
        key2: '字段2'
      }
    ]));
  },
  /**
   * 编辑时根据id获取
   * @param req
   * @param res
   */
  [`GET ${MOCK_BASE_URL}/demo/1`]: (req, res) => {
    res.json(new ResultVO({
      id: '1',
      key1: '字段1',
      key2: '字段2'
    }));
  },
  /**
   * 查看时根据id获取
   * @param req
   * @param res
   */
  [`GET ${MOCK_BASE_URL}/demo/view/1`]: (req, res) => {
    res.json(new ResultVO({
      id: '1',
      key1: '字段1',
      key2: '字段2'
    }));
  },
  /**
   * 新增
   * @param req
   * @param res
   */
  [`POST ${MOCK_BASE_URL}/demo`]: (req, res) => {
    res.json(new ResultVO());
  },
  /**
   * 编辑
   * @param req
   * @param res
   */
  [`PUT ${MOCK_BASE_URL}/demo`]: (req, res) => {
    res.json(new ResultVO());
  },
  /**
   * 批量删除
   * @param req
   * @param res
   */
  [`DELETE ${MOCK_BASE_URL}/demo`]: (req, res) => {
    res.json(new ResultVO());
  },
  /**
   * 单个删除
   * @param req
   * @param res
   */
  [`DELETE ${MOCK_BASE_URL}/demo/1`]: (req, res) => {
    res.json(new ResultVO());
  },
}