<template>
  <span class='tw-fixed tw-left-1/2 tw-transform tw--translate-x-2/4  tw-text-white'>{{ systemTime | moment }}</span>
</template>

<script>

import {commonServiceApi} from "@/api/common";

export default {
  name: 'SystemTime',
  data(){
    return {
      systemTime: Date.now(),
      timer: null,
      correctTimer: null
    }
  },
  methods: {
    getCurTime() {
      this.timer && clearInterval(this.timer);
      commonServiceApi.getTime().then(res => {
        let time  = res
        this.systemTime = time
        this.systemTime = +new Date(time)
        this.timer = setInterval(() => {
          this.systemTime += 1000
        }, 1000);
        // 每10分钟从后台矫正一次时间
        this.correctTimer = setTimeout(() => {
          this.getCurTime();
        }, 1000 * 60 * 10);
      })
    },
  },
  created() {
    this.getCurTime();
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
    this.correctTimer && clearTimeout(this.correctTimer);
  }
}
</script>

<style scoped>

</style>