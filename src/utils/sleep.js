/**
 * 延时等待
 * @param time 毫秒数
 * @returns {Promise<unknown>}
 */
export default function (time){
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}
