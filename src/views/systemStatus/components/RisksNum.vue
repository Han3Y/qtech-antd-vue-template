<template>
  <!-- 风险数 -->
  <div class='risk-num-content'>
    <a-col :span='8'>
      <a-card title='风险数' :bordered='false'>
        <div class='tw-flex tw-flex-col tw-h-full tw-justify-between'>
          <div>
            <div class='tw-text-4xl tw-text-subTitle'>当前风险总数</div>
            <div class='tw-mr-3'>
              <span class='tw-text-subTitle tw-text-6xl tw-mr-3'>{{ riskNumInfo.count }}</span>
              <span class='tw-text-tips tw-text-3.5xl'>条</span>
            </div>
          </div>
          <div class='tw-flex tw-justify-between tw-items-center '>
            <div class='tw-flex tw-flex-col tw-justify-end left-type-content'>
              <div class='tw-text-3.5xl tw-text-subTitle tw-my-2 '><span
                class='tw-w-2 tw-h-2 tw-rounded-circle tw-bg-high tw-inline-block tw-mr-2'></span>高危<span
                class='tw-text-high tw-ml-3'>{{ riskNumInfo.highCount }}</span></div>
              <div class='tw-text-3.5xl tw-text-subTitle tw-my-2 '><span
                class='tw-w-2 tw-h-2 tw-rounded-circle tw-bg-medium tw-inline-block tw-mr-2'></span>中危<span
                class='tw-text-medium tw-ml-3'>{{ riskNumInfo.mediumCount }}</span></div>
              <div class='tw-text-3.5xl tw-text-subTitle tw-my-2 '><span
                class='tw-w-2 tw-h-2 tw-rounded-circle tw-bg-low tw-inline-block tw-mr-2'></span>低危<span
                class='tw-text-low tw-ml-3'>{{ riskNumInfo.lowCount }}</span></div>
            </div>
            <div class='no-data' v-if='riskNumInfo.count==0'>
              <div class='safe'></div>
              <div class='tw-text-3.5xl tw-text-tips'>今日暂无风险~</div>
            </div>
            <div v-else class='risk-num-box'>
              <div id='myEchartsNum'></div>
            </div>
          </div>
        </div>
      </a-card>
    </a-col>
  </div>
</template>

<script>
import moment from 'moment'
import TimeUtil from '@/utils/timeUtil'
import { systemStatusService } from '@/views/systemStatus/systemStatusService'
import * as echarts from 'echarts'
import { EVENT_BUS_TYPES } from '@/utils/bus'

export default {
  name: 'RisksNum',
  data() {
    return {
      option: {},
      riskNumInfo: {
        highCount: 0,
        mediumCount: 0,
        lowCount: 0,
        count: 0
      },
      myCharts: null
    }
  },
  created() {
    this.$eventBus.$on(EVENT_BUS_TYPES['RISK_TOTAL'], ({ startTime, endTime }) => {
      this.getSafeInfoLevelCount(startTime, endTime)
    })
    this.getSafeInfoLevelCount(TimeUtil.getNowDayStart(), TimeUtil.getNowDayStart(0, 1, 'next'))
  },
  mounted() {
    this.$eventBus.$on(EVENT_BUS_TYPES.ON_RESIZE, () => {
      let width = document.querySelector('.risk-num-box').clientWidth
      let height = document.querySelector('.risk-num-box').clientHeight
      this.myCharts.resize({ width: width, height: height })
    })
  },
  methods: {
    getSafeInfoLevelCount(startTime, endTime) {
      let params = {
        startTime,
        endTime
      }
      systemStatusService.getSafeInfoLevelCount(params).then(res => {
        this.riskNumInfo = res
        this.$nextTick(() => {
          res.count > 0 ? this.pieCircle(res) : this.myCharts.dispose()
        })
      })
    },
    pieCircle(objData) {
      // let TYPE_LIST = ['lowCount', 'mediumCount', 'highCount']
      // let TYPE_LIST_NAME = {
      //   'lowCount': '低危',
      //   'mediumCount': '中危',
      //   'highCount': '高危'
      // }
      // let data = []
      // for (let key in objData) {
      //   if (TYPE_LIST.includes(key)) {
      //     let itemData = { name: TYPE_LIST_NAME[key], value: objData[key] }
      //     data.push(itemData)
      //   }
      // }
      let HIGH = 'highCount', MEDIUM = 'mediumCount', LOW = 'lowCount'
      let data = [{ name: '低', value: objData[LOW] }, { name: '中', value: objData[MEDIUM] }, {
        name: '高',
        value: objData[HIGH]
      }]
      let sumValue = objData.count || 0
      let colorList = [
        {
          c1: '#EACA1B',
          c2: '#EACA1B'
        },
        {
          c1: '#EF8824',
          c2: '#EF8824'
        },
        {
          c1: '#E30000',
          c2: '#E30000'
        }
      ]
      let res = {
        series: [],
        // yAxis: [],
        formatter: []
      }
      for (let i = 1; i <= data.length; i++) {
        res.series.push({
          name: data[i - 1].name,
          type: 'pie',
          clockWise: true,
          z: 2,
          hoverAnimation: false,
          radius: [92 - i * 23 + '%', 100 - i * 23 + '%'],
          center: ['50%', '50%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: colorList[i - 1].c2
                },
                {
                  offset: 1,
                  color: colorList[i - 1].c1
                }
              ]),
              borderRadius: 5
              // color: function(params) {
              //   var colorList = ['#103060', '#066881']
              //   return colorList[params.dataIndex]
              // }
            }
          },
          data: [
            {
              value: data[i - 1].value,
              name: data[i - 1].name
            },
            {
              value: sumValue - data[i - 1].value,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0
              },
              tooltip: {
                show: false
              },
              label: {
                show: false
              },
              hoverAnimation: false
            }
          ]
        })
        res.series.push({
          name: '背景线',
          type: 'pie',
          silent: true,
          z: 1,
          clockWise: true,
          hoverAnimation: false,
          radius: [92 - i * 23 + '%', 100 - i * 23 + '%'],
          center: ['50%', '50%'],
          label: {
            show: false
          },
          itemStyle: {
            label: {
              show: false
            },
            labelLine: {
              show: false
            }
          },
          data: [
            {
              value: 100,
              itemStyle: {
                color: 'rgba(0,0,0,0.10)',
                borderWidth: 0,
                borderRadius: 10
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            }
          ]
        })
        // res.yAxis.push(data[i - 1].name)
      }
      this.option = res
      let myChart = echarts.init(document.querySelector('#myEchartsNum'))
      myChart.setOption(this.option)
      this.myCharts = myChart
    }
  },
  destroyed() {
    this.$eventBus.$off(EVENT_BUS_TYPES['RISK_TOTAL'])
    this.$eventBus.$off(EVENT_BUS_TYPES['ON_RESIZE'])
    this.myCharts=null
  }
}
</script>

<style scoped lang='less'>
.risk-num-box {

  width: 100%;
  max-width: 245px;
}

#myEchartsNum {
  height: 204px;
}

.left-type-content {
  height: calc(100% - 48px);
}

.no-data {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #666;
  padding-right: 20px;

  .safe {
    width: 122px;
    height: 79px;
    margin-top: 6px;
    margin-bottom: 10px;
    background: url('../../../assets/images/system_status.png') 0 0 no-repeat;
    background-position: -135px -46px;
  }
}

</style>