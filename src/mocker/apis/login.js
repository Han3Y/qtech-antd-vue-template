const { ResultVO, MOCK_BASE_URL } = require("../mockConfig");
module.exports = {
  [`POST ${MOCK_BASE_URL}/nsfUser/nsfLogin`]: (req, res) => {
    res.json(new ResultVO(
      {
        createTime: "2022-05-09 14:18:44",
        delTips: 1,
        id: "e0b76278-cf5f-11ec-9773-ef230535a02d",
        initPassword: true,
        locked: null,
        needVerifyFinger: false,
        passwd: null,
        personID: "1122334455",
        realName: "admin",
        role: "管理员",
        roleCodes: "audit",
        roleId: "2",
        roles: [2],
        tel: "15515139654",
        userName: "admin"
      }
    ));
  },
  [`GET ${MOCK_BASE_URL}/user/current`]: (req, res) => {
    res.json(new ResultVO(null, false, '当前无用户'));
  }
}
