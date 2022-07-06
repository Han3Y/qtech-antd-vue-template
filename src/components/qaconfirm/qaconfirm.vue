<template>
<!-- 简单操作弹框提示 -->
  <div class='mack'>
    <div class='tipbox'>
      <div class='title font_b'>{{ title.trim() }}</div>
      <div class='mesg font_s'>
        <p class='icon'><span class='font_family'>&#xe63f;</span></p>
        <span>{{ content.trim() }}</span>
      </div>
      <div class='footb tipbtn'>
        <a-button type='primary' style='min-width:88px' @click='confirm'>{{ okText }}</a-button>
        <a-button style='margin-left: 32px;min-width:88px' @click='cancel' v-if='showCancel'>{{ cancelText }}</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: ''
    },
    cancelText: {
      type: String,
      default: ''
    },
    showCancel: {
      type: Boolean,
      default: true
    },
  },
  methods: {
    cancel() {
      this.$onRemove();
    },
    confirm() {
      this.$onConfirm();
    }
  }
}
</script>

//css
<style scoped lang='less'>
.mack {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  background: rgba(21, 21, 21, 0.5);
  z-index: 10;

  .font_b {
    color: #231a2f;
  }

  .font_s {
    padding: 0 12px;
    min-height: 136px;
    text-align: center;
    color: #333;
    font-size: 16px;

    .icon {
      color: #faaf29;
      margin-bottom: 15px;

      .font_family {
        font-size: 64px;
      }
    }
  }

  .tipbtn {
    text-align: center;
    padding: 24px
  }

  .tipbox {
    background: #ffffff;
    border-radius: 2px;
    width: 420px;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .title {
      padding: 12px 16px 12px 24px;
      background: #1e2c3d;
      color: #fff;
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      margin-bottom: 16px;
    }

    .footb {
      width: 100%;
    }
  }
}
</style>