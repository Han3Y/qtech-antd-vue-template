<template>
  <!-- 风险日历 -->
  <div class='risk-calendar-content'>
    <a-col :span='8'>
      <a-card :bordered='false' style='padding:0'>
        <a-calendar :fullscreen='false' @panelChange='onPanelChange' @select='onClick_select' @change='onClick_change'
                    :disabledDate='disabledDate'
                    :headerRender='headerRender'
        >
          <template slot='dateCellRender' slot-scope='value' v-if='monthSafeInfo.days'>
            <a-badge color='#faad14' v-if='monthSafeInfo.days.includes(TimeUtil.getNowDateFormatString(value))' />
          </template>
        </a-calendar>
      </a-card>
    </a-col>
  </div>
</template>

<script>
import { systemStatusService } from '@/views/systemStatus/systemStatusService'
import TimeUtil from '@/utils/timeUtil'
import { EVENT_BUS_TYPES } from '@/utils/bus'

export default {
  name: 'RiskCalendar',
  data() {
    return {
      TimeUtil: TimeUtil,
      dayDate: TimeUtil.getNowDateFormatString(),
      monthSafeInfo: {},//有安全事件的日期
      curMonth: TimeUtil.getMonth() - 1,//当前月
      curClickMoth: TimeUtil.getMonth() - 1//当前点击的月份
    }
  },
  created() {
    this.getMonthSafeInfoDay()
  },
  methods: {
    getMonthSafeInfoDay() {
      //获取某月有安全事件的日期
      let params = {
        date: this.dayDate
      }
      systemStatusService.getMonthSafeInfoDay(params).then(res => {
        this.monthSafeInfo = res
      })
    },
    onPanelChange(value, mode) {
    },
    onClick_select(moment) {
      let startTime=TimeUtil.getNowDayStart(moment.valueOf())
      let endTime=TimeUtil.getNowDayStart(moment.valueOf(),1,'next')
      this.$eventBus.$emit(EVENT_BUS_TYPES['RISK_TOTAL'],{startTime,endTime})
      this.$eventBus.$emit(EVENT_BUS_TYPES['RISK_SPREAD'],{startTime,endTime})
      // console.log(this.monthSafeInfo.days.includes(TimeUtil.getNowDateFormatString(moment.valueOf())))
    },
    onClick_change(date) {
    },
    headerRender({ value, type, onChange, onTypeChange }) {
      let that = this
      const month = value.month()
      const curClickMoth = this.curClickMoth//当前点击的月
      const curMonth = this.curMonth//当前月份
      const defaultMount = [10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      let index = defaultMount.lastIndexOf(curMonth)
      let showMonths = []
      if (index > -1) {
        showMonths = defaultMount.slice(index - 2, index + 1) //获取展示的3个月份
      }
      let finialMoth = showMonths.map(item => item + 1)//最终展示的月份
      let option = []
      finialMoth.forEach((item) => {
        option.push(<span style={{ margin: '0 12px' }} class={item - 1 === curClickMoth ? 'active-month' : 'month-text'}
                          key={item} onClick={() => {
          onClick_handle(item)
        }}>{item}月</span>)
      })

      function onClick_handle(item) {
        const newValue = value.clone()
        newValue.month(parseInt((item - 1) + '', 10))
        that.curClickMoth = item - 1
        onChange(newValue)
      }

      return (
        <div style={{ padding: '0px' }}>
          <div class='month-list tw-py-4 tw-px-6 tw-flex tw-justify-between'>
            <div class='tw-text-base'>风险日历</div>
            <div>{option}</div>
          </div>
        </div>
      )
    },

    disabledDate(event) {
      let curTime = +new Date()
      return curTime < event.valueOf()
    }
  }
}
</script>

<style scoped lang='less'>
.risk-calendar-content {
  ::v-deep {
    .ant-card {
      .ant-card-body {
        padding: 0;

        .ant-fullcalendar {
          border-top: 1px solid #e8e8e8;
          background: #fff;
          border-radius: 2px;

          .ant-fullcalendar-calendar-body {
            padding: 24px;
            height: 312px;

            .ant-fullcalendar-disabled-cell {

            }

            .ant-fullcalendar-disabled-cell {
              .ant-fullcalendar-value:hover {
                background: transparent !important;
              }

              .ant-fullcalendar-date {
                background: #f5f5f5;
              }
            }

            .ant-fullcalendar-date {
              .ant-fullcalendar-value:hover {
                background: rgba(0, 0, 0, .1);
              }
            }

            .ant-fullcalendar-today {
              .ant-fullcalendar-value {
                box-shadow: 0 0 0 1px #fc8512 inset
              }
            }

            .ant-fullcalendar-selected-day {
              .ant-fullcalendar-value {
                background: #fc8512;
                box-shadow: 0 0 0 1px #fc8512 inset
              }
            }
          }
        }
      }
    }
  }

  .active-month {
    color: #006ebc;
    cursor: pointer;
  }

  .month-text {
    color: #999;
    cursor: pointer;
  }

  .month-text:hover {
    color: #006ebc;
  }

  ::v-deep {
    .ant-fullcalendar-tbody {
      .ant-badge-status-text {
        margin-left: 0 !important;
      }
    }
  }
}
</style>