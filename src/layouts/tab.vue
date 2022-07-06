<template>
  <div class="main-content" style="background:#fff">
    <div class="card-content">
      <div class="form-list">
        <Form :model="formData" :rules="formDataValidator" :label-width="80">
          <FormItem label="输入组件" prop="cronValue1">
            <!-- 显示年和秒 -->
            <input-cron type="text" v-model="formData.cronValue1" :exeStartTime="exeStartTime"
              :hideSecond="false" placeholder="请选择你需要配置的Cron" />
          </FormItem>
          <FormItem label="Cron组件" prop="cronValue2">
            <easy-cron style="width: 700px;"  v-model="formData.cronValue2" :exeStartTime="exeStartTime"></easy-cron>
          </FormItem>
          <!-- <FormItem label="隐藏秒" prop="cronValue3">
            <easy-cron style="width: 750px;"  v-model="formData.cronValue3" :exeStartTime="exeStartTime"
              :hideSecond="true"></easy-cron>
          </FormItem> -->
          <!-- <FormItem label="隐藏年" prop="cronValue4">
            <easy-cron style="width: 800px;" v-model="formData.cronValue4" :disabled="true"
              :hideYear="true" :remote="remote"></easy-cron>
          </FormItem> -->
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import EasyCron from '../components/easy-cron'
import InputCron from '../components/easy-cron/input-cron'
import CronValidator from '../components/easy-cron/validator'//表达式校验规则

export default {
  name: 'HelloWorld',
  data () {
    return {
      exeStartTime: '',
      formData: {
        cronValue1: '',
        cronValue2: '',
        cronValue3: '',
        cronValue4: ''
      },
      formDataValidator: {
        cronValue1: [
          { validator: CronValidator }
        ],
        cronValue2: [
          { validator: CronValidator }
        ],
        cronValue3: [
          { validator: CronValidator }
        ],
        cronValue4: [
          { validator: CronValidator }
        ]
      }
    }
  },
  methods: {
    // remote (val, time, cb) {
    //   const msg = `remote called: ${val} ${time}`
    //   console.info(msg)
    //   setTimeout(() => {
    //     // get result for e via http...
    //     const result = msg
    //     // ...
    //     // callback
    //     cb(result)
    //   }, 200)
    // }
  },
  components: {
    EasyCron,
    InputCron
  },
  created () {
    // console.info(aaa)
  }
}
</script>


<style  scoped>
h1, h2 {
  font-weight: normal;
}
.main-content {
   background-color: #E0E0E0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.card-content {
  flex-basis: 600px;
}

.form-list {
  margin-top: 20px;
}
</style>
