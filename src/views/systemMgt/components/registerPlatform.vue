<template>
  <!--高级设置-平台注册-注册-->
  <div>
    <a-spin :spinning='loading'>
      <a-form-model :model='formData' :rules='rules' ref='form' :label-col='labelCol' :wrapper-col='wrapperCol'>
        <a-form-model-item label='平台IP地址' prop='ip'>
          <a-input placeholder='请输入IP' v-model='formData.ip' />
        </a-form-model-item>
        <a-form-model-item label='平台端口' prop='port'>
          <a-input placeholder='1-65535整数' v-model='formData.port' />
        </a-form-model-item>
        <a-form-model-item label='心跳频率' prop='heartFreq'>
          <a-input placeholder='请输入正整数' v-model='formData.heartFreq' >
            <template slot='suffix'>s/次</template>
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>

</template>

<script>
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import { INT_VALIDATOR, IP_VALIDATOR, VALIDATOR_MSG } from '@/utils/validator'

export default {
  name: 'registerPlatform',
  props: {
    queryParams: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      formData: this.queryParams,
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
      rules: {
        ip: [{ required: true, message: VALIDATOR_MSG.ip, trigger: 'change' },
          { validator: IP_VALIDATOR }],
        port: [{ required: true, message: VALIDATOR_MSG.port, trigger: 'change' },
          { validator: INT_VALIDATOR }],
        heartFreq: [{ required: true, message: VALIDATOR_MSG.int, trigger: 'change' },
          { validator: INT_VALIDATOR }]
      }
    }
  },
  methods: {
    onOk() {
      return this.$refs.form.validate().then(res=>{
        let params = Object.assign({}, {
          ip: this.formData.ip,
          port: this.formData.port,
          heartFreq: this.formData.heartFreq
        })
        return systemMgtService.registerPlatform(params)
      })
    }
  }
}
</script>

<style scoped>

</style>