import Mock from 'mockjs'
import { param2Obj } from '../src/utils'

import user from './user'
import table from './table'
import chart from './chart'
import getRouters from './getRouters'

// 系统
import getTreeData from './system/getTreeData'
import myMsg from './system/myMsg'
import systemUser from './system/systemUser'
import compUser from './system/compUser'
import departmentMage from './system/departmentMage'
import roleMage from './system/roleMage'
import rolePerMage from './system/rolePerMage'
import funMage from './system/funMage'

const mocks = [
  ...user,
  ...table,
  ...getRouters,
  ...chart,
  ...getTreeData,
  ...myMsg,
  ...systemUser,
  ...compUser,
  ...departmentMage,
  ...roleMage,
  ...rolePerMage,
  ...funMage
]

// for front mock
// please use it cautiously, it will redefine XMLHttpRequest,
// which will cause many of your third-party libraries to be invalidated(like progress event).
export function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType
      }
    }
    this.proxy_send(...arguments)
  }

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null
      if (respond instanceof Function) {
        const { body, type, url } = options
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond
      }
      return Mock.mock(result)
    }
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

// for mock server
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`/mock${url}`),
    type: type || 'get',
    response(req, res) {
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
    }
  }
}

export default mocks.map(route => {
  return responseFake(route.url, route.type, route.response)
})
