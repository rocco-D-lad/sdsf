/**
 * @Author: yangqixin
 * @TIME: 2021/12/14 15:03
 * @FILE: server.js
 * @Email: 958292256@qq.com
 * @Description:
 */
import { utils } from 'tuyang-shared'

const EventBus = utils.EventBus

// 订阅来自主页面的消息
function messageControllerFactory() {
  let messageHandler = () => null
  let obj = null
  return function () {
    return obj
      ? obj
      : (obj = {
          origin: '',
          subscribe: (origin) => {
            if (origin) {
              obj.origin = origin
            }
            messageHandler = (res) => {
              // if (res.origin !== origin) {
              //   return;
              // }
              console.log('接收到主页面的消息: ', res)

              let resData = res.data
              if (typeof resData === 'string') {
                try {
                  resData = JSON.parse(resData)
                } catch (e) {
                  console.error('消息格式中包含了无法解析的JSON错误！')
                }
              }
              const { type, payload } = resData
              console.log('origin type: ', type)
              console.log(
                'Hex type: ',
                typeof type === 'string' ? type : '0x' + type?.toString(16)
              )
              console.log('payload: ', payload)

              switch (Number(type)) {
                // test - 场景初始化
                case 0x00000000:
                  EventBus.dispatch('scene_init', payload)
                  break

                //
                case 0x00000001:
                  break

                // 主页场景切换
                case 0x10000000:
                  EventBus.dispatch('scene_change', payload)
                  break

                // 主页 tab 切换
                case 0x10000001:
                  EventBus.dispatch('scene_tab_change', payload)
                  break

                case 0x10000002:
                  EventBus.dispatch('trajectory_show', payload)
                  break

                case 0x10000004:
                  EventBus.dispatch('trajectory_clear', payload)
                  break
                default:
              }
            }
            window.addEventListener('message', messageHandler)
          },

          destroy: () => {
            window.removeEventListener('message', messageHandler)
          },

          /**
           * 三维页与主页面的通信
           * @param type
           * @param payload
           */
          dispatch: ({ type, payload }) => {
            const parentWindow = window.parent
            if (parentWindow) {
              const data = {
                type,
                payload
              }

              const jsonData = JSON.stringify(data)
              console.log('发往主页面的message: ', data)
              parentWindow?.postMessage(jsonData, obj.origin)
            } else {
              console.error('parent window not found!!!')
            }
          }
        })
  }
}

function fakePostMessage(type, payload, stringify = false) {
  let message = {
    type,
    payload
  }
  if (stringify) {
    message = JSON.stringify(message)
  }
  window.postMessage(message, '*')
}

window.dispatch = {
  sceneInit: () => {
    fakePostMessage(0x10000000, {
      scene: 3,
      page: 1,
      tab: 3
    })
  },

  // tab 切换
  changeTab: (tab) => {
    fakePostMessage(0x10000001, {
      scene: 3,
      page: 1,
      tab
    })
  },

  sceneChange: (page) => {
    fakePostMessage(0x10000000, {
      scene: 3,
      page
    })
  },

  faceShow: (payload = {}) => {
    fakePostMessage(0x10000002, payload)
  },

  faceClear: () => {
    fakePostMessage(0x10000004)
  }
}

export const messageCreator = messageControllerFactory()
