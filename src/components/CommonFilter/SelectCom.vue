<template>
  <!-- select下拉框 -->
  <div class='select-content'>
    <a-select v-model='defaultVal' @change='onChange_change'>
      <a-select-option v-for='item in selectTypeList'
                       :key='item.value'>
        {{ item.label }}
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import { PROTO_TYPE_NAME, PROTO_TYPE } from '@/components/CommonFilter/commonType'

export default {
  name: 'ProtoCom',
  props: {
    selectValue: {//默认值
      type: String,
      default: ''
    },
    selectType: {//类型值 ['all','',...]
      type: Array,
      default: () => {
        return []
      }
    },
    selectTypeArr: {//{all:'全部','':''}
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    selectValue: {
      handler(val) {
        this.defaultVal = val
      },
      immediate: true
    }
  },
  computed: {
    selectTypeList() {
      return this.selectType.map((item) => {
        return { label: this.selectTypeArr[item], value: item }
      })
    }
  },
  created() {

  },
  data() {
    return {
      defaultVal: ''//默认值
    }
  },
  methods: {
    onChange_change(val) {
      this.$emit('update:selectValue', val)
    }
  }
}
</script>

<style scoped>

</style>