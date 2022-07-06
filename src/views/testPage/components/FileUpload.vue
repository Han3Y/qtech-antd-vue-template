<template>
<div>
  <a-upload
    v-show="false"
    :multiple="true"
    :withCredentials="true"
    @change="change"
    :beforeUpload="beforeUpload"
    :customRequest="handleUpload"
    action="/cgi-bin/testFile">
    <button ref="uploadBtn">upload</button>
  </a-upload>
</div>
</template>

<script>
import {mapMutations} from "vuex";
import {$http} from "@/utils/request";

export default {
  name: "FileUpload",
  data(){
    return {
      chunkList: [],
      currentFile: null,
      fileObj: {}
    }
  },
  methods: {
    ...mapMutations(['ADD_FILE', 'CHANGE_FILE_STATE']),
    beforeUpload(file, fileList){
      console.log('beforeUpload')
      this.fileObj[file.uid] = {
        file: file,
        successChunk : 0, // 当前已上传成功的片数
        chunkList : [] // 清空文件流数组
      }

      this.ADD_FILE(file)
    },
    change(obj){
      // this.CHANGE_FILE_STATE(obj.file);
    },
    handleUpload(param){
      const file = param.file;
      let blobSlice = File.prototype.slice;
      let currentChunk = 0; // 当前第几片
      const chunkSize = 5 * 1024 * 1024; // 每片的大小，这里是5M
      let chunks = Math.ceil(file.size / chunkSize); // 总片数
      let _that = this;
      function upload(){
        let start = currentChunk * chunkSize;
        let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
        let formData = new FormData();
        formData.append('file', blobSlice.call(file, start, end));
        formData.append('chunk', currentChunk + '');
        $http.post('/testFile', formData, {
          headers: {
            'Content-Type': 'multipart/form-data;',
          }
        }).then(res => {
          if(currentChunk < chunks - 1){
            currentChunk ++;
            upload();
          }else{
            console.log('上传成功：', file.name);
            // todo 发送合并请求，或者后台自己合并
          }
          _that.CHANGE_FILE_STATE(Object.assign(file, {percent: (currentChunk + 1) / chunks}))
        }).catch(() => {
          _that.CHANGE_FILE_STATE(Object.assign(file, {percent: (currentChunk + 1) / chunks, state: 'error'}))
        })
      }
      upload();
    }
  },
  watch: {

  },
  mounted() {
    this.$eventBus.$on('triggerClick', () => {
      this.$refs.uploadBtn.click();
    })
  }
}
</script>

<style scoped>

</style>