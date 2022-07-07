<template>
  <div class='modal-view-box'>
    <a-form-model :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item label="字段1" >
        {{record.key1}}
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import {LABEL_COL, WRAPPER_COL} from "@/config/uiConfig";

export default {
  name: "DemoViewModal",
  props: {
    record: {
      type: Object,
      default: function (){
        return {}
      }
    }
  },
  data: function() {
    return {
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
    }
  }
}
</script>

<style scoped>

</style>