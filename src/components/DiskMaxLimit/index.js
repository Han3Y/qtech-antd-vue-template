import Vue from "vue"
import DiskMaxLimit from '@/components/DiskMaxLimit/DiskMaxLimit'

 const $diskLimit = {
  install(Vue) {
    if (typeof window !== 'undefined' && window.Vue) {
      Vue = window.Vue
    }
    Vue.component('DiskMaxLimit', DiskMaxLimit)
    Vue.prototype.$diskMaxLimit = function(options,confrimOk,closeOk) {
      let opts = Object.assign({}, {
        title: '提示',
        subTitle: '磁盘空间使用率已达到设置阈值。',
        confirmBtn: '确定',
        cancelBtn: '取消',
        showCancel: false
      },options)
      let vm = new Vue({
        render(h) {
          return h(DiskMaxLimit, { props: { ...opts } })
        }
      }).$mount()
      let layer = vm.$children[0]
      document.body.appendChild(layer.$el)
      layer.onConfirm = function() {
        document.body.removeChild(layer.$el)
        layer.$destroy()
        vm = null
        confrimOk()
      }
      layer.onClose = function() {
        document.body.removeChild(layer.$el)
        layer.$destroy()
        vm = null
        closeOk()
      }
      return layer
    }
  }
}
export default $diskLimit