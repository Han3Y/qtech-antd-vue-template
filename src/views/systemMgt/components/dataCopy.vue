<template>
  <!-- 高级设置-数据备份 -->
  <div>
    <a-card :bordered='false' title='数据备份' class='tw-mt-4'>
      <a-form-model :model='queryParams' :label-col='labelCol' :wrapper-col='wrapperCol' >
        <a-form-model-item label='最近备份时间' style='margin-bottom: 16px'>
          {{queryParams.time|moment}}
        </a-form-model-item>
        <a-form-model-item :colon='false' style='margin-bottom: 0'>
          <template #label>
            <a-button type='primary'>一键备份</a-button>
          </template>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'

export default {
  name: 'dataCopy',
  data() {
    return {
      queryParams: {
        time: ''
      },
      labelCol: { md: { span: 2 } },
      wrapperCol: { md: { span: 10 } }
    }
  },
  created() {
    this.getBackupTime()
  },
  methods: {
    getBackupTime() {
      systemMgtService.getBackupTime().then(res => {
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
      }
    }
  }
}
</style>