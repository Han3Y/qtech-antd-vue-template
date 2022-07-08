<template>
  <PdfViewer :filePath='"/static/pdf/pdfTest.pdf"' style='height: 730px' />
</template>

<script>
import PdfViewer from '@/components/PdfViewer/PdfViewer'

export default {
  name: "Tab1",
  components: {
    PdfViewer
  }
}
</script>

<style scoped>

</style>