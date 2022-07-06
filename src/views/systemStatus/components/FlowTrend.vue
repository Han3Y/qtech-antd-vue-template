<template>
  <div class='flow-trend-content'>
    <a-col :span='12'>
      <a-card title='近24小时流量趋势(KB)' :bordered='false'>
        <div id='flowTrend'></div>
      </a-card>
    </a-col>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { systemStatusService } from '@/views/systemStatus/systemStatusService'
import { EVENT_BUS_TYPES } from '@/utils/bus'

export default {
  name: 'SafeEvent',
  data() {
    return {
      option: {},
      myEcharts: null
    }
  },
  created() {
    this.getLastDayFlowCount()
  },
  mounted() {
    this.$eventBus.$on(EVENT_BUS_TYPES.ON_RESIZE, () => {
      let width = document.querySelector('#flowTrend').clientWidth
      let height = document.querySelector('#flowTrend').clientHeight
      this.myEcharts.resize(width, height)
    })
  },
  methods: {
    getLastDayFlowCount() {
      systemStatusService.getLastDayFlowCount().then(res => {
        let { items } = res
        let optionsObj = {
          time: [],
          flow: []
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
      let { time, flow } = optionsObj
      this.option = {
        title: {
          text: ''
        },
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
          // formatter: (params) => {
          //   let str = `${params[0] ? params[0].axisValueLabel : ''}
          //     <br/>
          //   ${params[0] ? params[0].marker : ''}${params[0].seriesName}: ${params[0] ? params[0].value : ''}${this.flowUnit}`;
          //   return str;
          // },
        },
        legend: {
          show: false
        },
        grid: {
          top: '30px',
          left: '1%',
          right: '5%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [
          {
            data: time,
            type: 'category',
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
        yAxis: {
          nameTextStyle: {
            color: '#303030'
          },
          min: 0,
          splitNumber: 3,
          type: 'value',
          scale: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#303030'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#BABABA'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#ddd'
            }
          },
          boundaryGap: [0.2, 0.2]
        },
        series: [
          {
            data: flow,
            color: '#e30000',
            type: 'line',
            name: '流量',
            symbolSize: 5,
            symbol: 'circle',
            smooth: true,
            showSymbol: false,
            lineStyle: {
              normal: {
                color: '#02C2C4',
                width: 2
              }
            },
            areaStyle: {
              // 实现蓝白渐变色
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgba(2,194,196,0.3)'
                  },

                  {
                    offset: 1,
                    color: 'rgba(2,194,196,0)'
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: '#02C2C4'
              }
            }
          }
        ]
      }
      let myEchart = echarts.init(document.querySelector('#flowTrend'))
      myEchart.setOption(this.option)
      this.myEcharts = myEchart
    }
  },
  destroyed() {
    this.$eventBus.$off(EVENT_BUS_TYPES.ON_RESIZE)
    this.myEcharts=null
  }
}
</script>

<style scoped lang='less'>
#flowTrend {
  height: 270px;
}

</style>