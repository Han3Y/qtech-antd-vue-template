<template>
  <!--基础设置-离线报表导出-->
  <div class='table-page-search-wrapper'>
    <a-card :bordered='false' title='离线报表导出' class='tw-mt-4'>
      <a-form layout='inline'>
        <a-row :gutter='48'>
          <a-col :md='md' :sm='24'>
            <a-form-item label='开始时间'>
              <DatePickerStart :startTime.sync='queryParam.startTime' :endTime='queryParam.endTime'></DatePickerStart>
            </a-form-item>
          </a-col>
          <a-col :md='md' :sm='24'>
            <a-form-item label='结束时间'>
              <DatePickerEnd :startTime='queryParam.startTime' :endTime.sync='queryParam.endTime'></DatePickerEnd>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col class='tw-text-right'>
            <a-button type='primary' @click='onClick_exportTabel' :loading='loading'
                      :disabled='disabledHandl()'>导出
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import DatePickerStart from '@/components/CommonFilter/DatePickerStart'
import DatePickerEnd from '@/components/CommonFilter/DatePickerEnd'
import TimeUtil from '@/utils/timeUtil'
import config from '../../../config'

export default {
  name: 'exportTable',
  components: {
    DatePickerStart,
    DatePickerEnd
  },
  data() {
    return {
      md: 11,
      queryParam: {
        startTime: '',
        endTime: ''
      },
      loading: false
    }
  },
  methods: {
    onClick_exportTabel() {
      this.loading = true
      let params = {
        startTime: TimeUtil.timeConvertTtime(this.queryParam.startTime.valueOf()),
        endTime: TimeUtil.timeConvertTtime(this.queryParam.endTime.valueOf())
      }
      systemMgtService.getOfflineData(params).then(res => {
        let { downUrl } = res
        window.open(downUrl, '_blank')
        this.loading = false
      })
    },
    disabledHandl() {
      if (this.queryParam.startTime && this.queryParam.endTime) {
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style scoped lang='less'>
::v-deep {
  .ant-form {
    .ant-form-item {
      .ant-form-item-label {
        min-width: 150px;
      }
    }
  }
}

</style>