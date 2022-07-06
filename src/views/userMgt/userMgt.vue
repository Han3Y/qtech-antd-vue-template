<template>
  <!--  管理员-用户管理-->
  <div class='device-manage'>
    <a-card :bordered='false'>
      <div class='table-page-search-wrapper'>
        <a-form layout='inline'>
          <a-row :gutter='48'>
            <a-col :md='md' :sm='24'>
              <a-form-item label='用户姓名'>
                <a-input v-model='queryParam.userName' placeholder='请输入用户姓名' />
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24'>
              <a-form-item label='登录名称'>
                <a-input v-model='queryParam.loginName' placeholder='请输入登录名称' />
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24'>

              <a-form-item label='用户角色'>
                <SelectCom :selectValue.sync='queryParam.authority' :selectTypeArr='ROLE_TYPE_NAME'
                           :selectType='ROLE_TYPE'></SelectCom>
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24'>
              <span class='table-page-search-submitButtons'>
                <a-button @click='$refs.table.refresh(true)' type='primary'>
                  <span class='font_family'>&#xe625;</span>
                </a-button>
                <a-button
                  style='margin-left: 8px'
                  @click='
                    () => {
                      this.queryParam = {
                          authority: ROLE_TYPE[0]
                      }
                      $refs.table.refresh(true)
                    }
                  '
                >
                  <span class='font_family'>&#xe632;</span>
                </a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class='table-operator'>
        <a-button type='primary' @click='add'>新增</a-button>
      </div>
      <s-table
        ref='table'
        rowKey='loginName'
        :columns='columns'
        :data='getUserList'
        :showPagination='true'
        :pagination='PAGINATION'
      >
        <template slot='authority' slot-scope='scope'>
          {{ROLE_TYPE_NAME[scope.authority]}}
        </template>
        <span slot='time' slot-scope='loginTime'>
          {{ loginTime ? loginTime : '--' }}
        </span>
        <span slot='action' slot-scope='record'>
          <a @click='onClick_editUser(record)'>修改用户</a>
          <a-divider type='vertical' />
          <a @click='onClick_updatePwd(record)'>修改密码</a>
          <a-divider type='vertical' />
          <a-popconfirm placement='top' title='确认删除吗？' ok-text='取消' cancel-text='确定'
                        @confirm='()=>{onClick_confirmDel(record)}'>
            <a>删除</a>
          </a-popconfirm>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import UpdateUser from '@/views/userMgt/components/UpdateUser'
import AddOrEditUser from '@/views/userMgt/components/AddOrEditUser'
import {MODAL_SIZE, PAGINATION} from '@/config/uiConfig'
import { userMgtService,ROLE_TYPE_NAME,ROLE_TYPE,columns } from '@/views/userMgt/userMgtService'
import ChangePassword from '@/components/ChangePassword/ChangePassword'
import { UPDATE_PWD_TYPE } from '@/config/common'
import SelectCom from '@/components/CommonFilter/SelectCom'

export default {
  name: 'TableList',
  components: {
    STable,
    SelectCom
  },
  data() {
    return {
      ROLE_TYPE_NAME: ROLE_TYPE_NAME,
      ROLE_TYPE: ROLE_TYPE,
      PAGINATION: PAGINATION,
      //一行三个md为8;一行三个md为6
      md: 6,
      // 查询参数
      queryParam: {
        userName: '', //姓名
        loginName: '', //用户名
        authority: ROLE_TYPE[0]
      },
      // 表头
      columns,
      expandedRowKeys: [],
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  created() {
  },
  methods: {
    onClick_confirmDel(record) {
      let { loginName } = record
      let params = {
        action: 'deleteUser',
        loginName
      }
      userMgtService.delUser(params).then(res => {
        let { status } = res
        console.log(res)
        if (status == 'success') {
          // this.$notification.success({
          //   message: '成功',
          //   description: '删除成功'
          // })
          this.$message.success({
            content: '删除成功',
            duration: 2
          })
          this.$refs.table.refresh(true)
        }
      })
    },
    getUserList(parameter) {
      let params = {
        userName: this.queryParam.userName,
        loginName: this.queryParam.loginName,
        authority: this.queryParam.authority === 'all' ? '' : this.queryParam.authority,
        action: 'queryUser'
      }
      const requestParameters = Object.assign({}, parameter, params)
      return userMgtService.getUserList(requestParameters)
    },

    /**
     * 新增
     */
    add() {
      this.$dialog(
        AddOrEditUser,
        {
          on: {
            ok: () => {
              this.$message.success({
                content: '新增成功',
                duration: 2
              })
              this.$refs.table.refresh(true)
            },
            cancel() {
            },
            close() {
            }
          }
        },
        // modal props
        {
          title: '新增',
          width: MODAL_SIZE.MIDDLE,
          centered: true,
          maskClosable: false,
          okText: '确认',
          cancelText: '取消'
        }
      )
    },
    /**
     *  编辑
     */
    onClick_editUser(record) {
      this.$dialog(
        UpdateUser,
        {
          record: Object.assign({}, record),
          ok: () => {
            this.$message.success({
              content: '编辑成功',
              duration: 2
            })
            this.$refs.table.refresh(true)
          }
        },
        {
          title: '编辑',
          width: MODAL_SIZE.MIDDLE,
          centered: true,
          maskClosable: false,
          okText: '保存',
          cancelText: '关闭'
        }
      )
    },

    /**
     * 修改密码
     * */
    onClick_updatePwd(record) {
      this.$dialog(
        ChangePassword,
        {
          type: UPDATE_PWD_TYPE.UPDATE_PWD,
          userInfo: record,
          on: {
            ok: () => {
              this.$message.success({
                content: '修改成功',
                duration: 2
              })
              this.$refs.table.refresh(true)
            },
            cancel() {
            },
            close() {
            }
          }
        },
        {
          title: '修改密码',
          width: MODAL_SIZE.MIDDLE,
          centered: true,
          maskClosable: false,
          okText: '确定',
          cancelText: '取消'
        }
      )
    }
  }

}
</script>

<style lang='less' scoped>
</style>
