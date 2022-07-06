<template>
  <!-- 设备管理-基础设置 -->
  <div>
    <a-card :bordered='false' title='登录安全设置' class='tw-mt-4'>
      <a-form-model :model='loginInfo'>
        <a-form-model-item label='系统强制登出时间' class='tw-flex tw-items-center'>
          <a-input-number id='inputNumber' v-model='loginInfo.timeInterval' :min='5' :max='60'
                          :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />
          <span>&nbsp;分钟</span>
          <span class='tw-text-iptips tw-text-3xl tw-pl-4'>&nbsp;*登出时间允许为5-60分钟</span>
        </a-form-model-item>
        <a-row>
          <a-col :span='20'>
            <a-form-model-item style='margin-bottom: 0' label='可尝试登录次数' class='tw-flex tw-items-center'>
              <a-input-number id='inputNumber' v-model='loginInfo.count' :min='5' :max='10'
                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />
              <span>&nbsp;次&nbsp;</span>
              <span class='tw-text-iptips tw-text-3xl tw-pl-4'>&nbsp;*登录次数允许为5-10次</span>
            </a-form-model-item>
          </a-col>
          <a-col :span='4'>
            <a-form-model-item class='tw-text-right' style='margin-bottom: 0'>
              <a-button type='primary' @click='onClick_saveSafe' :loading='loading'>保存</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>

      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'

export default {
  name: 'loginSafeConfig',
  data() {
    return {
      loginInfo: {},
      loading: false
    }
  },
  created() {
    this.getLoginArg()
  },
  methods: {
    onClick_saveSafe() {
      this.loading = true
      let params = this.loginInfo
      systemMgtService.setLoginArg(params).then(res => {
        this.loading = false
        this.$message.success('保存成功')
      })
    },
    getLoginArg() {
      systemMgtService.getLoginArg().then(res => {
        this.loginInfo = res
      })
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep{
  .ant-form{
    .ant-form-item{
      .ant-form-item-label{
        min-width: 150px;
      }
    }
  }
}


</style>