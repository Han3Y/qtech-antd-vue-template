const { ResultVO, MOCK_BASE_URL } = require("../mockConfig");
module.exports = {
  [`POST ${MOCK_BASE_URL}/testFile`]: (req, res) => {
    res.json(new ResultVO(null, 0, '上传成功'));
  },
}