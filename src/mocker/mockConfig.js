const MOCK_BASE_URL = '/cgi-bin';

class ResultVO {
  constructor(data, result = 0, msg = '') {
    this.data = data;
    this.code = result;
    this.msg = msg;
  }
}
module.exports = {
  MOCK_BASE_URL: MOCK_BASE_URL,
  ResultVO: ResultVO
}

