<template>
  <!-- 端口信息-配置ip -->
  <a-spin :spinning='loading'>
    <a-form-model
      ref='form'
      :model='queryForm'
      :rules='rules'
      :label-col='labelCol'
      :wrapper-col='wrapperCol'
    >
      <a-form-model-item label='管理口IP地址' prop='mgtIp'>
        <a-input
          v-model='queryForm.mgtIp'
        />
      </a-form-model-item>
    </a-form-model>
  </a-spin>
</template>

<script>
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import { IP_VALIDATOR } from '@/utils/validator'

export default {
  name: 'IpMgtConfig',
  props: {
    queryParam: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      queryForm: Object.assign({}, this.queryParam, { mgt: this.queryParam?.mgtIp || '' }),
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
      loading: false,
      rules: {
        mgtIp: [{ required: true, message: '请输入正确的ip', trigger: 'change' }, { validator: IP_VALIDATOR }]
      }
    }
  },
  methods: {
    onOk() {
      this.$refs.form.validate().then(res=>{
        let params = {
          mgtIp: this.queryForm.mgtIp
        }
        return systemMgtService.setMngIp(params)
      })
    }
  }
}
</script>

<style scoped>

</style>