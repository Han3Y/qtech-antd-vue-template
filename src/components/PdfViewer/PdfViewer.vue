<template>
<iframe class='pdf-iframe' :src='src'>

</iframe>
</template>

<script>
export default {
  name: 'PdfViewer',
  props: {
    filePath: {
      type: String,
      default: ''
    },
  },
  data(){
    return {

    }
  },
  computed: {
    src(){
      return '/static/pdf/web/viewer.html?file=' + this.filePath
    }
  }
}
</script>

<style scoped lang='less'>
.pdf-iframe{
  width: 100%;
  height: 100%;
  border: 0;
}
</style>