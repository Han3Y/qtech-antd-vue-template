<template>
  <div style='display: flex;align-items: center'>
    <img src='/static/logo/head_logo.png' style='max-height: 48px'>
    <h1 class='head-title'>{{ app.name }}</h1>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HeadLogo',
  computed: {
    ...mapState({
      app: state => state.app
    })
  },
}
</script>

<style scoped lang='less'>
  .head-title{
    display: inline-block;
    margin: 0;
    padding-left: 8px;
    font-weight: 400;
    font-size: 20px;
    color: #fff;
  }
</style>