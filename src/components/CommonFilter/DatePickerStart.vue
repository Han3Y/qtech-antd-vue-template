<template>
  <div>
    <a-date-picker
      v-model='sTime'
      :disabled-date='disabledStartDate'
      show-time
      inputReadOnly
      format='YYYY-MM-DD HH:mm:ss'
      placeholder='请选择开始时间'
      @change='onChange_change'
    />
  </div>
</template>

<script>
export default {
  name: 'DatePickerStart',
  props: {
    startTime: {//开始时间，sync
      type: Object | String,
      default: ''
    },
    endTime: {//结束时间
      type: Object | String,
      default: ''
    }
  },
  watch: {
    startTime(val) {
      this.sTime = val
    }
  },
  data() {
    return {
      sTime: ''
    }
  },
  methods: {
    onChange_change(moment) {
      this.$emit('update:startTime', moment)
    },
    disabledStartDate(startTime) {
      const endTime = this.endTime
      if (!startTime || !endTime) {
        return false
      }
      return startTime.valueOf() > endTime.valueOf()
    }
  }
}
</script>

<style scoped>


</style>