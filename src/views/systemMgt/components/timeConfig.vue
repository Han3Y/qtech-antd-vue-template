<template>
  <!-- 基础设置-时间设置 -->
  <div class='time-config'>
    <a-card title='时间设置' :bordered='false' class='tw-mt-4'>
      <a-radio-group name='radioGroup' v-model='defaultVal' class='tw-w-full'>
        <a-row>
          <a-col :md='12' :sm='24'>
            <a-radio :value='TIME_TYPE["time"]'>
              手动选择：
              <a-date-picker
                v-model='timeInfo.time'
                show-time
                inputReadOnly
                format='YYYY-MM-DD HH:mm:ss'
                placeholder='请选择开始时间'
                @openChange='handleStartOpenChange'
              />
            </a-radio>
          </a-col>
          <a-col :md='12' :sm='24'>
            <a-radio :value='TIME_TYPE["ntp"]'>
              NTP自动同步：
              <a-input
                placeholder='请输入IP地址或网址'
                v-model='timeInfo.ntpIp'
              />
            </a-radio>
          </a-col>
          <a-col :md='24' :sm='24' class='tw-text-right tw-pt-6'>
            <a-button type='primary' @click='onClick_save' :disabled='disabledHandle()'>保存</a-button>
          </a-col>
        </a-row>
      </a-radio-group>
    </a-card>
  </div>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'

const TIME_TYPE = {
  time: 'time',
  ntp: 'ntp'
}
export default {
  name: 'timeConfig',
  data() {
    return {
      defaultVal: TIME_TYPE['time'],
      TIME_TYPE: TIME_TYPE,
      timeInfo: {
        time: '',
        ntpIp: ''
      }//时间信息
    }
  },
  methods: {
    disabledHandle(){
      if(TIME_TYPE["time"]==this.defaultVal){
        if(!this.timeInfo.time){
          return true
        }
      }
      if(TIME_TYPE["ntp"]==this.defaultVal){
        if(!this.timeInfo.ntpIp){
          return true
        }
      }
      return false
    },
    onClick_save() {
      let params = {}
      if (this.defaultVal === TIME_TYPE['ntp']) {
        params = {
          ntp: true,
          time: null,
          ntpIp: this.timeInfo.ntpIp
        }
      } else {
        params = {
          ntp: false,
          time: new Date(this.timeInfo.time.valueOf()).toISOString(),
          ntpIp: null
        }
      }
      systemMgtService.setTime(params).then(res => {
        this.$message.success({
          content: '保存成功',
          duration: 2
        })
      })
    },
    handleStartOpenChange(open) {
      // if (!open) {
      //   this.endOpen = true;
      // }
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep{
  .ant-radio-group{
    .ant-radio-wrapper{
      width: 68%;
      .ant-calendar-picker{
        //width: 100%;
      }
    }
  }
}

</style>