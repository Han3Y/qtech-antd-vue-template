<template>
  <a-card title="设备信息" :bordered="false" >
    <a-form :layout="'inline'">
      <a-row>
        <a-col :md='item.span' :xs='24' v-for='(item,index) in COLUMN_LIST' :key='index'>
          <a-form-item :label="item.label">
            {{systemInfo[item.value]}}
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-card>
</template>

<script>
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
const COLUMN_LIST=[
  {label:'设备名称',value:'deviceName',span:5},
  {label:'设备型号',value:'deviceType',span:5},
  {label:'软件版本',value:'softVer',span:4},
  {label:'设备序列号',value:'deviceNo',span:5},
  {label:'许可到期',value:'liceTime',span:5},
]
export default {
  name: 'systemInfo',
  data(){
    return {
      COLUMN_LIST:COLUMN_LIST,
      systemInfo: {}
    }
  },
  created() {
    systemMgtService.getSysInfo().then(res=>{
      this.systemInfo=res;
    })
  }
}
</script>

<style scoped lang='less'>
::v-deep{
  .ant-form{
    .ant-form-item{
      padding-bottom: 0;
      .ant-form-item-label{
        min-width: 95px;
        line-height: 22px;
      }
      .ant-form-item-control{
        line-height: 22px;
      }
      .ant-form-item-children{
        color: rgba(0,0,0,.85);
      }
    }
  }
}

</style>