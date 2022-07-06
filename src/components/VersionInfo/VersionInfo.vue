<template>
  <div class='global-scroll-bar tw-max-h-6.5625 tw-overflow-y-auto'>
    <img style='display:block;margin:0 auto 4px' src='/static/logo/logo_version.png'>
    <div class='tw-text-center tw-text-6xl tw-text-subTitle tw-leading-15'>{{systemInfo.deviceName}}{{systemInfo.softVer}}</div>
    <div class='tw-flex tw-flex-col tw-min-h-37.5'></div>
    <div class='tw-flex tw-justify-between tw-item-center'>
      <div class='tw-text-tips'>©2021  浙江齐安信息科技有限公司  保留所有权利</div>
      <div class='tw-text-tips'>授权有效期:{{systemInfo.liceTime}}</div>
    </div>
  </div>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'

export default {
  name: 'VersionInfo',
  data(){
    return {
      systemInfo:{}
    }
  },
  created() {
    systemMgtService.getSysInfo().then(res=>{
      this.systemInfo=res;
    })
  }
}
</script>

<style scoped>

</style>