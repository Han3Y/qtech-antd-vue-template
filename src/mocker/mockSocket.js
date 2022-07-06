// const { WebSocketServer } = require('ws');
// const wss = new WebSocketServer({ port: 8050 });

// let successNum=0;
// let wsObj = {
//   msg: '请输入指纹',
//   type: 'error'
// }

// wss.on('connection', function connection(ws, request,) {
//   const url = request.url;
//   console.log('connected url:', url);
//   // 接收
//   ws.on('message', function message(data) {
//     console.log('received: %s', data);
//   });
//   // 发送
//   setInterval(() => {
//     successNum=successNum+1;
//     console.log(successNum,'匹配')
//     if(successNum==3){
//       wsObj.msg='录入成功'
//       wsObj.type='finish'
//     }
//     if(successNum>3){
//       successNum=0
//     }
//     ws.send(JSON.stringify(wsObj));
//   }, 3000);
// });
