<template>
  <div class='modal-form-box'>
    <a-spin :spinning='loading'>
      <a-form-model :model='form' :rules='rules' ref='form' :label-col='labelCol' :wrapper-col='wrapperCol'>
        <a-form-model-item label='登录名称' v-if='UPDATE_PWD_TYPE.UPDATE_PWD===type'>
          {{ userInfo.loginName }}
        </a-form-model-item>
        <a-form-model-item label='用户姓名'>
          {{ userInfo.userName }}
        </a-form-model-item>
        <a-form-model-item label='旧密码' prop='oldPassword' v-if='UPDATE_PWD_TYPE.SET_PWD===type'>
          <a-input type='password' placeholder='请输入旧密码' v-model='form.oldPassword' />
        </a-form-model-item>
        <a-form-model-item label='新密码' prop='newPassword'>
          <a-input type='password' placeholder='请输入新密码' v-model='form.newPassword' />
        </a-form-model-item>
        <a-form-model-item label='确认密码' prop='rePassword'>
          <a-input type='password' placeholder='请输入确认密码' v-model='form.rePassword' />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import md5 from 'md5'
import { PASSWORD_PATTERN, VALIDATOR_MSG } from '@/utils/validator'
import qs from 'qs'
import { UPDATE_PWD_TYPE } from '@/config/common'
import { changePwdService } from '@/components/ChangePassword/changePwdService'

export default {
  name: 'ChangePassword',
  props: {
    type: String,
    userInfo: {
      type: Object,
      default: null
    }
  },
  data: function() {
    return {
      UPDATE_PWD_TYPE: UPDATE_PWD_TYPE,
      loading: false,
      form: {
        oldPassword: '',
        newPassword: '',
        rePassword: ''
      },
      rules: {
        oldPassword: [
          { required: true, message: VALIDATOR_MSG.required, trigger: 'change' }
        ],
        newPassword: [
          { required: true, message: VALIDATOR_MSG.required, trigger: 'change' },
          { pattern: PASSWORD_PATTERN, message: VALIDATOR_MSG.password, trigger: 'change' }
        ],
        rePassword: [
          { required: true, message: VALIDATOR_MSG.required, trigger: 'change' },
          { validator: this.validateConfirmPass }
        ]
      },
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL
    }
  },
  methods: {
    onOk() {
      /**
       * 点击确认时校验
       */
      if (this.type === UPDATE_PWD_TYPE.UPDATE_PWD) {//用户修改密码
        return this.handleSubmit()
      } else {
        //  账号设置密码
        return this.setPwd()
      }
    },
    onCancel() {
      /**
       * 点击取消时的操作
       */
      return new Promise(resolve => {
        resolve(true)
      })
    },
    /**
     * 提交
     */
    handleSubmit() {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
            return false
          }
        })
      }).then(() => {
        const data = {
          action: 'superModifyPassword',
          userName: this.userInfo.userName,
          loginName: this.userInfo.loginName,
          password: md5(this.form.newPassword)
        }
        return changePwdService.updatePwd(data)
      })
    },
    setPwd() {
      this.loading = true
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
            return false
          }
        })
      }).then(() => {
        const data = {
          action: 'modifyPassword',
          userName: this.userInfo.userName,
          loginName: this.userInfo.loginName,
          oldPassword: md5(this.form.oldPassword),
          password: md5(this.form.newPassword)
        }
        return changePwdService.setPwd(data)
      })
    },
    /**
     * 校验确认密码
     * @param rule
     * @param value
     * @param callback
     */
    validateConfirmPass(rule, value, callback) {
      if (value !== this.form.newPassword) {
        callback(new Error(VALIDATOR_MSG.same_password))
      }
      callback()
    }
  }
}
</script>

<style scoped lang='less'>

</style>