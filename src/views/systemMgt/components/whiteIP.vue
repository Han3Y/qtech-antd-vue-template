<template>
  <!-- 基础设置-访问IP白名单 -->
  <div>
    <a-card :bordered='false' class='tw-mt-4'>
      <template #title>
        访问IP白名单
        <span class='tw-text-iptips tw-text-3xl'>（最多可添加5条IP信息）</span>
      </template>
      <a-form-model :model='ipVal' :label-col='labelCol' :wrapper-col='wrapperCol' :rules='rules' ref='formData'
                    :hideRequiredMark='true'>
        <a-form-model-item label='启用状态'>
          <a-switch v-model='defaultChecked' @change='onChange_checked' />
        </a-form-model-item>
        <a-form-model-item label='访问IP白名单' prop='addIpVal'>
          <!--    编辑      -->
          <div v-for='(item,index) in queryParams.whiteIPArr'>
            <div class='tw-flex tw-items-center' v-if='curEditIdx!=index'>
              <div class='tw-w-1/3'>{{ item }}</div>
              <a-tooltip v-if='index!=0&&defaultChecked'>
                <template slot='title'>
                  编辑
                </template>

                <span class='icon font_family icon-xiugai tw-cursor-pointer' @click='onClick_edit(index,item)'
                      :style='{fontSize:"18px",color:"#999",margin:"0 20px"}'></span>
              </a-tooltip>
              <a-tooltip v-if='index!=0&&defaultChecked'>
                <template slot='title'>
                  删除
                </template>
                <a-popconfirm
                  title='是否要取消操作?'
                  ok-text='确定'
                  cancel-text='取消'
                  @confirm='onClick_delConfirm(item)'
                  @cancel='onClick_delCancel'
                >
                  <span class='icon font_family icon-shanchu tw-cursor-pointer' @click='()=>{}'
                        :style='{fontSize:"18px",color:"#999"}'></span>
                </a-popconfirm>
              </a-tooltip>
            </div>
            <!--  编辑中 -->
            <div v-else class='tw-flex tw-items-center '>
              <a-input class='tw-w-1/3' v-model='ipVal.addIpVal' placeholder='请输入IP地址' />
              <a-tooltip>
                <template slot='title'>
                  保存
                </template>
                <span class='icon font_family icon-baocun tw-cursor-pointer' @click='onClick_saveNewIp'
                      :style='{fontSize:"18px",color:"#999",margin:"0 20px"}'></span>
              </a-tooltip>
              <a-tooltip>
                <template slot='title'>
                  取消
                </template>
                <a-popconfirm
                  title='是否要取消操作?'
                  ok-text='确定'
                  cancel-text='取消'
                  @confirm='onClick_confirm'
                  @cancel='onClick_cancel'
                >
                     <span class='icon font_family icon-quxiao tw-cursor-pointer' @click='()=>{}'
                           :style='{fontSize:"18px",color:"#999"}'></span>
                </a-popconfirm>
              </a-tooltip>
            </div>
          </div>
        </a-form-model-item>
        <!--  添加-->
        <a-form-model-item :wrapper-col='{ span:8, offset: 2 }' prop='addIpVal' style='margin-bottom: 0'>
          <a-button class='add-btn-type'  type='dashed' icon='plus' :disabled='!defaultChecked'
                    @click='()=>{this.isAddIng=ADD}'
                    v-if='isAddIng===NO_ADD&&curEditIdx==-1&&queryParams.whiteIPArr.length<5'>
            添加
          </a-button>
          <div v-if='isAddIng===ADD' class='tw-flex tw-items-center tw-w-1/2'>
            <a-input v-model='ipVal.addIpVal' placeholder='请输入地址' />
            <a-tooltip>
              <template slot='title'>
                保存
              </template>
              <span class='icon font_family icon-baocun tw-cursor-pointer' @click='onClick_saveNewIp'
                    :style='{fontSize:"18px",color:"#999",margin:"0 20px"}'></span>
            </a-tooltip>
            <a-tooltip>
              <template slot='title'>
                取消
              </template>
              <a-popconfirm
                title='是否要取消操作?'
                ok-text='确定'
                cancel-text='取消'
                @confirm='onClick_confirm'
                @cancel='onClick_cancel'
              >
                        <span class='icon font_family icon-quxiao tw-cursor-pointer' @click='()=>{}'
                              :style='{fontSize:"18px",color:"#999"}'></span>
              </a-popconfirm>
            </a-tooltip>
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import { systemMgtService } from '@/views/systemMgt/systemMgtService'
import { IP_VALIDATOR, IP_REGEX_PATTERN } from '@/utils/validator'

const WHITEIPING = 'whiteIping'//已开启
const NOWHITEIP = 'noWhiteIp'//未开启
const ADD = 'addIng'//添加中编辑中
const NO_ADD = 'unAdd'//否添加中

export default {
  name: 'whiteIP',
  data() {
    return {
      defaultChecked: false,//白名单默认关闭
      queryParams: {
        whiteIPArr: []//IP白名单
      },
      ADD: ADD,
      NO_ADD: NO_ADD,
      isAddIng: NO_ADD,//是否添加中
      ipVal: {
        addIpVal: ''//新增ip值
      },
      curEditIdx: -1,//当前的编辑项
      labelCol: { md: { span: 2 } },
      wrapperCol: { md: { span: 10 } },
      rules: {
        addIpVal: [{ required: true, message: '请输入正确IP', trigger: 'change' }, { validator: IP_VALIDATOR }]
      }
    }
  },
  created() {
    this.getWhiteIpState()
    this.queryWhiteIp()
  },
  methods: {
    onClick_edit(idx, item) {
      //  编辑
      this.curEditIdx = idx
      this.ipVal.addIpVal = item
      this.isAddIng = NO_ADD
    },
    onClick_delConfirm(item) {
      //  删除
      let params = {
        ip: item
      }
      systemMgtService.delWhiteIp(params).then(res => {
        this.queryParams.whiteIPArr = res
      })
    },
    onClick_delCancel() {
    },
    onClick_saveNewIp() {
      //  新增ip
      let params = {
        ip: this.ipVal.addIpVal
      }
      if (!IP_REGEX_PATTERN(this.ipVal.addIpVal)) return
      systemMgtService.setWhiteIp(params).then(res => {
        this.resetFields()
        this.queryParams.whiteIPArr = res
        this.curEditIdx = -1
        this.$message.success('保存成功')
      })
    },
    onClick_confirm() {
      this.ipVal.addIpVal = ''
      this.isAddIng = NO_ADD
      this.curEditIdx = -1
      this.resetFields()
    },
    onClick_cancel() {

    },
    onChange_checked(val) {
      let params = {
        isActive: val
      }
      systemMgtService.setWhiteIpState(params).then(res => {
        let { status } = res
        if (!val) {
          //  关闭状态
          this.ipVal.addIpVal = ''
          this.isAddIng = NO_ADD
          this.curEditIdx = -1
        }
      }).catch(err => {
        this.defaultChecked = !val
      })
      this.resetFields()
    },
    getWhiteIpState() {
      systemMgtService.getWhiteIpState().then(res => {
        let { statu } = res
        this.defaultChecked = statu === WHITEIPING
      })
    },
    queryWhiteIp() {
      systemMgtService.queryWhiteIp().then(res => {
        this.queryParams.whiteIPArr = res
      })
    },
    resetFields() {
      this.$refs.formData.resetFields()
    }
  }
}
</script>

<style scoped lang='less'>
.add-btn-type {
  padding: 0 20px;
}

.add-btn-type[disabled]::after {
  position: absolute;
  top: -1px;
  left: -1px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background: hsla(0, 0%, 100%, .4);
  cursor: not-allowed;
  content: "";
}

.add-btn-type[disabled] {
  background: #f5f5f5;

  ::v-deep {
    color: rgba(0, 0, 0, .25);

    .anticon-plus {
      color: rgba(0, 0, 0, .85) !important;
    }
  }

}

.ant-switch {
  background-color: #999 !important;
}

.ant-switch-checked {
  background-color: #006ebc !important;
}
</style>