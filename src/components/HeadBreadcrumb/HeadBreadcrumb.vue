<template>
  <a-breadcrumb separator=">" style='margin-bottom: 16px'>
    <a-breadcrumb-item v-for='item in breadcrumbs' :key='item.path'>
      <router-link :to='item.path'>
        {{item.name}}
      </router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
import { breadcrumbs } from '@/config/router.config'

export default {
  name: 'HeadBreadcrumb',
  data(){
    return {
      breadcrumbs: [],
      allMenus: [ ...breadcrumbs]
    }
  },
  methods: {
    // 获取指定页面在菜单结构中的路径
    getBreadcrumbs(path){
      function searchItem(item, p){
        if(item == null){
          return ;
        }
        p.push({
          path: item.path,
          name: item.name
        });
        if(item.path === path){
          return true;
        }else if(item.children){
          for(let pathItem of item.children){
            if(searchItem(pathItem, p)){
              return true;
            }
          }
          p.pop();
        }else{
          p.pop();
        }
      }
      let p = [];
      for(let pathItem of this.allMenus){
        if(searchItem(pathItem, p)){
          break;
        }
      }
      // 过滤没有名称的，表示不需要在菜单路径中展示
      return p.filter(i => i.name);
    }
  },
  watch: {
    $route(value){
      this.breadcrumbs = this.getBreadcrumbs(value.path);
    }
  },
  created() {
    this.breadcrumbs = this.getBreadcrumbs(this.$route.path);
  }
}
</script>

<style scoped>

</style>