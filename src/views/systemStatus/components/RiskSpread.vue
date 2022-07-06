<template>
  <!--风险分布-->
  <div class='risk-spread-content'>
    <a-col :span='8'>
      <a-card title='风险分布' :bordered='false'>
        <div class='tw-flex tw-items-center tw-justify-around tw-mt-24' v-if='riskTotal===0'>
          <div class='no-data'></div>
          <div>
            <div class='tw-text-3.5xl tw-text-subTitle tw-my-0.5 ' v-for='(item,index) in riskSpreadData'
                 :key='index' :class='index==0?"tw-mt-4":index==1?"tw-mt-2":"tw-mt-2"'><span
              class='tw-w-2 tw-h-2 tw-rounded-circle  tw-inline-block tw-mr-3'
              :class='index==0?"tw-bg-blackbg":index==1?"tw-bg-ipmacbg":"tw-bg-whitebg"'></span>{{ item.name }}<span
              class='tw-text-subTitle tw-ml-3'>{{ item.value }}%</span></div>
            <!--            <div class='tw-text-3.5xl tw-text-subTitle tw-my-0.5 '><span-->
            <!--              class='tw-w-2 tw-h-2 tw-rounded-circle tw-bg-ipmacbg tw-inline-block tw-mr-3'></span>IP/MAC<span-->
            <!--              class='tw-text-subTitle tw-ml-3'>{{ riskSpreadInfo.ipMac }}%</span></div>-->
            <!--            <div class='tw-text-3.5xl tw-text-subTitle tw-my-0.5 tw-mt-2'><span-->
            <!--              class='tw-w-2 tw-h-2 tw-rounded-circle tw-bg-whitebg tw-inline-block tw-mr-3'></span>白名单异常<span-->
            <!--              class='tw-text-subTitle tw-ml-3'>{{ riskSpreadInfo.white }}%</span></div>-->
          </div>
        </div>
        <div v-else class='chart-box'>

          <div id='myEcharts'></div>
        </div>
      </a-card>
    </a-col>
  </div>
</template>

<script>
import { systemStatusService } from '@/views/systemStatus/systemStatusService'
import { EVENT_BUS_TYPES } from '@/utils/bus'
import TimeUtil from '@/utils/timeUtil'
import * as echarts from 'echarts'

export default {
  name: 'RiskSpread',
  data() {
    return {
      riskSpreadInfo: {
        black: 0,
        ipMac: 0,
        white: 0
      },
      option: {},
      riskSpreadData: [],
      riskTotal: 0,
      myCharts: null
    }
  },
  created() {
    this.$eventBus.$on(EVENT_BUS_TYPES['RISK_SPREAD'], ({ startTime, endTime }) => {
      this.getSafeInfoEventCount(startTime, endTime)
    })
    this.getSafeInfoEventCount(TimeUtil.getNowDayStart(), TimeUtil.getNowDayStart(0, 1, 'next'))
  },
  mounted() {
    this.$eventBus.$on(EVENT_BUS_TYPES.ON_RESIZE, () => {
      let width = document.querySelector('.chart-box').clientWidth
      let height = document.querySelector('.chart-box').clientHeight
      this.myCharts.resize({ width: width, height: height })
    })
  },
  methods: {
    getSafeInfoEventCount(startTime, endTime) {
      let params = {
        startTime,
        endTime
      }
      systemStatusService.getSafeInfoEventCount(params).then(res => {
        let { eventType } = res
        this.riskTotal = this.getRiskNum(eventType)
        let riskArr = eventType.filter(item => {
          return item.name.startsWith('白') || item.name.startsWith('自')
        })
        let whiteCount = this.getRiskNum(riskArr)
        this.riskSpreadData = eventType.filter(item => {
          return !item.name.startsWith('自') && !item.name.startsWith('白')
        }).concat([{ name: '白名单异常', value: whiteCount }])
        let isHaveData = this.riskSpreadData.some(item => item.value > 0)
        this.$nextTick(() => {
          isHaveData ? this.echats() : this.myCharts.dispose()
        })
      })
    },
    getRiskNum(arr) {
      let num = 0
      for (let i = 0; i < arr.length; i++) {
        num += arr[i].value
      }
      return num
    },
    echats() {
      this.option = {
        title: {
          show: true
        },
        tooltip: {
          trigger: 'item',
          padding: 4,
          borderWidth: 10,
          borderColor: 'transparent !important',
          backgroundColor: 'rgba(0,0,0,0.8)',
          textStyle: {
            color: '#fff',
            fontSize: 12,
            zIndex: '999 important'
          },
          extraCssText: 'z-index:99'
        },
        legend: {
          show: true,
          type: 'scroll',
          orient: 'vertical',
          left: '60%',
          top: '40%', //图例上下垂直居中
          itemWidth: 8,
          itemHeight: 8,
          icon: 'circle', //图例标签是圆点
          itemGap: 10, //图例的间隔
          itemStyle: { borderWidth: 0 },
          data: this.riskSpreadData,
          formatter: (name) => {
            let per = 0, val = 0
            this.riskSpreadData.forEach((item) => {
              if (item.name === name) {
                per = ((item.value / this.riskTotal) * 100).toFixed(1)
                val = item.value
              }
            })
            return `${name}{per|${per}%}`
          },
          textStyle: {
            fontSize: 12,
            color: '#333333',
            rich: {
              per: {
                color: '#666',
                padding: [0, 0, 0, 6]
              }
            }
          }
        },
        color: ['#238DEE', '#1A5ACB', '#13C2DE'],
        series: [
          {
            name: '风险分布',
            type: 'pie',
            stillShowZeroSum: false,
            data: this.riskSpreadData,
            radius: ['50%', '65%'],
            center: ['25%', '50%'],
            hoverOffset: 5,
            label: {
              lineHeight: 18,
              position: 'center',
              formatter: `{des|安全事件总数}\n\r{total|${this.riskTotal}}`,
              rich: {}
            },
            itemStyle: {
              borderWidth: 0,
              normal: {
                borderWidth: 3,
                borderColor: '#fff '
              }
            },
            hoverAnimation: false

          }
        ]
      }
      let myChart = echarts.init(document.querySelector('#myEcharts'))
      myChart.setOption(this.option)
      this.myCharts = myChart
    }

  },
  destroyed() {
    this.$eventBus.$off(EVENT_BUS_TYPES['RISK_SPREAD'])
    this.$eventBus.$off(EVENT_BUS_TYPES['ON_RESIZE'])
    this.myCharts=null
  }
}
</script>

<style scoped lang='less'>
.risk-spread-content {
  #myEcharts {
    height: 240px;
  }

  .no-data {
    position: relative;
    height: 100%;

    &::before {
      position: absolute;
      top: calc(50% - 66px);
      left: 8px;
      width: 136px;
      height: 132px;
      background: url('../../../assets/images/system_status.png') -2px -48px no-repeat;
      content: '';
    }
  }
}
</style>