<template>
  <!--高级设置-License更新-->
  <a-card :bordered='false' title='License更新' class='tw-mt-4'>
    <a-form-model :model='queryParams' :label-col='labelCol' :wrapper-col='wrapperCol' >
      <a-form-model-item label='License更新时间'>
        {{queryParams.licenseUpdateTime}}
      </a-form-model-item>
      <a-form-model-item label='许可到期时间'>
        {{queryParams.licenseExpireTime}}
      </a-form-model-item>
      <a-form-model-item :colon='false'>
        <template #label>
          <a-button type='primary'>下载机器码</a-button>
        </template>
      </a-form-model-item>
      <a-form-model-item >
          <UploadFile btnText='更新'></UploadFile>
      </a-form-model-item>
    </a-form-model>
  </a-card>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import UploadFile from '@/components/UploadFile/UploadFile'
export default {
  name: 'licenseUpdate',
  components:{
    UploadFile
  },
  data() {
    return {
      queryParams: {},
      labelCol: { md: { span: 2 } },
      wrapperCol: { md: { span: 20 } }
    }
  },
  created() {
    this.queryLice()
  },
  methods: {
    queryLice() {
      systemMgtService.queryLice().then(res => {
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
    .ant-form-item-label{
      min-width: 120px;
    }
  }
}

</style>