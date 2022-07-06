<template>
  <!--仅详情信息展示-->
  <a-form class='detaile-form'>
    <a-row>
      <a-col :md='!item.options?12:item.options.col' :xs='24' v-for='(item,index) in itemColumn' :key='index'>
        <a-form-item
          :label='item.label'
          :label-col='{span:!item.options?4:item.options.labelCol}'
          :wrapper-col='{span:!item.options?18:item.options.wrapperCol}'
        >
          <span v-if='item.slot'>
            <slot :name='item.slot'></slot>
          </span>
          <span v-else>
          {{ infoData[item.value] }}
          </span>
        </a-form-item>
      </a-col>
    </a-row>

  </a-form>
</template>

<script>
export default {
  name: 'DetailesInfoItem',
  props: {
    infoData: { //详情数据
      type: Object,
      default: () => {
        return {}
      }
    },
    itemColumn: {
      type: Array,
      default: () => {
        return []// [{label:'',value:'',slot:'',options:{col:12,labelCol:4,wrapperCol:15}}]
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang='less'>
.detaile-form {
  ::v-deep {
    .ant-form-item {
      margin-bottom: 16px;

      .ant-form-item-control {
        line-height: 22px;
        color: rgba(0, 0, 0, .85);

      }

      .ant-form-item-label {
        min-width: 100px;
        line-height: 22px;
      }
    }
  }
}
</style>