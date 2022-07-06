<template>
<a-row :gutter="12">
  <a-col :span="12">
    <FileUpload />

    <a-button @click='trigger'>test</a-button>
  </a-col>
  <a-col :span="12">
    <FileList/>
  </a-col>
</a-row>
</template>

<script>
import FileUpload from "@/views/testPage/components/FileUpload";
import FileList from "@/views/testPage/components/FileList";

export default {
  name: "TestPage",
  components: {
    FileList,
    FileUpload
  },
  data(){
    return {
      showUpload: true
    }
  },
  methods: {
    trigger(){
      this.$eventBus.$emit('triggerClick')
    }
  }
}
</script>

<style scoped>

</style>