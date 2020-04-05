const height = null
const node = null
const fun = null

const addCSS = function(cssText) {
  const style = document.createElement('style') // 创建一个style元素
  const head = document.head || document.getElementsByTagName('head')[0] // 获取head元素
  style.type = 'text/css' // 这里必须显示设置style元素的type属性为text/css，否则在ie中不起作用
  if (style.styleSheet) { // IE
    var func = function() {
      try { // 防止IE中stylesheet数量超过限制而发生错误
        style.styleSheet.cssText = cssText
      } catch (e) {
        console.log(e)
      }
    }
    // 如果当前styleSheet还不能用，则放到异步中则行
    if (style.styleSheet.disabled) {
      setTimeout(func, 10)
    } else {
      func()
    }
  } else { // w3c
    // w3c浏览器中只要创建文本节点插入到style元素中就行了
    var textNode = document.createTextNode(cssText)
    style.appendChild(textNode)
  }
  head.appendChild(style) // 把创建的style元素插入到head中
}

export default {
  height, // 滚动节点的高度
  node, // 滚动节点
  fun, // 滚动方法
  addCSS// 添加CSS动画
}
