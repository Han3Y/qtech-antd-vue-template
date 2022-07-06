<template>
  <div class='update-user'>
    <!--    <a-spin>-->
    <a-form-model :model='formData' :rules='rules' ref='formData' :label-col='labelCol' :wrapper-col='wrapperCol'>
      <a-form-model-item label='用户姓名' prop='userName'>
        <a-input placeholder='请输入用户名' v-model='formData.userName' />
      </a-form-model-item>
      <a-form-model-item label='登录名称' prop='loginName'>
        <span>{{ formData.loginName }}</span>
      </a-form-model-item>
      <a-form-model-item label='用户角色' prop='authority'>
        {{ ROLE_TYPE_NAME[formData.authority] }}
      </a-form-model-item>
      <a-form-model-item label='用户权限' prop='userName'>
        <div>
          <a-row>
            <a-checkbox :indeterminate='indeterminate' :checked='checkAll' @change='onChange_checkAll'>
              全选
            </a-checkbox>
          </a-row>
          <a-checkbox-group @change='onChange_checkItem' v-model='checkedList'>
            <a-row>
              <a-col :span='12' v-for='(item,index) in authMgt[formData.authority]' :key='index'>
                <a-checkbox :value='item.value' :disabled='item.disabled'>
                  {{ item.label }}
                </a-checkbox>
              </a-col>
            </a-row>
          </a-checkbox-group>
        </div>
      </a-form-model-item>
    </a-form-model>
    <!--    </a-spin>-->
  </div>
</template>

<script>
import { LABEL_COL, WRAPPER_COL } from '@/config/uiConfig'
import { INT_VALIDATOR, VALIDATOR_MSG, NAME_PATTERN, PASSWORD_PATTERN } from '@/utils/validator'
import { userMgtService, AUTH_LIST, DEFAULT_LIST, ALL_AUTH } from '@/views/userMgt/userMgtService'

const ROLE_TYPE_NAME = {
  admin: '管理员',
  operator: '操作员',
  auditor: '审计员'
}
export default {
  name: 'updateUser',
  props: {
    record: {
      type: Object,
      default: () => {
      }
    }
  },

  watch: {
    formData: {
      handler(val) {
        this.checkedList = val.userAuth.filter(item=>item.key==='1').map(item=>item.auth)
        this.checkAll = val.authority == 'admin'
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    checkAll: {
      set() {
      },
      get() {
        return this.checkedList.length == ALL_AUTH[this.formData.authority].length
      }
    },
    indeterminate() {
      return !this.checkAll
    }
  },

  data() {
    return {
      ROLE_TYPE_NAME: ROLE_TYPE_NAME,
      authMgt: AUTH_LIST,
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
      formData:this.record,
      checkedList: [],//选中的
      rules: {
        userName: [
          { required: true, message: VALIDATOR_MSG.name, trigger: 'blur', pattern: NAME_PATTERN }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    onOk() {
      let userAuth = this.checkedList.map((item) => {
        return { auth: item, key: '1' }
      })
      return this.$refs.formData.validate().then(res => {
        let params = Object.assign({}, this.formData, { action: 'modifyName', userAuth })
        return userMgtService.editUser(params).then(res => {
          let { status } = res
          if (status == 'success') {
            return true
          }
        })
      })
    },
    onChange_checkAll(e) {
      this.checkedList = e.target.checked ? ALL_AUTH[this.formData.authority] : DEFAULT_LIST[this.formData.authority]
    },
    onChange_checkItem() {
    }
  }
}
</script>

<style scoped lang='less'>

</style>