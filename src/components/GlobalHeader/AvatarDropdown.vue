<template>
  <a-dropdown v-if='currentUser && currentUser.name' placement='bottomRight'>
   <span class='ant-pro-account-avatar' style='color:#fff'>
      <!-- <a-avatar icon="user" size="large" class="antd-pro-global-header-index-avatar"/> -->
      <span class='font_family' style='font-size: 20px'>&#xe62c;</span>
      <span> &nbsp;{{ currentUser.name }}</span>
    </span>
    <template v-slot:overlay>
      <a-menu class='ant-pro-drop-down menu' :selected-keys='[]'>
        <!--        <a-menu-item v-if="menu" key="center" @click="handleToCenter">-->
        <!--          <a-icon type="user"/>-->
        <!--          {{ $t('menu.account.center') }}-->
        <!--        </a-menu-item>-->
        <a-menu-item v-if='menu' key='settings' @click='handleToSettings'>
          <!--          <a-icon type='setting' />-->
          <a-icon type='lock' />
          密码设置
        </a-menu-item>
        <a-menu-divider v-if='menu' />
        <a-menu-item key='logout' @click='handleLogout'>
          <a-icon type='logout' />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size='small' :style='{ marginLeft: 8, marginRight: 8 }' />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'
import DeviceEdit from '@/views/demo/components/DemoEditModal'
import ChangePassword from '@/components/ChangePassword/ChangePassword'
import { MODAL_SIZE } from '@/config/uiConfig'
import { UPDATE_PWD_TYPE } from '@/config/common'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter() {
      this.$router.push({ path: '/account/center' })
    },
    handleToSettings() {
      this.$dialog(
        ChangePassword,
        {
          type: UPDATE_PWD_TYPE.SET_PWD,
          userInfo: this.$store.getters.userInfo,
          on: {
            ok: () => {
              this.$message.success({
                content: '设置成功',
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
          title: '密码设置',
          width: MODAL_SIZE.MIDDLE,
          centered: true,
          maskClosable: false,
          okText: '确定',
          cancelText: '关闭'
        }
      )
    },
    handleLogout(e) {
      this.$mConfirm({
        title: '提示',
        content: '即将退出登录，您是否确认操作?',
        okText: '确定',
        cancelText: '取消'
      }).then(res => {
        this.$store.dispatch('Logout').then(() => {
          this.$router.push({ name: 'login' })
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }

  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
