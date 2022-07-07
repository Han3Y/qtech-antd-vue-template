const MOCK_BASE_URL = '/api/v1';

class ResultVO {
  constructor(data, result = true, msg = '') {
    this.data = data;
    this.result = result;
    this.msg = msg;
  }
}
module.exports = {
  MOCK_BASE_URL: MOCK_BASE_URL,
  ResultVO: ResultVO
}

