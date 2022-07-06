/**
 * websocket连接工具
 */
export class WebsocketUtil{
  constructor(url, msgCb) {
    if(!url || !(typeof url === 'string')){
      throw new Error('url 错误')
    }else{
      this.url = (location.origin + url).replace('http', 'ws');
    }
    this.websocket = {};
    if(typeof msgCb === 'function'){
      this.msgCb = msgCb;
    }
    this.connect();
  }

  /**
   * 连接
   */
  connect(){
    try {
      this.websocket = new WebSocket(this.url);
      this.websocket.onopen = this.onopen;
      this.websocket.onerror = this.onerror;
      this.websocket.onclose = this.onclose.bind(this);
      this.websocket.onmessage = this.msgCb;
    }catch (e){
      console.log(`${this.url} 连接失败`);
    }

  }

  /**
   * 连接成功回调
   */
  onopen(){
    console.log(`${this.url} 连接成功`);
  }

  /**
   * 连接失败回调
   */
  onerror(){
    console.log(`${this.url} 连接错误`);
  }

  /**
   * 连接断开回调
   */
  onclose(){
    console.log(`${this.url} 连接断开`, this.websocket);

  }

  /**
   * 发送消息
   * @param msg
   */
  sendMsg(msg){
    if(this.websocket && this.websocket.readyState === 1){
      this.websocket.send(msg);
    }else if(this.websocket.readyState === 0){
      this.connecting(msg);
    }
  }

  /**
   * 重试发送
   * @param msg
   */
  connecting(msg){
    setTimeout(() => {
      if (this.websocket.readyState === 0) {
        this.connecting(msg);
      } else {
        this.websocket.send(msg);
      }
    }, 1000)
  }

  /**
   * 关闭连接
   */
  close(){
    this.websocket.close();
  }
}
