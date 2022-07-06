<template>
  <div>
    <div class='pageTitle' style='background-color: #fff' v-if='showTitle'>
      <!-- 双页面tabs -->
      <div v-if='showTabs'>
        <a-tabs :default-active-key='activeKey' @change='callback'>
          <template v-for='item in tabs'>
            <a-tab-pane :key='item.path' :tab='item.name'>
            </a-tab-pane>
          </template>
        </a-tabs>
      </div>
      <!-- 单页面tab -->
      <div v-else class='tw-flex tw-justify-between'>
        <span>{{ title }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import {MoreTab, NO_TITLE_PAGES} from './tabs'

export default {
  data() {
    return {
      title: '',//页头名称--从路由获取
      tabs: [],//双页面中所需要的渲染的页面数组
      activeKey: '',//双页面tabs默认被选项的key
      showTabs: false,//双页面为---true,单页面为---false
    }
  },
  computed: {
    // 是否展示title
    showTitle(){
      return !NO_TITLE_PAGES.includes(this.$route.path)
    }
  },
  watch: {
    $route(to, from) {
      this.getTitle()
      this.getTabChild()
      this.activeKey = this.$route.path
    }
  },
  mounted() {
    this.getTitle()
    this.getTabChild()
    this.activeKey = this.$route.path//设置当前双页面tabs默认选项
  },
  methods: {
    getTitle() {
      this.title = this.$route.meta.title
    },
    callback(key) {
      this.$router.push(key)
    },
    getTabChild() {
      for (let index = 0; index < MoreTab.length; index++) {
        const x = MoreTab[index]
        if (x.titlePath.indexOf(this.$route.path) != -1) {//查找当前路径是否在tabs.js中配置双页面
          this.tabs = x.child //tabs-item
          this.showTabs = true //显示双页面tabs
          break
        } else {
          this.tabs = []//没有tabs-item
          this.showTabs = false//显示单页面tab
        }
      }
    }
  }
}
</script>
<style lang='less'>
.pageTitle {
  min-height: 56px;
  padding: 0 24px;
  color: rgba(0, 0, 0, 0.85);
  font-weight: 500;
  font-size: 18px;
  background: transparent;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
  line-height: 56px;

  .ant-tabs-bar {
    margin-bottom: 0px;
    height: 56px;
    border-bottom: none;
  }

  .ant-tabs-nav .ant-tabs-tab {
    padding: 15.5px 16px;
    font-size: 18px;
    font-weight: 400;
  }
}
</style>