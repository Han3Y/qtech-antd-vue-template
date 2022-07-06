<template>
  <div>
    <a-date-picker
      v-model='eTime'
      :disabled-date='disabledEndDate'
      show-time
      inputReadOnly
      format='YYYY-MM-DD HH:mm:ss'
      placeholder='请选择结束时间'
      @change='onChange_change'
    />
  </div>
</template>

<script>
export default {
  name: 'DatePickerEnd',
  props: {
    startTime: {//开始时间
      type: Object | String,
      default: ''
    },
    endTime: {//结束时间，sync
      type: Object | String,
      default: ''
    }
  },
  watch: {
    endTime(val) {
      this.eTime = val
    }
  },
  data() {
    return {
      eTime: ''
    }
  },
  methods: {
    onChange_change(moment) {
      this.$emit('update:endTime', moment)
    },
    disabledEndDate(endTime) {
      const startTime = this.startTime
      if (!endTime || !startTime) {
        return false
      }
      return startTime.valueOf() >= endTime.valueOf()
    }
  }
}
</script>

<style scoped>

</style>