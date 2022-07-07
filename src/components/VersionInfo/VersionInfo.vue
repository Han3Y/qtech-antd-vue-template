<template>
  <div class='global-scroll-bar tw-max-h-6.5625 tw-overflow-y-auto'>
    <img style='display:block;margin:0 auto 4px' src='/static/logo/logo_version.png'>
    <div class='tw-text-center tw-text-6xl tw-text-subTitle tw-leading-15'>{{app.name}}{{systemInfo.softVer}}</div>
    <div class='tw-flex tw-flex-col tw-min-h-37.5'></div>
    <div class='tw-flex tw-justify-between tw-item-center'>
      <div class='tw-text-tips'>©{{ app.copy }}  {{ app.company }}  保留所有权利</div>
      <div class='tw-text-tips'>授权有效期:{{systemInfo.liceTime}}</div>
    </div>
  </div>
</template>

<script>

import { commonServiceApi } from '@/api/common'
import { mapState } from 'vuex'

export default {
  name: 'VersionInfo',
  data(){
    return {
      systemInfo:{}
    }
  },
  computed: {
    ...mapState(['app'])
  },
  created() {
    commonServiceApi.getVersionInfo().then(res=>{
      this.systemInfo= res || {};
    })
  }
}
</script>

<style scoped>

</style>