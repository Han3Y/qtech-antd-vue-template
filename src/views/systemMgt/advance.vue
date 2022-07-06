<template>
  <!-- 设备管理-高级设置 -->
  <div>
    <a-spin :spinning='loading'>
      <systemSetInit></systemSetInit>
      <upApp></upApp>
      <licenseUpdate></licenseUpdate>
      <dataCopy></dataCopy>
      <dataRecover></dataRecover>
      <registerOrStatus></registerOrStatus>
    </a-spin>
  </div>
</template>

<script>
import systemSetInit from '@/views/systemMgt/components/systemSetInit'
import upApp from '@/views/systemMgt/components/upApp'
import licenseUpdate from '@/views/systemMgt/components/licenseUpdate'
import dataCopy from '@/views/systemMgt/components/dataCopy'
import dataRecover from '@/views/systemMgt/components/dataRecover'
import registerOrStatus from '@/views/systemMgt/components/registerOrStatus'

export default {
  name: 'advance',
  components: {
    systemSetInit,
    upApp,
    licenseUpdate,
    dataCopy,
    dataRecover,
    registerOrStatus
  },
  data(){
    return {
      loading:true
    }
  },
  created() {
    setTimeout(()=>{
      this.loading=false
    },800)
  }
}
</script>

<style scoped>

</style>