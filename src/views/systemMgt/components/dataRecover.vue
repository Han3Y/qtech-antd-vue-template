<template>
  <!--高级设置-数据恢复-->
  <a-card :bordered='false' title='数据恢复' class='tw-mt-4'>
    <a-form-model :model='queryParams' :label-col='labelCol' :wrapper-col='wrapperCol'>
      <a-form-model-item label='最近恢复时间' style='margin-bottom: 16px'>
        {{ queryParams.time ? queryParams.time : '-' }}
      </a-form-model-item>
      <a-form-model-item style='margin-bottom: 0'>
        <UploadFile></UploadFile>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import UploadFile from '@/components/UploadFile/UploadFile'

export default {
  name: 'dataRecover',
  components: {
    UploadFile
  },
  data() {
    return {
      queryParams: {
        time: ''
      },
      labelCol: { md: { span: 2 } },
      wrapperCol: { md: { span: 20 } }
    }
  },
  created() {
    this.getRecoverTime()
  },
  methods: {
    getRecoverTime() {
      systemMgtService.getRecoverTime().then(res => {
        this.queryParams = res
      })
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep{
  .ant-form{
    margin-left: 32px;
    .ant-form-item{
      .ant-form-item-label{
        min-width: 100px;
        text-align: left;
      }
    }
  }
}

</style>