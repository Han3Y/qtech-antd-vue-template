<template>
  <div class='export-btn-content'>
    <a-button type='primary' @click='onClick_exportData' :loading='loading' :disabled='disabled'>
      导出数据
    </a-button>
  </div>
</template>

<script>
import { commonServiceApi } from '@/api/common'

const config = require('../../config')
export default {
  name: 'ExportBtn',
  props: {
    disabled: Boolean,
    params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    onClick_exportData() {
      if (!this.params.action) {//如果没有传参数，自定义导出事件
        this.$emit('exportHandle')
        return
      }
      this.loading = true
      let params = Object.assign({}, this.params)
      commonServiceApi.exportData(params).then(res => {
        let { downUrl } = res
        window.open( downUrl, '_blank')
      }).finally(() => {
        setTimeout(() => {
          this.loading = false
        }, 1000)
      })
    }
  }
}
</script>

<style scoped>
.export-btn-content {
  margin-bottom: 16px
}
</style>