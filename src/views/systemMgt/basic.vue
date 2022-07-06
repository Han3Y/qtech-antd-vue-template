<template>
  <!-- 设备管理-基础设置 -->
  <div class='basic-content'>
    <systemInfo></systemInfo>
    <portInfo></portInfo>
    <timeConfig></timeConfig>
    <whiteIP></whiteIP>
    <loginSafeConfig></loginSafeConfig>
    <logConfig></logConfig>
    <exportTable></exportTable>
  </div>
</template>

<script>
import systemInfo from '@/views/systemMgt/components/systemInfo'
import portInfo from '@/views/systemMgt/components/portInfo'
import timeConfig from '@/views/systemMgt/components/timeConfig'
import whiteIP from '@/views/systemMgt/components/whiteIP'
import loginSafeConfig from '@/views/systemMgt/components/loginSafeConfig'
import logConfig from '@/views/systemMgt/components/logConfig'
import exportTable from "@/views/systemMgt/components/exportTable"
export default {
  name: 'basic',
  components:{
    systemInfo,
    portInfo,
    timeConfig,
    whiteIP,
    loginSafeConfig,
    logConfig,
    exportTable
  }
}
</script>

<style scoped>
.basic-content{

}
</style>