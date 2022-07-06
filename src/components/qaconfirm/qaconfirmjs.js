import Vue from 'vue';
import confirm from './qaconfirm';
let confirmConstructor = Vue.extend(confirm);

const $confirm = {
  install(Vue){
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('Confirm', confirm)
    Vue.prototype.$mConfirm = function(options){
      let ops = Object.assign({
        title: '提示',
        content: '',
        okText: '确认',
        cancelText: '取消',
        showCancel: true,
      }, options);
      let vm = new Vue({
        render(h){
          return h(confirm,{
            props: {
              ...ops
            }
          })
        }
      }).$mount();
      const layer = vm.$children[0];
      document.body.appendChild(layer.$el);
      return new Promise((resolve, reject) => {
        layer.$onRemove = function(){
          document.body.removeChild(layer.$el);
          layer.$destroy();
          vm = null;
          reject();
        }
        layer.$onConfirm = function(){
          document.body.removeChild(layer.$el);
          layer.$destroy();
          vm = null;
          resolve();
        }
      })
    }
    Vue.prototype.$alert = function(options){
      return Vue.prototype.$mConfirm({
        ...options,
        showCancel: false
      })
    }
  }
}

let theConfirm = function (text) {
  return new Promise((res, rej) => { //promise封装，ok执行resolve，no执行rejectlet
   let confirmDom = new confirmConstructor({
    el: document.createElement('div')
   })
   document.body.appendChild(confirmDom.$el); //new一个对象，然后插入body里面
   confirmDom.text = text;  //对象传入

   confirmDom.confirm = function () {
    res()
    confirmDom.isShow = false
   }
   confirmDom.cancel = function () {
    rej()
    confirmDom.isShow = false
   }
  })
 }
 export default $confirm;