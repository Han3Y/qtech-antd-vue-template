<template>
<div>
  <div class="tw-flex" v-for="file in fileList" :key="file.uid">
    <div class="tw-flex-1">{{file.name}}</div>
    <div class="tw-flex-1"> &nbsp;&nbsp;&nbsp;&nbsp;{{fileListMap[file.uid].percent}}</div>
    <div class="tw-flex-1">{{file.size | prettyBytes}}</div>
  </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import fileUpload from "@/store/modules/fileUpload";
export default {
  name: "FileList",
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
      fileList: state => {
        return state.fileUpload.fileList
      },
      fileListMap: state => {
        return state.fileUpload.fileListMap
      },
    }),
  },
}
</script>

<style scoped>

</style>