<template>
  <div :class="wrpCls">
    <VersionInfo :menu="showMenu" :class="prefixCls"></VersionInfo>
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
<!--    <select-lang :class="prefixCls" />-->
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'
import VersionInfo from '@/components/GlobalHeader/VersionInfo'
// import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    VersionInfo
    // SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: { name: this.$store.getters.userInfo.userName }
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    },
  },
}
</script>
