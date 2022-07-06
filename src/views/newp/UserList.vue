<template>
  <div class='user-manage'>
    <!--    <h3 class="tab-title">帐号管理</h3>-->
    <a-card :bordered='false'>
      <div class='table-page-search-wrapper'>
        <a-form-model layout='inline' ref='searchFormRef' :model='searchForm'>
          <a-row :gutter='48'>
            <a-col :md='6' :sm='24'>
              <a-form-model-item prop='userName' label='用户姓名'>
                <a-input v-model='searchForm.userName' placeholder='请输入用户姓名' />
              </a-form-model-item>
            </a-col>
            <a-col :md='6' :sm='24'>
              <a-form-model-item prop='loginName' label='登录名称'>
                <a-input v-model='searchForm.loginName' placeholder='请输入登录名称' />
              </a-form-model-item>
            </a-col>
            <a-col :md='6' :sm='24'>
              <a-form-model-item prop='authority' label='用户角色'>
                <a-select v-model='searchForm.authority' @change='onChange_changeRole'>
                  <a-select-option v-for='item in roleType'
                                   :key='item.value'>
                    {{ item.label }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :md='6' :sm='24'>
              <span class='table-page-search-submitButtons'>
                <a-button type='primary' icon='search' @click='search'></a-button>
                <a-button style='margin-left: 8px' icon='retweet' @click='resetForm'></a-button>
              </span>
            </a-col>
          </a-row>
        </a-form-model>
      </div>
      <div class='table-operator'>
        <a-button type='primary' @click='showModal'>新增</a-button>
      </div>
      <a-table :columns='columns' :data-source='userlist' rowKey='loginTime'>
        <span slot='roles' slot-scope='item'>{{ ROLE_TYPE_NAME[item] }}</span>
        <span slot='action' slot-scope='text, record'>
          <a @click="handleEdit(record, '编辑用户')">编辑</a>
          <!-- {{ record.userName }} -->
          <a-divider type='vertical' />
          <a @click="handleEdit(record, '修改密码')">修改密码</a>
          <a-divider type='vertical' />
          <a @click='showDeleteConfirm(record)'>删除</a>
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
const STATUS = {
  1: '启用',
  2: '禁用'
}
const ROLE_TYPE_NAME = {
  all: '全部',
  admin: '管理员',
  operator: '操作员',
  auditor: '审计员'
}
const ROLE_TYPE = ['all', 'admin', 'auditor', 'operator']
const columns = [
  {
    title: '用户姓名',
    dataIndex: 'userName',
    key: 'userName',
    align: 'center'
  },
  {
    title: '登录名称',
    dataIndex: 'loginName',
    key: 'loginName',
    align: 'center'
  },
  {
    title: '用户角色',
    dataIndex: 'authority',
    key: 'authority',
    align: 'center',
    scopedSlots: { customRender: 'roles' }
  },
  {
    title: '上次登录时间',
    dataIndex: 'loginTime',
    key: 'loginTime',
    align: 'center'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    align: 'center'
  }
]
const ADD_OR_EDIT = {
  ADD: 'add',//新增
  EDIT: 'edit'//编辑
}
const ADD_RO_EDIT_NAME = '新增'

export default {
  name: 'TableList',
  components: {
    STable
  },
  data() {
    return {
      ROLE_TYPE_NAME: ROLE_TYPE_NAME,
      ROLE_TYPE: ROLE_TYPE,
      roleType: ROLE_TYPE.map(item => {
        return { label: ROLE_TYPE_NAME[item], value: item }
      }),//用户角色

      pageNo: 1,
      pageSize: 10,
      pwdformVisible: false,
      form: this.$form.createForm(this),
      permissions: [],
      // 查询参数
      queryParam: {},
      // 表头
      columns,
      userlist: [],
      expandedRowKeys: [],
      selectedRowKeys: [],
      selectedRows: [],
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      currentAction: ADD_RO_EDIT_NAME, //新增，编辑用户，// 修改密码
      currentUser: {},
      searchForm: {
        userName: '', //姓名
        loginName: '', //用户名
        authority: ROLE_TYPE_NAME[ROLE_TYPE[0]]
      }
    }
  },
  created() {
    this.getUserList()
  },
  methods: {
    resetForm() {
      this.$refs.searchFormRef.resetFields()
    },
    search() {
      this.userlist = []
      this.getUserList(this.searchForm)
    },
    getUserList() {
      let params = {
        pi: this.pageNo,
        ps: this.pageSize,
        userName: this.searchForm.userName,
        loginName: this.searchForm.loginName,
        authority: this.searchForm.authority === 'all' ? '' : this.authority,
        action: 'queryUser'
      }
      this.$http.get('person.cgi', params).then((res) => {
        let { total, items } = res
        this.userlist = items
      })
      // this.$http.get('user/list', params).then((res) => {
      //   this.userlist = res
      // })
    },
    onChange_changeRole() {
    },
    handleEdit(record, action) {

    },
    showModal() {
    },
    showDeleteConfirm(record) {
      var _this = this
      this.$confirm({
        title: '提示',
        content: '确定删除该用户：' + record.userName + '?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          _this.toDelete(record.id)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    toDelete(id) {
      this.$http
        .del('user/destory', {
          ids: [id]
        })
        .then((res) => {
          if (res && res.result) {
            // this.clearFormState("currentUser");
            this.$notification.success({
              message: '成功',
              description: '账户删除成功'
            })
            this.getUserList()
          }
        })
    }

  }

}
</script>

<style lang='less' scoped>
.user-manage {
  background: #fff;

  .tab-title {
    padding: 24px;
    height: 56px;
    line-height: 56px;
    font-size: 20px;
    color: #333;
  }
}
</style>
