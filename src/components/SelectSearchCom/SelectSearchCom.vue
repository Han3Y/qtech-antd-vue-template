<template>
  <!-- 可搜索的select -->
  <a-select
    v-model='defaultVal'
    show-search
    placeholder=''
    option-filter-prop='children'
    style='width: 200px'
    :filter-option='filterOption'
    @change='handleChange'
  >
    <a-select-option :value='item.value' v-for='item in optionList' :key='item.value'>
      {{ item.label }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'SelectSearchCom',
  props: {
    optionVal: {//值
      type:String,
      default:''
    },
    optionList: {//列表
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    optionVal: {
      handler(val) {
        this.defaultVal = val
      },
      immediate: true
    }
  },
  data() {
    return {
      defaultVal: ''
    }
  },
  methods: {
    handleChange(value) {
      this.$emit('update:optionVal',value)
      this.$emit('changeSel',value)
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      )
    }
  }
}
</script>

<style scoped lang='less'>

</style>