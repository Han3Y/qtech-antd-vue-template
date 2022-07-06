module.exports = {
  purge: [
    './src/**/*.vue'
  ],
  prefix: 'tw-',
  important: true,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '3.25': '0.8125rem',//13px
        '15': '3.75rem',//60px
        '18': '4.5rem',//72px
        '22': '5.5rem',//88px
        '45': '11.25rem',//180px
        '112': '28rem', // 464px
        '120': '30rem', // 480px
        '128': '32rem', // 512px
        '144': '36rem', // 576px
        '160': '40rem', // 640px
        '176': '44rem', // 704px
        '192': '48rem', // 768px
        '208': '52rem', // 832px
        '224': '56rem', // 896px
        '240': '60rem', // 960px
        '256': '64rem' // 1024px
      },
      color: {
        'primary': '#006ebc', // 主色，
        'primary-disable': 'rgba(0,110,188, 0.6)', // 主色-disable状态
      },
      fontSize: {
        '3xl': '0.75rem',//12px
        '3.5xl': '0.875rem',//14px
        '4xl': '1rem',//16px
        '6xl': '1.5rem'//24px
      },
      flex: {
        '0': '1 0 0%'
      },
      minHeight: {
        '14': '3.5rem',//56px
        '37.5': '9.375rem',//150px
        '75': '18.75rem'//300px
      },
      textColor: theme => ({
        ...theme('colors'),
        'title': 'rgba(0,0,0,0.85)',
        'subTitle': '#333333',
        'tips': '#666666',
        'high': '#e30000',
        'medium': '#ef8824',
        'low': '#eaca1b',
        'active': '#219d00',
        'unactive': '#999',
        'alert': '#f48900',//事件处理，警告
        'critical': '#e30000',//事件处理，紧急
        'total': '#006ebc',
        'config': '#999',//端口信息配置
        'iptips': '#ff4800',


      }),
      backgroundColor: theme => ({
        ...theme('colors'),
        'high': '#e30000',
        'medium': '#ef8824',
        'low': '#eaca1b',
        'active': '#219d00',//激活
        'unactive': '#999',//未激活
        'blackbg': '#238DEE',//黑名单
        'ipmacbg': '#1A5ACB',//IP/MAC
        'whitebg': '#13C2DE',//白名单异常
        'cardtitle':'#eee',//Card 的title背景色
      }),
      borderRadius: theme => ({
        'circle': '50%'
      }),
      borderColor: theme => ({
        'high': '#e30000',
        'medium': '#ef8824',
        'low': '#eaca1b',
        'active': 'rgba(33,157,0,.4)',//激活
        'unactive': 'hsla(0,0%,60%,.4)'//未激活
      }),
      maxHeight: theme => ({
        '6.5625': '26.25rem'//420px
      }),
      borderWidth: theme => ({
        '3': '3px'//3px
      }),
      margin: theme => ({
        md: '15px'
      })

    }
  },
  variants: {
    extend: {}
  },
  corePlugins: {
    preflight: false
  },
  plugins: []
}
