<template>
  <div class='add-or-edit-user'>
    <a-spin :spinning='loading'>
      <a-form-model :model='userform' :rules='rules' ref='form' :label-col='labelCol' :wrapper-col='wrapperCol'>
        <a-form-model-item label='用户姓名' prop='name'>
          <a-input placeholder='请输入用户名' v-model='deviceForm.name' />
        </a-form-model-item>
        <a-form-model-item label='登录名称' prop='sn'>
          <a-input placeholder='请输入登录名称' v-model='deviceForm.sn' />
        </a-form-model-item>
        <a-form-model-item label='用户角色' prop='sn'>
          <a-radio-group v-model='userform.authority'>
            <a-radio :value='ROLE_TYPE[3]'> 操作员</a-radio>
            <a-radio :value='ROLE_TYPE[2]'> 审计员</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label='密码设置' prop='sn'>
          <a-input v-model='userform.password' type='password' placeholder='请输入密码' />
        </a-form-model-item>
        <a-form-model-item label='确认密码' prop='sn'>
          <a-input v-model='userform.confirmPwd' type='password' placeholder='请再次输入密码' />
        </a-form-model-item>
        <a-form-model-item label='用户权限'>
          <div>
            <div :style="{ borderBottom: '1px solid #E9E9E9' }">
              <a-checkbox :indeterminate='indeterminate' :checked='checkAll' @change='onChange_checkAll'>
                全选
              </a-checkbox>
            </div>
            <br />
            <a-checkbox-group v-model='checkedList' :options='authMgt[userform.authority]' />
          </div>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import { INT_VALIDATOR, VALIDATOR_MSG } from '@/utils/validator'
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'

export default {
  name: 'AddOrEditUser',
  data() {
    return {
      labelCol: LABEL_COL,
      userform: {
        userName: '', //姓名
        loginName: undefined, //用户名
        authority: 'operator', //用户角色
        password: '',
        confirmPwd: '',//确认密码
        userAuth: []//权限
      },
      checkedList: [],
      indeterminate: true,
      checkAll: false,
      authMgt: {
        operator: [
          { label: '协议审计', value: 'protoAudit', checked: true },
          { label: '查看系统状态  ', value: 'systemState', checked: true, disabled: true },
          { label: '报表统计及下载', value: 'downReport', checked: true },
          { label: '日志查看', value: 'queryLog', checked: true, disabled: true },
          { label: '流量采集', value: 'gatherFlow', checked: true },
          { label: '日志导出', value: 'getLogData', checked: true, disabled: true },
          { label: '安全策略配置', value: 'safeStrategy', checked: true, disabled: true },
          { label: '设备配置', value: 'deviceManage', checked: true, disabled: true }
          // { label: '流量审计', value: 7, checked: true },
        ],
        auditor: [
          { label: '系统事件', value: 'systemInfo', checked: true, disabled: true },
          { label: '操作日志', value: 'operLookUp', checked: true, disabled: true }
        ]
      }
    }
  },
  methods:{
    onChange_checkAll(e) {
      console.log(e)
      this.checkedList = e.target.checked ? this.plainOptions : []
    }
  }
}
</script>

<style scoped lang='less'>

</style>