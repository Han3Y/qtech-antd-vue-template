/**
 * 校验提示语
 */
export const VALIDATOR_MSG = {
  must_required: '必填项',
  required: '请输入',
  requiredSelect: '请选择',
  name: '输入不合法',
  int: '请输入整数',
  ip: '请输入正确IP',
  ip_scope: '请输入正确IP范围',
  net_mask: '请输入正确子网掩码',
  port: '请输入正确端口',
  port_scope: '请输入正确端口范围',
  mac: '请输入正确MAC地址',
  password: '长度至少8位，需含有数字、字母、特殊字符',
  same_password: '两次输入的密码不同',
  range: '请输入范围内数值',
  password_red: '8-16位,只能用数字、小写字母、大写字母、特殊字符两种及以上组合',
  required_pwd: '请输入密码',
  hex: '请输入正确的十六进制数',
  phone: '请输入正确手机号',
  time_day_scope: '时间范围必须大于180天'

}

/**
 * 名称校验
 */
export const NAME_PATTERN = /^[\u4e00-\u9fa5_a-zA-Z0-9-_+]+$/

/**
 * 手机号校验
 */
export const PHONE_PATTERN = /^1(3[0-9]|4[579]|5[0-35-9]|6[6]|7[0135-8]|8[0-9]|9[89])\d{8}$/

/**
 * 密码强度
 */
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&*_])[0-9a-zA-Z!@#$%^&*_+\(\)]{8,16}$/


/**
 * 整数校验
 */
export const INT_VALIDATOR = (rule, value, callback) => {
  if (value !== 0 && !value) {
    callback()
  }
  const pass = /^\d+$/.test(value)
  if (!pass) {
    callback(new Error(VALIDATOR_MSG.int))
  } else {
    callback()
  }
}


/**
 * 最大值校验
 *  */
export const MAX_VALIDATOR = (value, callback) => {
  if (!value) {
    callback(new Error(VALIDATOR_MSG.name))
  }
}
/**
 * MAC地址校验
 * */
export const MAC_VALIDATOR = (rule, value, callback) => {
  const pass = /([a-f0-9]{2}:){5}[a-f0-9]{2}/gi.test(value)
  // const pass = /(([a-f0-9]{2}:)|([a-f0-9]{2}-)){5}[a-f0-9]{2}/gi.test(control.value);
  if (!pass) {
    callback(new Error(VALIDATOR_MSG.mac))
  } else {
    callback()
  }
}
/**
 * IP校验
 */
export const IP_VALIDATOR = (rule, value, callback) => {
  /**
   * 掩码校验
   * */
  function CheckIP(value) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      value
    )
  }

  function finalIsZero(value) {
    var ary = value.split('.')
    if (ary[0] == 127) {
      return false
    }
    if (ary[0] < 127 && ary[0] > 0) {
      if (ary[3] == 0 || (ary[1] == 255 && ary[2] == 255 && ary[3] == 255)) {
        return false
      }
      return true
    } else if (ary[0] < 192) {
      if (ary[3] == 0 || (ary[2] == 255 && ary[3] == 255)) {
        return false
      }
      return true
    } else if (ary[0] < 224) {
      if (ary[3] == 0 || ary[3] == 255) {
        return false
      }
      return true
    } else {
      return false
    }
  }

  if (value !== 0 && !value) {
    callback()
  }
  const pass = CheckIP(value) && finalIsZero(value)
  if (!pass) {
    callback(new Error(VALIDATOR_MSG.ip))
  } else {
    callback()
  }
}

/**
 * ip范围校验
 * @param
 */
export const IP_SCOPE_VALIDATOR = (rule, value, callback) => {
  const regIps = /^(((25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9])\.){3}(25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|[0-9]))$/ //判断IP地址是否合法
  const regNum = /^([\d-_+]*)$/

  function checkNetSegmentType(val) {
    let type
    if (val.indexOf('/') > -1) {
      type = 'mask'
    } else if (val.indexOf('-') > -1) {
      type = 'range'
    } else if (val.indexOf(';') > -1) {
      type = 'multi'
    } else {
      type = 'single'
    }
    return type
  }

  function judegNumber(num) {
    if (regNum.test(num) && 0 < num && num < 33 && num != 31) {
      return true
    }
    return false
  }

  function judgeIP(val) {
    function checkIpA(value) {
      const a = value.split('.')
      if (a[1] == 255 && a[2] == 255 && (a[3] == 255 || a[3] == 0)) {
        return false
      }
      return true
    }

    function checkIpB(value) {
      const a = value.split('.')
      if (a[2] == 255 && (a[3] == 255 || a[3] == 0)) {
        return false
      }
      return true
    }

    function checkIpC(value) {
      const a = value.split('.')
      if (a[3] == 255 || a[3] == 0) {
        return false
      }
      return true
    }

    if (!regIps.test(val)) {
      return false
    }
    const ary = val.split('.')
    let returnValue
    if (0 < ary[0] && ary[0] < 127) {
      returnValue = checkIpA(val)
    } else if (127 < ary[0] && ary[0] < 192) {
      returnValue = checkIpB(val)
    } else if (191 < ary[0] && ary[0] < 224) {
      returnValue = checkIpC(val)
    } else {
      returnValue = false
    }
    return returnValue
  }


  function compareNumber(a, b) {
    const aa = a.split('.')
    const bb = b.split('.')
    return parseInt(aa[3]) < parseInt(bb[3]) || aa[3] == bb[3]
  }

  const netSegmentType = checkNetSegmentType(value)
  let netSegmentFormat = false
  let ary = []

  switch (netSegmentType) {
    case 'mask':
      ary = value.split('/')
      if (ary.length == 2) {
        netSegmentFormat = judgeIP(ary[0]) && judegNumber(ary[1])
      }
      break
    case 'range':
      ary = value.split('-')
      if (ary.length == 2) {
        netSegmentFormat = judgeIP(ary[0]) && judgeIP(ary[1]) && compareNumber(ary[0], ary[1])
      }
      break
    case 'multi':
      ary = value.split(';')
      let status = true
      for (let i = 0; i < ary.length; i++) {
        if (status) {
          status = status && judgeIP(ary[i])
        }
      }
      netSegmentFormat = status
      break
    default:
      netSegmentFormat = judgeIP(value)
      break
  }
  if (value !== 0 && !value) {
    callback()
  }
  if (!netSegmentFormat) {
    callback(new Error(VALIDATOR_MSG.ip))
  } else {
    callback()
  }
}
/**
 * 端口范围校验
 * @param control
 */
export const PORT_SCOPE_VALIDATOR = (rule, value, callback) => {
  // if (!value) {
  //   callback(new Error(VALIDATOR_MSG.port_scope))
  //   return
  // }
  const vals = value.split(';')
  for (let i = 0; i < vals.length; i++) {
    if (vals[i].indexOf('-') > -1) {
      const items = vals[i].split('-')
      if (items.length > 2) {
        callback(new Error(VALIDATOR_MSG.port_scope))
        return  //不能出现2个或者2个以上的-
      }
      for (let j = 0; j < items.length; j++) {
        const result = /(^[1-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/.test(items[j])
        if (!result) {
          callback(new Error(VALIDATOR_MSG.port_scope))
          return
        }
      }
      let items0 = items[0] * 1
      let items1 = items[1] * 1
      if (items0 > items1 || items0 == items1) {
        callback(new Error(VALIDATOR_MSG.port_scope))
        return
      }
    } else {
      const result = /(^[1-9]\d{0,3}$)|(^[1-5]\d{4}$)|(^6[0-4]\d{3}$)|(^65[0-4]\d{2}$)|(^655[0-2]\d$)|(^6553[0-5]$)/.test(vals[i])
      if (!result) {
        callback(new Error(VALIDATOR_MSG.port_scope))
        return
      }
    }
  }
  callback()
}

/**
 * 十六进制校验
 * @param control
 */
export const HEX_VALIDATOR = (rule, val, callback) => {
  let value = val?.toLowerCase()
  if (typeof value === 'undefined') {
    callback(new Error(VALIDATOR_MSG.hex))
  }
  if (!value.startsWith('0x')) {
    callback(new Error(VALIDATOR_MSG.hex))
  } else {
    value = value.substring(2)
    let pass = /^[A-Fa-f0-9]*$/.test(value)
    if (pass) {
      callback()
    }
  }
}

/**
 * 时间范围天数大于180
 * */
export const MIN_DAY_NUM_VALIDATOR = (rule, value, callback) => {
  if (!value) {
    callback(new Error(VALIDATOR_MSG.time_day_scope))
  }
  if (value >= 180) {
    callback()
  } else {
    callback(new Error(VALIDATOR_MSG.time_day_scope))
  }
}
/**
 * IP校验
 * */
export const IP_REGEX_PATTERN = (value) => {
  function CheckIP(value) {
    return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      value
    )
  }

  function finalIsZero(value) {
    var ary = value.split('.')
    if (ary[0] == 127) {
      return false
    }
    if (ary[0] < 127 && ary[0] > 0) {
      if (ary[3] == 0 || (ary[1] == 255 && ary[2] == 255 && ary[3] == 255)) {
        return false
      }
      return true
    } else if (ary[0] < 192) {
      if (ary[3] == 0 || (ary[2] == 255 && ary[3] == 255)) {
        return false
      }
      return true
    } else if (ary[0] < 224) {
      if (ary[3] == 0 || ary[3] == 255) {
        return false
      }
      return true
    } else {
      return false
    }
  }

  return CheckIP(value) && finalIsZero(value)
}

