<template>
<div></div>
</template>

<script>
export default {
  name: 'DiskMaxLimit',
  props:{
    title:String,
    subTitle:String,
    confirmBtn: String
  },
  data(){
    return {}
  },
  created() {
    this.info()
  },
  methods:{
    info() {
      const h = this.$createElement;
      this.$info({
        title: this.title,
        content: h('div', {}, [
          h('p', this.subTitle),
        ]),
        okText:this.confirmBtn,
        onOk:()=>{
          this.onConfirm()
        },
        onCancel:()=>{
          this.onClose()
        }
      });
    },
  }
}
</script>

<style scoped>

</style>