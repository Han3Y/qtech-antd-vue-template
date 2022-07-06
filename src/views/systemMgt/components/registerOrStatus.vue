<template>
  <!--高级设置-平台注册及状态-->
  <div class='table-page-search-wrapper'>
    <a-card :bordered='false' title='平台注册及状态' class='tw-mt-4'>
      <a-form layout='inline'>
        <a-row :gutter='48'>
          <a-col :md='md' :sm='24'>
            <a-form-item label='注册状态'>
              <span :class="queryParams.registerState===REGISTER_STATUS_VALUE['yes']?'yizhuce':'weizhuce'">
                {{ REGISTER_STATUS[queryParams.registerState] }}
              </span>
              <span
                :class="['icon','font_family',queryParams.registerState===REGISTER_STATUS_VALUE['yes']?'icon-yizhuce':'icon-weizhuce']"></span>
            </a-form-item>
          </a-col>
          <a-col :md='md' :sm='24'>
            <a-form-item label='心跳状态'>
              {{ HEART_STATUS[queryParams.heartState] }}
            </a-form-item>
          </a-col>
          <a-col :md='md' :sm='24'>
            <a-form-item label='反向代理状态'>
              {{ queryParams.proxy === PROXY_YES ? queryParams.proxy : '-' }}
            </a-form-item>
          </a-col>
          <a-col :md='md' :sm='24'>
            <a-form-item label='平台IP地址'>
              {{ queryParams.ip }}
            </a-form-item>
          </a-col>
          <a-col :md='md' :sm='24'>
            <a-form-item label='平台端口'>
              {{ queryParams.port }}
            </a-form-item>
          </a-col>
          <a-col :md='md' :sm='24'>
            <a-form-item label='心跳频率'>
              {{ queryParams.heartFreq }}s
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter='48' class='tw-text-right'>
          <a-button class='tw-mx-4' type='primary' @click='onClick_register'>注册</a-button>
          <a-button @click='onClick_cancleRegister' v-if='REGISTER_STATUS_VALUE["yes"]===queryParams.registerState'
                    type='primary' class='tw-mx-4'>
            {{ REGISTER_STATUS_VALUE['yes'] === queryParams.registerState ? '取消当前注册' : '' }}
          </a-button>
        </a-row>
      </a-form>
    </a-card>
  </div>

</template>

<script>
import registerPlatform from '@/views/systemMgt/components/registerPlatform'

const PROXY_NO = 'no'
const PROXY_YES = 'yes'
const HEART_STATUS = {
  'connected': '正常',
  'idle': '不正常'
}
const REGISTER_STATUS = {
  'yes': '已注册',
  'no': '未注册'
}
const REGISTER_STATUS_VALUE = {
  'yes': 'yes',
  'no': 'no'
}

import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import { MODAL_SIZE } from '@/config/uiConfig'

export default {
  name: 'registerOrStatus',
  data() {
    return {
      PROXY_NO: PROXY_NO,
      PROXY_YES: PROXY_YES,
      HEART_STATUS: HEART_STATUS,
      REGISTER_STATUS: REGISTER_STATUS,
      REGISTER_STATUS_VALUE: REGISTER_STATUS_VALUE,
      md: 4,
      queryParams: {},
      labelCol: { md: { span: 2 } },
      wrapperCol: { md: { span: 10 } }
    }
  },
  created() {
    this.getPlatformInfo()
  },
  methods: {
    onClick_cancleRegister() {
      //  取消注册
      this.$mConfirm({
        title: '提示',
        content: '即将取消平台注册，是否继续？',
        okText: '确认',
        cancelText: '取消'
      }).then(res => {
        systemMgtService.calcelPlatformInfo().then(res => {
          this.getPlatformInfo()
          this.$message.success('操作成功')
        })
      })

    },
    onClick_register() {
      //  注册
      this.$dialog(
        registerPlatform,
        {
          queryParams: Object.assign({}, this.queryParams),
          on: {
            ok: () => {
              this.getPlatformInfo()
              this.$message.success({
                content: '注册成功',
                duration: 2
              })
            },
            cancel() {
            },
            close() {
            }
          }
        },
        {
          title: '注册',
          width: MODAL_SIZE.EDIT,
          centered: true,
          maskClosable: false,
          okText: '确定',
          cancelText: '取消'
        }
      )
    },
    getPlatformInfo() {
      systemMgtService.getPlatformInfo().then(res => {
        this.queryParams = res
      })
    }
  }
}
</script>

<style scoped lang='less'>
.icon-yizhuce,.yizhuce {
  color: #219d00;
}

</style>