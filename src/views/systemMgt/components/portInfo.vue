<template>
  <!-- 这里功能不完善 -->
  <a-card title='端口信息' :bordered='false' class='tw-mt-4'>
    <div class='tw-flex tw-items-center'>
      <div class='tw-flex tw-flex-col tw-w-45 tw-items-center tw-cursor-pointer' @click='onClick_configPort'>
        <div class='tw-text-config tw-text-3xl'>点击配置</div>
        <img class='tw-w-22 tw-mb-md' src='../../../assets/images/port-up.png' v-if='PORT_STATUS["UP"]===portInfo.mgt' />
        <img class='tw-w-22 tw-mb-md' src='../../../assets/images/port-down.png' v-else />
        <div class='tw-text-tips tw-text-3.5xl'>MGMT(管理口)</div>
        <div class='tw-text-total tw-text-3.5xl'>{{portInfo.mgtIp?portInfo.mgtIp:'&nbsp'}}</div>
      </div>
      <div class='tw-flex tw-flex-col tw-w-45 tw-items-center tw-cursor-pointer'>
        <div class='tw-text-config tw-text-3xl'>&nbsp</div>
        <img class='tw-w-22 tw-mb-md' src='../../../assets/images/port-up.png' v-if='PORT_STATUS["UP"]===portInfo.port1' />
        <img class='tw-w-22 tw-mb-md' src='../../../assets/images/port-down.png' v-else />
        <div class='tw-text-tips tw-text-3.5xl'>LAN1(业务口1)</div>
        <div class='tw-text-total tw-text-3.5xl'>&nbsp</div>
      </div>
      <div class='tw-flex tw-flex-col tw-w-45 tw-items-center tw-cursor-pointer'>
        <div class='tw-text-config tw-text-3xl'>&nbsp</div>
        <img class='tw-w-22 tw-mb-md' src='../../../assets/images/port-up.png' v-if='PORT_STATUS["UP"]===portInfo.port2' />
        <img class='tw-w-22 tw-mb-md' src='../../../assets/images/port-down.png' v-else />
        <div class='tw-text-tips tw-text-3.5xl'>LAN2(业务口2)</div>
        <div class='tw-text-total tw-text-3.5xl'>&nbsp</div>
      </div>
    </div>

  </a-card>
</template>
<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import IpMgtConfig from '@/views/systemMgt/components/IpMgtConfig'
import { MODAL_SIZE } from '@/config/uiConfig'

const PORT_STATUS = {
  UP: 'up',
  DOWN: 'down'
}
export default {
  name: 'portInfo',
  data() {
    return {
      PORT_STATUS: PORT_STATUS,
      portInfo: {}
    }
  },
  created() {
   this.getPortInfo()
  },
  methods:{
    getPortInfo(){
      systemMgtService.getPortInfo().then(res => {
        this.portInfo = res
      })
    },
    onClick_configPort(){
      //不确定是否是只有开启才能配置
      if(this.portInfo.mgt===PORT_STATUS['UP']){
        this.$dialog(IpMgtConfig,
          {
            queryParam:this.portInfo,
            on: {
              ok: () => {
                this.$message.success({
                  content: '设置成功',
                  duration: 2
                })
                this.getPortInfo()
              },
              cancel() {
              },
              close() {
              }
            }
          },
          {
            title: 'IP配置',
            width: MODAL_SIZE.MD,
            centered: true,
            maskClosable: false,
            okText: '保存',
            cancelText: '关闭'
          })
      }
    }
  }
}
</script>

<style scoped>

</style>