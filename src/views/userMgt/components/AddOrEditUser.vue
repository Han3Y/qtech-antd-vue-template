<template>
  <div class='add-or-edit-user'>
    <a-spin :spinning='loading'>
      <a-form-model :model='userForm' :rules='rules' ref='formData' :label-col='labelCol' :wrapper-col='wrapperCol'>
        <a-form-model-item label='用户姓名' prop='userName'>
          <a-input placeholder='请输入用户名' v-model='userForm.userName' />
        </a-form-model-item>
        <a-form-model-item label='登录名称' prop='loginName'>
          <a-input placeholder='请输入登录名称' v-model='userForm.loginName' />
        </a-form-model-item>
        <a-form-model-item label='用户角色' prop='authority'>
          <a-radio-group v-model='userForm.authority' @change='onChange_radioType'>
            <a-radio :value='ROLE_TYPE[3]'> 操作员</a-radio>
            <a-radio :value='ROLE_TYPE[2]'> 审计员</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label='密码设置' prop='password'>
          <a-input v-model='userForm.password' type='password' placeholder='请输入密码' />
        </a-form-model-item>
        <a-form-model-item label='确认密码' prop='confirmPwd'>
          <a-input v-model='userForm.confirmPwd' type='password' placeholder='请再次输入密码' />
        </a-form-model-item>
        <a-form-model-item label='用户权限' prop='authority'>
          <div>
            <a-row>
              <a-checkbox :indeterminate='indeterminate' :checked='checkAll' @change='onChange_checkAll'>
                全选
              </a-checkbox>
            </a-row>
<!--                <a-checkbox-group v-model='checkedList' :options='authMgt[userForm.authority]'-->
<!--                                  @change='onChange_checkItem' />-->

            <a-checkbox-group @change="onChange_checkItem" v-model='checkedList'>
              <a-row>
                <a-col :span='12' v-for='(item,index) in authMgt[userForm.authority]' :key='index'>
                  <a-checkbox :value="item.value" :disabled='item.disabled'>
                    {{item.label}}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>

          </div>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>
<script>
import { INT_VALIDATOR, VALIDATOR_MSG, NAME_PATTERN, PASSWORD_PATTERN } from '@/utils/validator'
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import { userMgtService, AUTH_LIST, DEFAULT_LIST, ALL_AUTH } from '@/views/userMgt/userMgtService'

const ROLE_TYPE_NAME = {
  all: '全部',
  admin: '管理员',
  operator: '操作员',
  auditor: '审计员'
}
const ROLE_TYPE = ['all', 'admin', 'auditor', 'operator']
export default {
  name: 'AddOrEditUser',
  data() {
    return {
      ROLE_TYPE: ROLE_TYPE,
      loading: false,
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
      userForm: {
        userName: '', //姓名
        loginName: '', //用户名
        authority: ROLE_TYPE[3], //用户角色
        password: '',
        confirmPwd: '',//确认密码
        userAuth: []//权限
      },
      checkedList: DEFAULT_LIST[ROLE_TYPE[3]],//默认选中的选项 string[]
      authMgt: AUTH_LIST,
      rules: {
        userName: [
          { required: true, message: VALIDATOR_MSG.name, trigger: 'blur', pattern: NAME_PATTERN }
        ],
        loginName: [
          { required: true, message: VALIDATOR_MSG.name, trigger: 'blur', pattern: NAME_PATTERN }
        ],
        authority: [
          {
            required: true, message: VALIDATOR_MSG.requiredSelect, trigger: 'change'
          }
        ],
        password: [
          { required: true, message: VALIDATOR_MSG.password_red, trigger: 'blur', pattern: PASSWORD_PATTERN }
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
        userAuth: [
          { required: true, message: VALIDATOR_MSG.required, trigger: 'blur' },
          { validator: INT_VALIDATOR }
        ]
      }
    }
  },
  mounted() {

  },
  computed: {
    checkAll() {
      return this.checkedList.length == ALL_AUTH[this.userForm.authority].length
    },
    indeterminate() {
      return !this.checkAll
    }

  },
  methods: {
    onOk() {
      let userAuth = this.checkedList.map((item) => {
        return { auth: item, key: '1' }
      })
      return this.$refs.formData.validate().then(res => {
        let params = Object.assign({}, this.userForm, { action: 'register', userAuth })
        return userMgtService.addUser(params).then(res => {
          let { status } = res
          if (status == 'success') {
            return true
          }
        }).catch(err => {
          return false
        })
      }).catch(err => {
      })
    },
    onChange_radioType(e) {
      this.checkedList = DEFAULT_LIST[this.userForm.authority]
    },

    onChange_checkItem(checkedValues) {
    },
    onChange_checkAll(e) {
      this.checkedList = e.target.checked ? ALL_AUTH[this.userForm.authority] : DEFAULT_LIST[this.userForm.authority]
    }
  }
}
</script>

<style scoped lang='less'>

</style>