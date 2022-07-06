<template>
  <div class='log-mgt-container'>
    <a-card :bordered='false'>
      <div class='table-page-search-wrapper'>
        <a-form layout='inline'>
          <a-row :gutter='48'>
            <a-col :md='md' :sm='24'>
              <a-form-item label='开始时间'>
                <a-date-picker
                  v-model='queryParam.startTime'
                  :disabled-date='disabledStartDate'
                  show-time
                  inputReadOnly
                  format='YYYY-MM-DD HH:mm:ss'
                  placeholder='请选择开始时间'
                  @openChange='handleStartOpenChange'
                />
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24'>
              <a-form-item label='结束时间'>
                <a-date-picker
                  v-model='queryParam.endTime'
                  :disabled-date='disabledEndDate'
                  show-time
                  inputReadOnly
                  format='YYYY-MM-DD HH:mm:ss'
                  placeholder='请选择结束时间'
                  @openChange='handleEndOpenChange'
                />
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24'>
              <a-form-item label='用户名称'>
                <a-input v-model='queryParam.userName' placeholder='请输入事件主题用户名称' />
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24' v-show='md == 8'>
              <a-form-item label='用户角色'>
                <SelectCom :selectValue.sync='queryParam.authority' :selectType='ROLE_TYPE'
                           :selectTypeArr='ROLE_TYPE_NAME'></SelectCom>
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24' v-show='md == 8'>
              <a-form-item label='事件客体'>
                <a-input v-model='queryParam.target' placeholder='请输入事件客体' />
              </a-form-item>
            </a-col>
            <a-col :md='md' :sm='24' v-show='md == 8'>
              <a-form-item label='操作描述'>
                <a-input v-model='queryParam.searchText' placeholder='请输入操作描述' />
              </a-form-item>
            </a-col>

            <a-col :md='md==8?24:md' :sm='24'>
              <span class='table-page-search-submitButtons custom-search-btn'>
                <a-button @click='$refs.table.refresh(true)' type='primary'>
                  <span class='font_family'>&#xe625;</span>
                </a-button>
                <a-button
                  style='margin-left: 8px'
                  @click='
                    () => {
                      this.queryParam = {
                             startTime: "",
                             endTime: "",
                             authority: ROLE_TYPE[0],
                             userName: "",
                             target: "",
                             searchText: ""
                      }
                      $refs.table.refresh(true)
                    }
                  '
                >
                  <span class='font_family'>&#xe632;</span>
                </a-button>
                <a-button
                  style='margin-left: 8px'
                  @click='
                    () => {
                      this.md == 6 ? (this.md = 8) : (this.md = 6)
                    }
                  '
                >
                  <span class='font_family' v-show='md == 8'>&#xe62b;</span>
                  <span class='font_family' v-show='md == 6'>&#xe630;</span>
                </a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref='table'
        rowKey='time'
        :columns='columns'
        :data='loadData'
        :showPagination='true'
        :pagination='PAGINATION'
      >
       <span slot='authority' slot-scope='authority'>
         {{ ROLE_TYPE_NAME[authority] }}
       </span>
        <span slot='text' slot-scope='text'>
          <span class='tw-text-red-500'>{{ text }}</span>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { logMgtService, columns } from '@/views/logMgt/logMgt'
import { ROLE_TYPE, ROLE_TYPE_NAME } from '@/config/common'
import SelectCom from '@/components/CommonFilter/SelectCom'
import {PAGINATION} from "@/config/uiConfig";

export default {
  name: 'TableList',
  components: {
    STable,
    SelectCom
  },
  data() {
    return {
      ROLE_TYPE_NAME: ROLE_TYPE_NAME,
      ROLE_TYPE: ROLE_TYPE,
      PAGINATION: PAGINATION,
      roleType: ROLE_TYPE.map(item => {
        return { label: ROLE_TYPE_NAME[item], value: item }
      }),//用户角色
      endOpen: false,
      //一行三个md为8;一行四个md为6
      md: 6,
      // 查询参数
      queryParam: {
        startTime: '',//开始时间
        endTime: '',//结束时间
        userName: '',
        authority: ROLE_TYPE[0],
        target: '',
        searchText: ''
      },
      // 表头
      columns,
      expandedRowKeys: [],
      selectedRowKeys: [],
      selectedRows: [],
    }
  },

  created() {
  },
  methods: {
    disabledStartDate(startTime) {
      const endTime = this.queryParam.endTime
      if (!startTime || !endTime) {
        return false
      }
      return startTime.valueOf() > endTime.valueOf()
    },
    disabledEndDate(endTime) {
      const startTime = this.queryParam.startTime
      if (!endTime || !startTime) {
        return false
      }
      return startTime.valueOf() >= endTime.valueOf()
    },
    handleStartOpenChange(open) {
      // if (!open) {
      //   this.endOpen = true;
      // }
    },
    handleEndOpenChange(open) {
      // this.endOpen = open;
    },
    /**
     * 加载列表数据
     * @param parameter
     * @returns {Promise<{data: (*|*[]), pageNo: number, totalCount: *}|{data: *[]}>}
     */
    loadData(parameter) {
      let params = Object.assign({}, {
        ...this.queryParam,
      }, {
        authority: this.queryParam.authority === 'all' ? '' : this.queryParam.authority,
        ...parameter
      })
      const requestParameters = params;
      return logMgtService.getLogList(requestParameters)
    }

  },
  computed: {}
}
</script>

<style lang='less' scoped>
</style>
