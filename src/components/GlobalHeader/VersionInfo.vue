<template>
  <a-dropdown placement='bottomRight'>
   <span class='ant-pro-account-avatar' style='color:#fff'>
      <span class='font_family' style='font-size: 20px'>&#xe629;</span>
    </span>
    <template v-slot:overlay>
      <a-menu class='ant-pro-drop-down menu' :selected-keys='[]'>
        <a-menu-item @click='onClick_versionInfo'>
          <a-icon type='copyright' />
          版本信息
        </a-menu-item>
        <a-menu-item @click='onClick_restartSystem' v-if='roles.id==="operator"'>
          <a-icon type='exclamation-circle' />
          系统重启
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>

</template>

<script>
import { Modal } from 'ant-design-vue'
import ChangePassword from '@/components/ChangePassword/ChangePassword'
import { MODAL_SIZE } from '@/config/uiConfig'
import { UPDATE_PWD_TYPE } from '@/config/common'
import VersionInfo from '@/components/VersionInfo/VersionInfo'
import { mapGetters } from 'vuex'
import { commonServiceApi } from '@/api/common'
import { LOGIN_PATH } from '@/config/router.config'
import StorageUtil, { StorageKey } from '@/utils/storage'

export default {
  name: 'VersionINFO',
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
  computed: {
    ...mapGetters(['roles', 'avatar'])
  },
  methods: {
    onClick_restartSystem() {
      //  重启系统
      this.$mConfirm({
        title: '提示',
        content: '将重启系统，您是否确认操作？',
        okText: '确定',
        cancelText: '取消'
      }).then(res => {
        this.$loading.show()
        commonServiceApi.reboot().then(res => {
          StorageUtil.removeKey(StorageKey.USER)
          StorageUtil.removeKey(StorageKey.TOKEN)
          this.$loading.hide()
          this.$router.replace(LOGIN_PATH)
        })
      }).catch(err => {
        this.$loading.hide()
      })
    },
    onClick_versionInfo() {
      this.$dialog(
        VersionInfo,
        {},
        // modal props
        {
          title: '版本信息',
          width: MODAL_SIZE.VERSION,
          centered: true,
          maskClosable: false,
          okText: '确认',
          cancelText: '取消',
          footer: ''
        }
      )
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
