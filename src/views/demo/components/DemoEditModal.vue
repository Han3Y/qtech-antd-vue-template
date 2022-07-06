<template>
  <div class='modal-form-box'>
    <a-spin :spinning="loading">
      <a-form-model :model="formData" :rules="rules" ref="form" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="文本" prop="key1">
          <a-input placeholder="请输入" v-model="formData.key1"/>
        </a-form-model-item>
        <a-form-model-item label="数字" prop="key2">
          <a-input-number placeholder="请输入" v-model="formData.key2"/>
        </a-form-model-item>
        <a-form-model-item label="长文本">
          <a-textarea v-model="formData.key3" placeholder="请输入" :rows="4"/>
        </a-form-model-item>
        <a-form-model-item label="下拉框" prop="key4">
          <a-select :show-arrow="true" v-model="formData.key4" placeholder="请选择">
            <a-select-option v-for="item in list1" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="下拉框多选" prop="key5">
          <a-select mode="multiple" :show-arrow="true" v-model="formData.key5" placeholder="请选择">
            <a-select-option v-for="item in list1" :value="item.value">{{ item.label }}</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="单选框" prop="key6">
          <a-radio-group v-model:value="formData.key6">
            <a-radio :style="radioStyle" :value="1">选项1</a-radio>
            <a-radio :style="radioStyle" :value="2">选项2</a-radio>
            <a-radio :style="radioStyle" :value="3" class="tw-h-16">选项3
              <a-textarea  placeholder="请输入" v-model="formData.key10" :auto-size="{ minRows: 3, maxRows: 3 }" class="tw-align-top"/>
            </a-radio>

          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="多选框" prop="key7">
          <a-checkbox v-model:checked="formData.key7">启用</a-checkbox>
        </a-form-model-item>
        <a-form-model-item label="多选框组" prop="key8">
          <a-checkbox-group
            v-model="formData.key8"
            name="key8"
            :options="checkboxOptions"
            @change="checkboxOnChange"
          />
        </a-form-model-item>
        <a-form-model-item label="开关" prop="key9">
          <a-switch checked-children="开" un-checked-children="关" v-model="formData.key9"/>
        </a-form-model-item>
      </a-form-model>
    </a-spin>
  </div>
</template>

<script>
import { INT_VALIDATOR, VALIDATOR_MSG } from '@/utils/validator'
import {LABEL_COL, RADIO_STYLE, WRAPPER_COL} from '@/config/uiConfig'
import { DemoService } from '@/views/demo/DemoService'

export default {
  name: 'DemoEditModal',
  props: {
    record: {
      type: Object,
      default: function (){
        return null
      }
    }
  },
  data: function() {
    return {
      loading: false,
      formData: {
        id: '',
        key1: '',
        key2: '',
        key3: '',
        key4: '',
        key5: [],
        key6: '',
        key7: true,
        key8: [],
        key9: true,
        key10: '',
      },
      rules: {
        key1: [
          { required: true, message: VALIDATOR_MSG.required, trigger: 'change' }
        ],
        key2: [
          { required: true, message: VALIDATOR_MSG.required, trigger: 'change' },
          { validator: INT_VALIDATOR }
        ]
      },
      labelCol: LABEL_COL,
      wrapperCol: WRAPPER_COL,
      radioStyle: RADIO_STYLE,
      list1: DemoService.list1,
      checkboxOptions: DemoService.list1
    }
  },
  methods: {
    onOk() {
      /**
       * 点击确认时校验
       */
      return this.handleSubmit()
    },
    onCancel() {
      /**
       * 点击取消时的操作
       */
      return new Promise(resolve => {
        resolve(true)
      })
    },
    handleSubmit() {
      console.log(this.formData)
      if(this.loading){
        return ;
      }
      this.loading = true
      return new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) {
            resolve()
          } else {
            reject()
            return false
          }
        })
      }).then(() => this.record ? DemoService.edit(this.formData) : DemoService.create(this.formData))
        .then(() => {
          // 返回为真值时，走确认回调，返回值可以在ok()回调中收到
          return true;
        })
        .finally(() => {
          this.loading = false
        })

    },
    checkboxOnChange(checkedValues){
      console.log(checkedValues);
    }
  },
  mounted() {
    // 如果有传入值，则显示传入的值
    this.record && Object.assign(this.formData, this.record)
  }
}
</script>

<style scoped lang="less">

</style>