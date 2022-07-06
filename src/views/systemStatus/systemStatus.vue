<template>
  <div class='log-mgt-container'>
    <!--  系统信息  -->
    <a-row :gutter='[16,16]'>
      <a-col :span='4' v-for='(item,index) in SYSTEM_EVENT_NAME' :key='index' class='tw-relative overflow-hidden'>
        <div
          class='gutter-row tw-flex tw-items-center tw-min-h-14 tw-bg-white tw-rounded-sm tw-relative tw-pl-18 tw-py-7'>
          <div class='tw-flex tw-flex-0 tw-flex-col tw-flex-nowrap' v-if='item===FLOW_NUM'>
            <span
              class='tw-text-xl'>{{ resolveTrafficTrend(systemStatusEventType[item]).resloveData }}<span
              class='tw-text-3.5xl'>{{ resolveTrafficTrend(systemStatusEventType[item]).unit }}</span></span>
            <span class='tw-text-sm'>{{ SYSTEM_STATUS_EVENT_NAME[item] }}</span>
          </div>
          <div class='tw-flex tw-flex-0 tw-flex-col tw-flex-nowrap' v-else>
            <span class='tw-text-xl'>{{ systemStatusEventType[item] }}</span>
            <span class='tw-text-sm'>{{ SYSTEM_STATUS_EVENT_NAME[item] }}</span>
          </div>
        </div>
      </a-col>
      <!--   4g状态连接   -->
      <a-col :span='4' class='tw-relative overflow-hidden'>
        <div
          class='gutter-row tw-flex tw-items-center tw-min-h-14 tw-bg-white tw-rounded-sm tw-relative tw-pl-18 tw-py-7'>
          <div class='tw-flex tw-flex-0 tw-flex-col tw-flex-nowrap'>
            <span class='tw-text-xl wifi' :class='wifiInfo.className'>
                <span class='tw-text-sm tw-ml-9' :class='wifiInfo.isConnected?"connected":"idle"'>{{ wifiInfo.signal
                  }}</span>
            </span>
            <span>&nbsp;</span>
          </div>
        </div>
      </a-col>
    </a-row>
    <!--风险信息-->
    <a-row :gutter='[16,16]' class='item-row-content'>
      <RisksNum></RisksNum>
      <RiskSpread></RiskSpread>
      <RiskCalendar></RiskCalendar>
    </a-row>
    <!--  图表信息  -->
    <a-row :gutter='[16,16]'>
      <SafeEvent></SafeEvent>
      <FlowTrend></FlowTrend>
    </a-row>
  </div>
</template>

<script>
import { MODAL_SIZE } from '@/config/uiConfig'
import { systemStatusService } from '@/views/systemStatus/systemStatusService'
import RisksNum from '@/views/systemStatus/components/RisksNum'
import RiskCalendar from '@/views/systemStatus/components/RiskCalendar'
import RiskSpread from '@/views/systemStatus/components/RiskSpread'
import SafeEvent from '@/views/systemStatus/components/SafeEvent'
import FlowTrend from '@/views/systemStatus/components/FlowTrend'
import { resolveTrafficTrend } from '../../utils/util'
import { EVENT_BUS_TYPES } from '@/utils/bus'

const SYSTEM_STATUS_EVENT_NAME = {
  'safeEventNum': '安全事件总数',
  'flowNum': '审计流量总数',
  'cpu': 'cpu使用率',
  'memory': '内存使用率',
  'disk': '磁盘使用率'
}
const SYSTEM_EVENT_NAME = ['safeEventNum', 'flowNum', 'cpu', 'memory', 'disk']
const FLOW_NUM = 'flowNum'
const CONNECT_TYPE = {
  IDLE: 'idle',//未连接
  CONNECTED: 'connected' //已连接
}
export default {
  name: 'systemStatus',
  components: {
    RisksNum,
    RiskCalendar,
    RiskSpread,
    SafeEvent,
    FlowTrend
  },
  data() {
    return {
      SYSTEM_STATUS_EVENT_NAME: SYSTEM_STATUS_EVENT_NAME,
      SYSTEM_EVENT_NAME: SYSTEM_EVENT_NAME,
      FLOW_NUM: FLOW_NUM,
      systemStatusEventType: {
        'safeEventNum': '0',
        'flowNum': '0',
        'cpu': '0',
        'memory': '0',
        'disk': '0'
      },
      wifiInfo: {
        connect: '',
        signal: '',
        className: 'no',
        isConnected: false
      }
    }
  },
  created() {
    this.initData()
  },
  mounted() {
    window.onresize=()=>{
      this.$eventBus.$emit(EVENT_BUS_TYPES.ON_RESIZE)
    }
  },
  methods: {
    resolveTrafficTrend(data) {
      return resolveTrafficTrend(data)
    },
    initData() {
      //  获取安全事件总数
      systemStatusService.getSafeInfoTimeCount().then((res) => {
        let { count } = res
        this.systemStatusEventType[SYSTEM_EVENT_NAME[0]] = count
      })
      //  获取流量总数
      systemStatusService.getFlowCount().then(res => {
        let { count } = res
        this.systemStatusEventType[SYSTEM_EVENT_NAME[1]] = count
      })
      //设备状态
      systemStatusService.getDeviceInfo().then(res => {
        for (let key in res) {
          this.systemStatusEventType[key] = Math.round(res[key] * 1) + '%'
        }
      })
      //  获取4G状态信息
      systemStatusService.query4GInfo().then(res => {
        let {
          connect,
          operator,
          signal
        } = res

        if (connect == CONNECT_TYPE['IDLE']) {
          this.wifiInfo.signal = '未连接'
          this.wifiInfo.className = 'no'
          this.wifiInfo.isConnected = false
        } else {
          this.wifiInfo.isConnected = true
          if (0 < signal && signal < 13) {
            this.wifiInfo.signal = '弱'
            this.wifiInfo.className = 'week'
          } else if (13 <= signal && signal < 23) {
            this.wifiInfo.signal = '中'
            this.wifiInfo.className = 'mid'
          } else if (23 <= signal && signal <= 31) {
            this.wifiInfo.signal = '强'
            this.wifiInfo.className = 'strong'
          }
        }


        //     "connect": "xxxx",（idle/connected）
        // "signal": "xxxx",（范围：0~31，1~13弱，13~23中，23~31强）
        // "operator": "xxxx" （"mobile"/"unicom"/"telecom"）
      })
    }
  },
  computed: {}
}
</script>

<style lang='less' scoped>

.wifi {
  position: relative;

  &::before {
    position: absolute;
    top: 7px;
    left: 0;
    width: 32px;
    height: 29px;
    background: url('../../assets/images/system_status.png') no-repeat;
    content: '';
  }

  &.no::before {
    background-position: -276px -2px;
  }

  &.week::before {
    background-position: -336px -2px;
  }

  &.mid::before {
    background-position: -366px -2px;
  }

  &.strong::before {
    background-position: -396px -2px;
  }

  .status {
    margin-left: 36px;
    font-size: 14px;
  }

  .connected {
    color: #3e85e1;
  }

  .idle {
    color: #ff4800;
  }
}

.tw-relative {
  &:nth-of-type(1) .gutter-row::before {
    width: 41px;
    height: 46px;
    background-position: -2px -2px;
  }

  &:nth-of-type(2) .gutter-row::before {
    width: 45px;
    height: 46px;
    background-position: -44px -2px;
  }

  &:nth-of-type(3) .gutter-row::before {
    width: 45px;
    height: 46px;
    background-position: -92px -2px;
  }

  &:nth-of-type(4) .gutter-row::before {
    width: 46px;
    height: 44px;
    background-position: -138px -2px;
  }

  &:nth-of-type(5) .gutter-row::before {
    width: 46px;
    height: 44px;
    background-position: -184px -2px;
  }

  &:nth-of-type(6) .gutter-row::before {
    width: 46px;
    height: 44px;
    background-position: -230px -2px;
  }
}

.gutter-row {
  &::before {
    position: absolute;
    left: 16px;
    background: url('../../assets/images/system_status.png') 0 0 no-repeat;
    content: '';
  }
}

.item-row-content {
  ::v-deep {
    .ant-card {
      .ant-card-body {
        height: 312px !important;
      }
    }
  }
}
</style>
