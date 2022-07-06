<template>
  <div class='safe-event-content'>
    <a-col :span='12'>
      <a-card title='近24小时安全事件趋势' :bordered='false'>
        <!--        <v-chart class='chart' :option='option' />-->
        <div id='safeEvent'></div>
      </a-card>
    </a-col>
  </div>
</template>

<script>

import { systemStatusService } from '@/views/systemStatus/systemStatusService'
import * as echarts from 'echarts'

const HIGH = 'high'
const LOW = 'low'
const MEDIUM = 'medium'
const TIME = 'time'
import { EVENT_BUS_TYPES } from '@/utils/bus'

export default {
  name: 'SafeEvent',
  data() {
    return {
      option: {},
      myCharts: null,
    }
  },
  created() {
    this.getLastDaySafeInfoLevelCount()
  },
  mounted() {
    this.$eventBus.$on(EVENT_BUS_TYPES.ON_RESIZE, () => {
      let width = document.querySelector('#safeEvent').clientWidth
      let height = document.querySelector('.chart-box').clientHeight
      this.myCharts.resize(width, height)
    })
  },
  methods: {
    getLastDaySafeInfoLevelCount() {
      systemStatusService.getLastDaySafeInfoLevelCount().then(res => {
        let { items, total } = res
        let optionsObj = {
          time: [],
          high: [],
          low: [],
          medium: []
        }
        for (let key in optionsObj) {
          optionsObj[key] = items.map(item => item[key])
        }
        this.$nextTick(() => {
          this.initEcharts(optionsObj)
        })
      })
    },
    initEcharts(optionsObj) {
      let { time, high, low, medium } = optionsObj
      this.option = {
        tooltip: {
          trigger: 'axis',
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
        grid: {
          top: '30px',
          left: '1%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        legend: {
          data: [{ name: '高危' }, { name: '中危' }, { name: '低危' }],
          itemGap: 24,
          right: '0',
          top: '0',
          itemWidth: 8,
          textStyle: {
            fontSize: 12,
            color: '#333' //图例中的样式
          }
        },
        xAxis: [
          {
            type: 'category',
            data: time,
            boundaryGap: false,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#303030'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#BABABA'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            // type: 'value'
            type: 'value',
            min: 0,
            splitNumber: 3,
            minInterval: 1,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ddd',
                type: 'dashed'
              }
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: '#BABABA'
              }
            },
            axisLabel: {
              margin: 20,
              textStyle: {
                color: '#303030'
              }
            },
            boundaryGap: [0.2, 0.2]
          }
        ],
        series: [
          {
            name: '高危',
            data: high,
            type: 'line',
            symbol: 'circle',
            smooth: true,
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: '#E30000 ' // 线条颜色
              },
              borderColor: '#E30000 ',
              width: 1
            },
            itemStyle: {
              normal: {
                color: '#E30000'
              }
            },
            color: '#e30000'
          },
          {
            data: medium,
            name: '中危',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              normal: {
                color: '#EF8824' // 线条颜色
              },
              borderColor: '##EF8824'
            },
            itemStyle: {
              width: 1,
              normal: {
                color: '#EF8824'
              }
            }
          },
          {
            data: low,
            name: '低危',
            type: 'line',
            symbol: 'circle',
            symbolSize: 5,
            smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              normal: {
                color: '#E4DA13' // 线条颜色
              },
              borderColor: '#E4DA13'
            },
            itemStyle: {
              normal: {
                color: '#E4DA13'
              }
            }
          }
        ]
      }
      let myChart = echarts.init(document.querySelector('#safeEvent'))
      myChart.setOption(this.option)
      this.myCharts = myChart
    }
  },
  destroyed() {
    this.$eventBus.$off(EVENT_BUS_TYPES.ON_RESIZE)
  }
}
</script>

<style scoped lang='less'>
#safeEvent {
  height: 270px;
}

.chart {
  height: 270px;
}

</style>