<template>
  <!-- 上传文件 -->
  <div>
    <a-input v-model='fileName' placeholder='请选择文件' class='tw-w-120' readOnly></a-input>
    <a-upload
      class='tw-mx-3'
      :showUploadList='false'
      name='file'
      :multiple='false'
      action='#'
      :beforeUpload='()=>false'
      @change='onChange_uploadFile'
    >
      <a-button type='primary'>
        浏览
      </a-button>
    </a-upload>
    <a-button type='primary' :disabled='!fileName' @click='onClick_upload'>
      {{ btnText }}
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  props: {
    btnText: {
      type: String,
      default: '升级'
    }
  },
  data() {
    return {
      fileName: ''
    }
  },
  methods: {
    onClick_upload() {
      this.$emit('uploadHandle')
    },
    onChange_uploadFile(files) {
      let { file } = files
      this.fileName = file.name
    }
  }
}
</script>

<style scoped>

</style>