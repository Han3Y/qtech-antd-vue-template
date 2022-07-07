<template>
  <div class='container'>
    <div class='wrap'>
      <img class='logo-login' src='/static/logo/login_logo.png' />
      <div class='login-product'>{{ app.name }}</div>
      <a-form class='login-form' @submit='onSubmit' :form='form' ref='tests'>
        <a-form-item>
          <a-input-group :class='activedUser?"active-input-grounp":""'>
            <a-icon type='user' />
            <a-input
              autocomplete='autocomplete'
              size='large'
              placeholder='请输入登录名'
              @focus='()=>{this.activedUser=!this.activedUser}'
              @blur='()=>{this.activedUser=!this.activedUser}'
              v-decorator="['name', {rules: [{ required: true, message: '请输入登录名', whitespace: true}]}]"
            >
            </a-input>
          </a-input-group>
        </a-form-item>
        <a-form-item>
          <a-input-group :class='activedPwd?"active-input-grounp":""'>
            <a-icon type='lock' />
            <a-input
              @focus='()=>{this.activedPwd=!this.activedPwd}'
              @blur='()=>{this.activedPwd=!this.activedPwd}'
              placeholder='请输入密码'
              autocomplete='autocomplete'
              :type='inputType'
              v-decorator="['password', {rules: [{ required: true, message: '请输入密码', whitespace: true}]}]"
            >
              <template slot='suffix'>
                <div v-if='inputType===INPUT_TYPE_PASSWORD' class='pwd-eye pwd-eye-close'
                     @click='()=>{this.inputType=INPUT_TYPE_TEXT}'></div>
                <div v-else class='pwd-eye pwd-eye-open' @click='()=>{this.inputType=INPUT_TYPE_PASSWORD}'></div>
              </template>
            </a-input>
          </a-input-group>
        </a-form-item>
        <a-form-item>
          <a-button :loading='logging' style='width: 100%;margin-top: 16px' size='large' htmlType='submit'
                    type='primary'>登录
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import md5 from 'md5'
import { timeFix } from '@/utils/util'
import { mapActions, mapMutations, mapState } from 'vuex'
import router from '@/router'
import store from '@/store'
import { PWD_SALT } from '@/config/common'

const INPUT_TYPE_PASSWORD = 'password'
const INPUT_TYPE_TEXT = 'text'


export default {
  name: 'Login',
  data() {
    return {
      INPUT_TYPE_PASSWORD,
      INPUT_TYPE_TEXT,
      logging: false,
      error: '',
      systemName: '',
      form: this.$form.createForm(this),
      activedUser: false,//激活用户icon
      activedPwd: false,//是否激活密码icon
      inputType: INPUT_TYPE_PASSWORD
    }
  },
  created() {
  },
  computed: {
    ...mapState(['app'])
  },
  methods: {
    ...mapActions(['Login', 'GenerateRoutes', 'SyncInfo']),
    ...mapMutations(['SET_NAME', 'SET_ROLES', 'SET_INFO']),
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err) => {
        if (!err) {
          this.logging = true
          const userName = this.form.getFieldValue('name')
          const password = md5( PWD_SALT + md5(this.form.getFieldValue('password')))
          this.Login({ userName, password }).then(this.afterLogin).finally(() => this.logging = false)
        }
      })
    },
    /* async afterLogin(res) {

        console.log('afterLogin');


              // 等待同步完路由信息
              this.$nextTick(() => {
                this.$router.push('/')
              })
              // 延迟 1 秒显示欢迎信息
              setTimeout(() => {
                this.$notification.success({
                  message: '欢迎',
                  description: `${timeFix()}，欢迎回来`,
                })
              }, 500)

          }, */
    async afterLogin(res) {
      const loginRes = res
      console.log(res, '登录数据--======')
      if (loginRes) {
        const translatedInfo = await this.SyncInfo(loginRes)
        console.log(translatedInfo, '转换的信息')
        this.GenerateRoutes(translatedInfo.data).then(value => {
          store.getters.addRouters.forEach(r => {
            router.addRoute(r)
          })
          // 等待同步完路由信息
          this.$nextTick(() => {
            // this.$router.push('/admin')
            let rouePath = store.getters.addRouters[0].children[0].path//临时用
            this.$router.push(`${rouePath}`)
          })
          // 延迟 1 秒显示欢迎信息
          setTimeout(() => {
            this.$notification.success({
              message: '欢迎',
              description: `${timeFix()}，欢迎回来`
            })
          }, 500)
        })
      }
    },
    onClose() {
      this.error = false
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  background: #f0f2f5;
  background-image: url('../../assets/images/login_bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;

  .wrap {
    position: absolute;
    left: 50%;
    top: 20.8%;
    transform: translateX(-50%);
    padding: 0 55px;
    width: 440px;
    height: 420px;
    box-shadow: 1px 4px 6px 2px rgba(0, 0, 0, 0.24);
    border-radius: 4px;
    background: #fff;
    text-align: center;

    .logo-login {
      margin: 32px 0 5px;
      max-height: 80px;
    }

    .login-product {
      position: relative;
      left: -25%;
      width: 150%;
      color: #333;
      font-size: 32px;
    }

    ::v-deep {
      .ant-form-item-with-help {
        .anticon {
          color: #ff4d4f !important;
        }

        .ant-input {
          border-bottom-color: #ff4d4f !important;
        }
      }
    }

    .login-form {
      margin-top: 40px;
      text-align: left;


      ::v-deep {
        .ant-form-explain {
          padding-left: 41px;
          font-size: 14px;
          line-height: 1.5715;
        }
      }

      .ant-input-group {
        display: flex;
        align-items: center;

        .anticon {
          font-size: 24px;
          color: #999;
          margin-right: 12px;
        }

        ::v-deep {
          .ant-input {
            border: none;
            border-bottom: 1px solid #999;
            padding: 0;
          }

          .ant-input::placeholder {
            font-size: 14px;
            line-height: 14px;
          }

          .ant-input {
            height: 31px;
          }

          .ant-input:focus {
            box-shadow: 0 0 0 0;
          }

          .ant-input-suffix {
            right: 0;
          }

          .pwd-eye {
            position: absolute;
            right: 0px;
            //top: 5px;
            width: 20px;
            height: 20px;
            cursor: pointer;

            &.pwd-eye-close {
              background: url('../../assets/images/eye_close_grey.png') no-repeat center center;

              &:hover {
                background: url('../../assets/images/eye_close_blue.png') no-repeat center center;
              }
            }

            &.pwd-eye-open {
              background: url('../../assets/images/eye_open_grey.png') no-repeat center center;

              &:hover {
                background: url('../../assets/images/eye_open_blue.png') no-repeat center center;
              }
            }
          }
        }
      }

      .active-input-grounp {
        .anticon {
          color: #006ebc;
        }

        ::v-deep {
          .ant-input {
            border-bottom-color: #006ebc;
          }
        }
      }
    }
  }
}
</style>
