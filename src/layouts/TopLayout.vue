<template>
<a-layout :style='{height: "100vh"}'>
  <a-layout-header :style="{ position: 'fixed', zIndex: 1,padding: '0 0 0 24px', width: '100%', display: 'flex', justifyContent: 'space-between' }">
    <HeadLogo/>
    <SystemTime/>
    <right-content :top-menu="false" :is-mobile='false' :theme='settings.theme' style='margin:0; float: none' />
  </a-layout-header>
  <a-layout-content :style='contentStyle'>
    <HeadBreadcrumb/>
    <router-view />
  </a-layout-content>
</a-layout>
</template>

<script>
import defaultSettings from '@/config/defaultSettings'
import { mapState } from 'vuex'
import SystemTime from '@/components/SystemTime/SystemTime'
import RightContent from '@/components/GlobalHeader/RightContent'
import HeadLogo from '@/components/HeadLogo/HeadLogo'
import HeadBreadcrumb from '@/components/HeadBreadcrumb/HeadBreadcrumb'

export default {
  name: 'TopLayout',
  components :{
    HeadLogo,
    SystemTime,
    RightContent,
    HeadBreadcrumb
  },
  data(){
    return {
      settings: {
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,
        siderWidth: defaultSettings.Width,//配置sider宽度
        hideHintAlert: false,
        hideCopyButton: false
      },
      contentStyle: {
        padding: '16px',
        marginTop: '56px'
      }
    }
  },
}
</script>

<style scoped>

</style>