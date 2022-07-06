const fs = require('fs')
const path = require('path')

let mockObj = {};
fs.readdirSync(path.join(__dirname, './apis')).forEach(file => {
  Object.assign(mockObj, require('./apis/' + file));
})


module.exports = mockObj;
