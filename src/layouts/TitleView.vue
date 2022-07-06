<template>
  <div>
    <title-tabs/>
    <router-view />
  </div>
</template>

<script>
import TitleTabs from '@/layouts/TitleTabs'

export default {
  name: 'TitleView',
  components:{
    TitleTabs
  }
}
</script>

<style scoped>

</style>