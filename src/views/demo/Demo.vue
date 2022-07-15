<template>
  <div>
    <a-card :bordered="false">
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="md" :sm="24">
              <a-form-item label="字段1">
                <a-input v-model="queryParam.key1" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="md" :sm="24">
              <a-form-item label="字段2">
                <a-input v-model="queryParam.key2" placeholder="请输入" />
              </a-form-item>
            </a-col>
            <a-col :md="md" :sm="24">
              <a-form-item label="字段3">
                <a-select :show-arrow="true" v-model="queryParam.key3" placeholder="请选择">
                  <a-select-option v-for="item in list1" :value="item.value">{{ item.label }}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="md" :sm="24" v-show="md == 8">
              <a-form-item label="开始时间">
                <a-date-picker
                  v-model="queryParam.startTime"
                  :disabled-date="disabledStartDate"
                  show-time
                  inputReadOnly
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择开始时间"
                />
              </a-form-item>
            </a-col>
            <a-col :md="md" :sm="24" v-show="md == 8">
              <a-form-item label="结束时间">
                <a-date-picker
                  v-model="queryParam.endTime"
                  :disabled-date="disabledEndDate"
                  show-time
                  inputReadOnly
                  format="YYYY-MM-DD HH:mm:ss"
                  placeholder="请选择结束时间"
                />
              </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24" v-show="md == 8">
              <a-form-item label="告警时间">
                <a-range-picker
                  :show-time="{ format: 'HH:mm:ss' }"
                  format="YYYY-MM-DD HH:mm:ss"
                  :placeholder="['开始时间', '结束时间']"
                  @change="onChangeTime"
                />
              </a-form-item>
            </a-col>
            <a-col :md="md==8 ? 8 : md" :sm="24">
              <span class="table-page-search-submitButtons custom-search-btn">
                <a-button @click="$refs.table.refresh(true)" type="primary">
                  <span class="font_family">&#xe625;</span>
                </a-button>
                <a-button
                  style="margin-left: 8px"
                  @click="
                    () => {
                      this.queryParam = {}
                      $refs.table.refresh(true)
                    }
                  "
                >
                  <span class="font_family">&#xe632;</span>
                </a-button>
                <a-button
                  style="margin-left: 8px"
                  @click="
                    () => {
                      this.md == 6 ? (this.md = 8) : (this.md = 6)
                    }
                  "
                >
                  <span class="font_family" v-show="md == 8">&#xe62b;</span>
                  <span class="font_family" v-show="md == 6">&#xe630;</span>
                </a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="table-operator">
        <a-button type="primary" @click="add">新增</a-button>
        <a-button @click="batchDelete" v-if="selectedRowKeys && this.selectedRowKeys.length">删除</a-button>
      </div>
      <spin :spinning="loading">
        <s-table
          ref="table"
          rowKey="id"
          :columns="columns"
          :data="loadData"
          :rowSelection="rowSelection"
          :pagination='PAGINATION'
        >
        <span slot="bz" slot-scope="bz">
          <a-tooltip :title="bz">
            {{ bz }}
          </a-tooltip>
        </span>
        <span slot="action" slot-scope="text, record">
          <a @click="view(record)">查看</a>
          <a-divider type="vertical" />
          <a @click="edit(record)">编辑</a>
          <a-divider type="vertical" />
            <a-popconfirm placement='top' title='确认删除？' ok-text='确定' cancel-text='取消'
                          @confirm="deleteItem(record)"
            >
              <a>删除</a>
            </a-popconfirm>
        </span>
        </s-table>
      </spin>

    </a-card>
  </div>
</template>

<script>
import { DemoService } from '@/views/demo/demoService'
import DemoEditModal from '@/views/demo/components/DemoEditModal'
import {MODAL_SIZE, PAGINATION} from '@/config/uiConfig'
import DemoViewModal from '@/views/demo/components/DemoViewModal'
const columns = [
  {
    title: '字段1',
    dataIndex: 'key1',
    key: 'key1',
  },
  {
    title: '字段2',
    dataIndex: 'key2',
    key: 'key2',
  },
  {
    title: '备注',
    dataIndex: 'bz',
    key: 'bz',
    scopedSlots: { customRender: 'bz' },
  },
  {
    title: '操作',
    width: 150,
    key: 'action',
    scopedSlots: { customRender: 'action' },
  },
]

export default {
  name: 'Demo',
  data() {
    return {
      PAGINATION: PAGINATION,
      loading: false,
      //一行三个md为8;一行三个md为6
      md: 6,
      // 查询参数
      queryParam: {
        key1: '',
        key2: '',
        key3: '',
        startTime: '',
        endTime: ''
      },
      list1: DemoService.list1,
      // 表头
      columns,
      selectedRowKeys: [],
      selectedRows: [],
    }
  },
  watch: {

  },
  created() {},
  methods: {
    // 设置起始时间最大值
    disabledStartDate(startValue) {
      const endValue = this.queryParam.endTime;
      if (!startValue || !endValue) {
        return false;
      }
      return startValue.valueOf() > endValue.valueOf();
    },
    // 设置结束时间最小值
    disabledEndDate(endValue) {
      const startValue = this.queryParam.startTime;
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() >= endValue.valueOf();
    },
    onChangeTime(value, dateString) {
      this.queryParam.startTime = dateString[0];
      this.queryParam.endTime = dateString[1];
    },
    /**
     * 加载列表数据
     * @param parameter
     * @returns {Promise<{data: (*|*[]), pageNo: number, totalCount: *}|{data: *[]}>}
     */
    loadData(parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParam)
      return DemoService.getListByPage(requestParameters)
    },
    /**
     * 新增
     */
    add() {
      this.$dialog(
        DemoEditModal,
        {
          on: {
            ok: (res) => {
              console.log(res)
              this.$notification.success({
                message: '成功',
                description: '新增成功',
              })
              this.$refs.table.refresh(true)
            },
            cancel() {},
            close() {},
          },
        },
        // modal props
        {
          title: '新增',
          width: MODAL_SIZE.MIDDLE,
          centered: true,
          maskClosable: false,
          okText: '确认',
          cancelText: '取消',
        }
      )
    },
    /**
     * 查看
     * @param record
     */
    view(record){
      DemoService.getViewItemById(record.id).then((data) => {
        const close = this.$dialog(
          DemoViewModal,
          {
            record: data,
            on: {
              ok: () => {},
              cancel() {},
              close() {},
            },
          },
          // modal props
          {
            title: '详情',
            width: MODAL_SIZE.MIDDLE,
            centered: true,
            maskClosable: false,
            footer: [<button type="button" class="ant-btn ant-btn-primary" onClick={() => {close && close()}}><span>确 认</span></button>]
          }
        )
      }).finally(() => {
        this.loading = false;
      })
    },
    /**
     *  编辑
     */
    edit(record) {
      this.loading = true;
      DemoService.getEditItemById(record.id).then((data) => {
        this.$dialog(
          DemoEditModal,
          {
            record: data,
            on: {
              ok: () => {
                this.$notification.success({
                  message: '成功',
                  description: '编辑成功',
                })
                this.$refs.table.refresh(true)
              },
              cancel() {},
              close() {},
            },
          },
          // modal props
          {
            title: '编辑',
            width: MODAL_SIZE.MIDDLE,
            centered: true,
            maskClosable: false,
            okText: '确认',
            cancelText: '取消',
          }
        )
      }).finally(() => {
        this.loading = false;
      })
    },
    /**
     * 单个删除
     */
    deleteItem(record) {
      this.loading = true;
      DemoService.deleteSingle(record.id).then(res => {
        this.$notification.success({
          message: '成功',
          description: '删除成功',
        })
        this.$refs.table.refresh()
      }).finally(() => {
        this.loading = false;
      })
      // this.$confirm({
      //   title: '提示',
      //   content: '?',
      //   okText: '确认',
      //   okType: 'danger',
      //   cancelText: '取消',
      //   onOk: () => {
      //
      //   },
      //   onCancel() {
      //
      //   }
      // })
    },
    /**
     * 批量删除
     */
    batchDelete() {
      this.$mConfirm({
        title: '提示',
        content: '确定删除该' + this.selectedRowKeys.length + '项?',
        okText: '确认',
        cancelText: '取消',
      })
        .then(() => {
          //点击确定之后的处理
          this.loading = false;
          DemoService.batchDelete(this.selectedRowKeys).then((res) => {
            this.$notification.success({
              message: '成功',
              description: '删除成功',
            })
            this.$refs.table.refresh()
            this.$refs.table.clearSelected();
          }).finally(() => {
            this.loading = false;
          })
        })
        .catch(() => {
          //点击取消之后的处理
        })
    },
    onSelectChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
  },
  computed: {
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: this.onSelectChange,
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>
