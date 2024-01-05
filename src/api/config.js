/**
 * @Author: MocYang
 * @Email: 958292256@qq.com
 * @Date: 2022/1/24 10:36
 * @File: config.js
 * @Description 1
 */

import { Api } from 'tuyang-shared'

export const api = new Api()

const init = () => {
  api.config.create({
    // 接口定义的实例如下
    // roomInfo: {
    //   uri: 'dormitorypeopledate/hiddleinfo',
    //   method: 'get'
    // }
  })
}

export default init
