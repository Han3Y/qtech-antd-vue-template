<template>
  <div class='add-or-edit-user'>
    <a-spin :spinning='loading'>
      <a-form-model :model='userForm' :rules='rules' ref='formData' :label-col='labelCol' :wrapper-col='wrapperCol'>
        <a-form-model-item label='登录名称' prop='loginName'>
          <a-input :disabled="isEdit" placeholder='请输入登录名称' v-model='userForm.loginName' />
        </a-form-model-item>
        <a-form-model-item label='用户姓名' prop='userName'>
          <a-input  placeholder='请输入用户名' v-model='userForm.userName' />
        </a-form-model-item>
        <a-form-model-item label='用户角色' prop='authority'>
          <a-radio-group v-model='userForm.role' :disabled="isEdit">
            <a-radio :value='ROLE_TYPE.operator'> 操作员</a-radio>
            <a-radio :value='ROLE_TYPE.auditor'> 审计员</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label='密码设置' prop='password' v-if="!isEdit">
          <a-input v-model='userForm.password' type='password' placeholder='请输入密码' />
        </a-form-model-item>
        <a-form-model-item label='确认密码' prop='confirmPwd' v-if="!isEdit">
          <a-input v-model='userForm.confirmPwd' type='password' placeholder='请再次输入密码' />
        </a-form-model-item>
        <a-form-model-item label='手机号' prop='phone'>
          <a-input placeholder='请输入手机号' v-model='userForm.phone' />
        </a-form-model-item>
        <a-form-model-item label='电子邮箱' prop='email'>
          <a-input placeholder='请输入电子邮箱' v-model='userForm.email' />
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import {INT_VALIDATOR, VALIDATOR_MSG, NAME_PATTERN, PASSWORD_PATTERN, PHONE_PATTERN} from '@/utils/validator'
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import { userMgtService, AUTH_LIST, DEFAULT_LIST, ALL_AUTH } from '@/views/userMgt/userMgtService'
import {roleValueMap} from "@/config/roles";
import md5 from "md5";
import {PWD_SALT} from "@/config/common";

export default {
  name: 'AddOrEditUser',
  props: {
    record: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      ROLE_TYPE: roleValueMap,
      loading: false,
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
      userForm: {
        id: '',
        userName: '', //姓名
        loginName: '', //用户名
        role: roleValueMap.operator, //用户角色
        password: '',
        confirmPwd: '',//确认密码
        phone: '',
        email: '',
        bh: ('1' + Math.random()).replace('.', '')
      },
      authMgt: AUTH_LIST,
      rules: {
        userName: [
          { required: true, message: VALIDATOR_MSG.name, trigger: 'blur', pattern: NAME_PATTERN }
        ],
        loginName: [
          { required: true, message: VALIDATOR_MSG.name, trigger: 'blur', pattern: NAME_PATTERN }
        ],
        role: [
          {
            required: true, message: VALIDATOR_MSG.requiredSelect, trigger: 'change'
          }
        ],
        password: [
          { required: true, message: VALIDATOR_MSG.password_red, trigger: 'blur', pattern: PASSWORD_PATTERN }
        ],
        phone: [
          {  message: VALIDATOR_MSG.phone, trigger: 'blur', pattern: PHONE_PATTERN }
        ],
        confirmPwd: [
          {
            required: true,
            message: VALIDATOR_MSG.same_password,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                callback(false)
              }
              if (this.userForm.confirmPwd == this.userForm.password) {
                callback()
              } else {
                callback(false)
              }
            }
          }
        ],
      }
    }
  },
  computed: {
    isEdit(){
      return !!this.$props.record?.id;
    }
  },
  methods: {
    onOk() {
      return this.$refs.formData.validate().then(res => {
        if(!this.isEdit){
          let params = Object.assign({}, this.userForm)
          params.roles = [params.role];
          params.password = md5( PWD_SALT + md5(this.userForm.password));
          delete  params.role;
          delete  params.confirmPwd;
          return userMgtService.addUser(params).then(res => {
            return true;
          }).catch(err => {
            return false
          })
        }else{
          let params = Object.assign({}, this.userForm)
          params.roles = [params.role];
          return userMgtService.editUser(params).then(res => {
            return true;
          }).catch(err => {
            return false
          })
        }
      }).catch(err => {
      })
    },
  },
  created() {
    if(this.$props.record?.id){
      this.userForm.id = this.record.id;
      this.userForm.userName = this.record.userName;
      this.userForm.loginName = this.record.loginName;
      this.userForm.phone = this.record.phone;
      this.userForm.email = this.record.email;
      this.userForm.role = this.record.roles[0];
    }
  }
}
</script>

<style scoped lang='less'>

</style>