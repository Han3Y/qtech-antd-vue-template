<template>
  <!-- 基础设置-日志审计设置 -->
  <div>
    <a-card :bordered='false' title='日志审计设置' class='tw-mt-4'>
      <a-form-model :model='logInfo'>
        <a-form-model-item label='事件信息审计超时' class='tw-flex tw-items-center'>
          <a-input style='width: 120px' v-model='logInfo.count' readOnly></a-input>
          <span>&nbsp;条时自动覆盖旧日志</span>
        </a-form-model-item>
        <!--        <a-row>-->
        <!--          <a-col :span='20'>-->
        <!--            <a-form-model-item label='磁盘空间使用超过' class='tw-flex tw-items-center'>-->
        <!--              <a-input-number id='inputNumber' v-model='logInfo.diskPer' :min='1'-->
        <!--                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />-->
        <!--              <span>&nbsp;%时自动清理&nbsp;</span>-->
        <!--              <a-input-number id='inputNumber' v-model='logInfo.beforDay' :min='1'-->
        <!--                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />-->
        <!--              <span>&nbsp;天前的工控审计日志和&nbsp;</span>-->
        <!--              <a-input-number id='inputNumber' v-model='logInfo.fileDay' :min='1'-->
        <!--                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />-->
        <!--              <span>&nbsp;天前的流量采集文件附件</span>-->
        <!--            </a-form-model-item>-->
        <!--          </a-col>-->
        <!--          <a-col :span='4'>-->
        <!--            <a-form-model-item class='tw-text-right'>-->
        <!--              <a-button type='primary' @click='onClick_saveSafe'>保存</a-button>-->
        <!--            </a-form-model-item>-->
        <!--          </a-col>-->
        <!--        </a-row>-->
      </a-form-model>
      <a-form-model :model='logInfo' :rules='rules' layout='inline'>
        <a-row>
          <a-col :md='20' class='tw-flex tw-items-start'>
            <a-form-model-item label='磁盘空间使用超过' class='tw-flex tw-items-center'>
              <a-input-number id='inputNumber' v-model='logInfo.diskPer' :min='1'
                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />
              <span>&nbsp;%时自动清理&nbsp;</span>
            </a-form-model-item>
            <a-form-model-item class='tw-flex tw-items-center' prop='beforDay'>
              <a-input-number id='inputNumber' v-model='logInfo.beforDay' :min='1'
                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />
              <span>&nbsp;天前的工控审计日志和&nbsp;</span>
            </a-form-model-item>
            <a-form-model-item class='tw-flex tw-items-center' prop='fileDay'>
              <a-input-number id='inputNumber' v-model='logInfo.fileDay' :min='1'
                              :formatter='(val)=>{return val.replace(/[^\d]/g,"")}' />
              <span>&nbsp;天前的流量采集文件附件</span>
            </a-form-model-item>
          </a-col>
          <a-col :md='4' :sm='24' style='text-align: right'>
            <a-form-model-item style='margin-right: 0;'>
              <a-button type='primary' @click='onClick_saveSafe'>保存</a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import { MIN_DAY_NUM_VALIDATOR } from '@/utils/validator'

export default {
  name: 'loginSafeConfig',
  data() {
    return {
      logInfo: {},
      rules: {
        beforDay: [{ required: true, message: '请输入正确的时间', trigger: 'change' }, { validator: MIN_DAY_NUM_VALIDATOR }],
        fileDay: [{ required: true, message: '请输入正确的时间', trigger: 'change' }, { validator: MIN_DAY_NUM_VALIDATOR }]
      }
    }
  },
  created() {
    this.getLogArg()
  },
  methods: {
    onClick_saveSafe() {
      let params = this.logInfo
      systemMgtService.setLogArg(params).then(res => {
        this.$message.success('保存成功')
      })
    },
    getLogArg() {
      systemMgtService.getLogArg().then(res => {
        this.logInfo = res
      })
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep {
  .ant-form {
    .ant-form-item {
      .ant-form-item-label {
        min-width: 150px;
      }
    }
  }
}
</style>