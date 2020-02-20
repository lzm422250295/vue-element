/**
 * @param {*} res
 * @param {String} name
 */
export function exportExecl(res, name) {
  const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')

  if (isIE()) {
    window.navigator.msSaveOrOpenBlob(blob, name)
    return
  }
  link.style.display = 'none'
  link.href = url
  link.download = name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(blob) // 释放掉blob对象
}
function isIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  } else {
    return false
  }
}
