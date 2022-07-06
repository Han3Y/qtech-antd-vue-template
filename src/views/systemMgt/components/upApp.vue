<template>
  <!--高级设置-软件升级-->
  <a-card :bordered='false' title='软件升级' class='tw-mt-4'>
    <a-row :gutter='[0,16]' style='margin-left: 32px'>
      <a-col :md='24' >当前版本：{{ systemInfo.softVer }}</a-col>
      <a-col :md='24'>
        <UploadFile @uploadHandle='onClick_upload'></UploadFile>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import UploadFile from '@/components/UploadFile/UploadFile'

export default {
  name: 'upApp',
  components: {
    UploadFile
  },
  data() {
    return {
      systemInfo: {}
    }
  },
  created() {
    systemMgtService.getSysInfo().then(res => {
      this.systemInfo = res
    })
  },
  methods: {
    onClick_upload() {
      //  上传
    },
    handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    }
  }
}
</script>

<style scoped>

</style>