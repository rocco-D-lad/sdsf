import React, { useEffect, useState, useRef, useCallback } from 'react'
import './index.scss'
import { api } from '../../../../api/config'
import axios from 'axios'
import { request, hooks, utils, Api } from 'tuyang-shared'
import PatrolsRouteServiceClass from './PatrolsRouteServiceClass'
import { message, Row, Space, Tabs } from 'antd'
// import {useDispatch, useSelector} from 'react-redux';
import {selectLeftPanelVisible, setLeftPanelVisible} from "../../../../app/appSlice";
import * as turf from '@turf/turf'
let kxArr = []

/**
 * @type {PatrolsRouteServiceClass}
 */
let PatrolsRouteService

// let patrolLineApi;
let patrolLock = new utils.Lock()
let waitTime = 5
// let api = new Api();

let areaModelList = []
/**
 * @class PatrolEnum
 * @description 视频巡逻状态枚举
 * @example
 * PatrolEnum.START
 */
class PatrolEnum {
  /**
   * 巡逻开始
   * @type {number}
   */
  static START = 'START'
  /**
   * 巡逻暂停
   * @type {number}
   */
  static PAUSE = 'PAUSE'
  /**
   * 停止
   * @type {number}
   */
  static STOP = 'STOP'
  /**
   * 停止等待视频加载
   * @type {number}
   */
  static PAUSE_FOR_WAIT = 'PAUSE_FOR_WAIT'

  static PATROLS_LINE = 'PATROLS_LINE'

  static PATROLS_HISTORY = 'PATROLS_HISTORY'
}
const Xunluo = () => {
  /**
   * 视频巡逻状态
   * @type {PatrolEnum}
   */
  const [xlState, setXLState, xlStateRef] = hooks.useStateAndRef(
    PatrolEnum.STOP
  )
  const [xlCurr, setXLCurr, xlCurrRef] = hooks.useStateAndRef(null)
  const [lineList, setLineList, lineListRef] = hooks.useStateAndRef([])
  const [speed, setSpeed] = useState(10)
  const [linePitch, setLinePitch] = useState(10)
  const [lineDistance, setLineDistance] = useState(1000)
  const [lineVisible, setLineVisible] = useState(true)
  const [videoAreaVisible, setVideoAreaVisible] = useState(false)
  const [videoPosVisible, setVideoPosVisible] = useState(false)
  const [status, setStatus] = useState(false)
  const [state, setState] = useState(true)
  const { run: getPatrolsList, cancel: getPatrolsListCancel } =
    hooks.useRequest()
  const { run: getPatrolsHistoryList, cancel: getPatrolsHistoryListCancel } =
    hooks.useRequest()
  const { run: fetchAddPatrolsHistory, cancel: fetchAddPatrolsHistoryCancel } =
    hooks.useRequest()
  const {
    run: fetchUpdatePatrolsHistory,
    cancel: fetchUpdatePatrolsHistoryCancel
  } = hooks.useRequest()
  /**
   * 是否循环播放
   */
  const [isLineLoop, setIsLineLoop] = useState(false)
  /**
   * 是否循环间隔
   */
  const [loopIntervalSecond, setLoopIntervalSecond] = useState(3)
  // 巡逻路线和巡逻记录的切换
  const [patrolModel, setPatrolModel] = useState(PatrolEnum.PATROLS_LINE)
  const [historyDetailVisible, setHistoryDetailVisible] = useState(false)
  const [historyDetailItem, setHistoryDetailItem] = useState({})

  // const [apiReady, setApiReady] = useState(false);
  const [patrolHistoryList, setPatrolHistoryList] = useState([])
  const [patrolbtnshow, setpatrolbtnshow] = useState(false) //巡更开始结束按钮
  const [errorReportVisible, setErrorReportVisible] = useState(false);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (window.$viewer) {
      ;(async () => {
        PatrolsRouteService = new PatrolsRouteServiceClass(window.$viewer)
        await getLinePatrol()

        await getPatrolHistory()
      })()
    }
  }, [])

  const [historyErrReportObj, setHistoryErrReportObj] = useState({
    name: "",
    detail: "",
    image: "",
    insert_time: "",
    update_time: "",
  })
  /**
   * 从数据库中取出巡检历史
   */
  const getPatrolHistory = async () => {
    // 请求中获取巡逻历史记录
    // console.log('api.patrolLineHistory', api.patrolLineHistory)
    let history = (await getPatrolsHistoryList(api.patrolLineHistory.list()))
      .data
    // console.log('获取数据库中的历史记录', history)
    if (history) {
      for (const h of history) {
        let line = lineListRef.current.find((x) => x.id === h.line_id)
        if (line) {
          h.line_name = line.line_name
        } else {
          h.line_name = h.line_id
        }
      }
      setPatrolHistoryList(history)
      return history
    }
    return []
  }

  // 存储巡逻记录
  const addPatrolHistory = async (item) => {
    const now = new Date()
    const beginTime = now.toISOString().split('.')[0].replace('T', ' ')
    const historyList = await getPatrolHistory()
    let itemAdd = {
      line_id: item.id,
      error_list: [],
      start_time: beginTime
    }
    let historyAdd = (
      await fetchAddPatrolsHistory(api.patrolLineHistory.create([itemAdd]))
    ).data
    setHistoryDetailItem(historyAdd[0]) // 设置当前的historyDetailItem
    message.success('添加成功')
    // console.log('添加成功', historyAdd)
  }
  /**
   * 停止函数Ref
   */
  const patrolStopFuncRef = useRef(() => {})

  /**
   * 视频巡逻Ref
   */
  const patrolFuncRef = useRef(() => {})

  /**
   * 获取面内的相机
   * @param cameras
   * @param location
   * @returns {}
   */
  function getInPolygonCamera(
    cameras = [
      {
        options: { location: {} },
        camera_area: { points: [] }
      }
    ],
    location
  ) {
    let res = []
    let pt = turf.point([location.x, location.y])
    let poly
    let polygonArr
    for (const camera of cameras) {
      polygonArr = camera.camera_area.points.map((x) => {
        return [x.x, x.y]
      })
      // console.log([location.x, location.y], [...polygonArr, polygonArr[0]]);
      poly = turf.polygon([[...polygonArr, polygonArr[0]]])
      let isIn = turf.booleanPointInPolygon(pt, poly)
      if (isIn) {
        //点是否在面中
        res.push(camera)
      }
    }
    return res
  }
  /**
   * 继续巡逻
   * @param cb
   * @returns {Promise<void>}
   */
  const resumeRoute = async (cb) => {
    await window.$viewer.drawer.resumeRoute(cb)
    setXLState(PatrolEnum.START)
    // console.log('xlStateRef.current', xlStateRef.current)
  }
  /**
   * 播放那个视频的标记
   * @param code
   * @returns {Promise<void>}
   */
  const createVideoFlag = async (code) => {
    // // 获取model
    // let mo = modelService.searchByCode(code)
    // await clearVideoFlag();
    // await mapService.overLayerCreateObject(window.$map_light, {
    //   'gid': 'ROUTE_FLAG',
    //   'type': 'cone',
    //   'radius': 50,
    //   'height': 60,
    //   'style': 'SplineOrangeHighlight1',
    //   location: {
    //     ...mo.location,
    //     pitch: 180,
    //     z: mo.location.z + 300
    //   }
    // }, false); // 播放路径巡游时, 不能调用
  }

  /**
   * 遇到可视区域的停止方法
   * @returns {Promise<void>}
   */
  const pauseRouteForWait = async () => {
    setXLState(PatrolEnum.PAUSE_FOR_WAIT)
    // console.log('xlStateRef.current', xlStateRef.current)
    await window.$viewer.drawer.pauseRoute()
  }
  /**
   * 移除当前位置
   * @returns {Promise<void>}
   */
  const removePosNow = async () => {
    if (!videoPosVisible) {
      return
    }
    await window.$viewer.drawer.overLayerRemoveObjectById('VIDEO_ROUTE_POS')
  }
  /**
   * 绘制当前位置
   * @param pos
   * @returns {Promise<void>}
   */
  const drawPosNow = async (pos) => {
    if (!videoPosVisible) {
      return
    }
    await removePosNow()
    await window.$viewer.drawer.overLayerCreateObject({
      gid: 'VIDEO_ROUTE_POS',
      type: 'box',
      location: pos
    })
  }
  const patrolPauseFuncRef = useRef((e) => {
    // console.log('1111111')
    setXLState(PatrolEnum.PAUSE)
  })
  /**
   * 移除可视区域
   * @returns {Promise<void>}
   */
  const removeVideoArea = async () => {
    if (!videoAreaVisible) {
      return
    }
    let size = 100
    for (let i = 0; i < areaModelList.length; i += size) {
      let mos = areaModelList.slice(i, i + size)
      // console.log(
      //   '删除可视区域',
      //   mos.map((x) => x.gid)
      // )
      await window.$viewer.drawer.overLayerRemoveObjectsById(
        mos.map((x) => x.gid)
      )
    }
  }
  /**
   * // 结束巡逻
   * @returns {Promise<void>}
   */
  const stopRoute = async () => {
    await window.$viewer.drawer.stopRoute()

    setXLState(PatrolEnum.STOP)

    await patrolStopFuncRef.current()

    // 添加地图移动事件监听
    document
      .getElementById(window.$viewer.config.id)
      .getElementsByTagName('video')[0]
      .removeEventListener('mousedown', patrolPauseFuncRef.current)

    await removeVideoArea()
    await removePosNow()

    window.$viewer.core.clear()
    // stopPlay();
  }
  /**
   * 获取巡逻路线
   */
  const getLinePatrol = async () => {
    // debugger
    // console.log('请求路线', api)
    const res = await Promise.all([
      axios.post(`${api.baseURL}/patrol/line/list`, [])
    ])
    // debugger
    if (res[0].data.code === 0) {
      // console.log('请求路线', res[0].data.data)
      setLineList(res[0].data.data)
      let x = res[0].data.data
      let cameracode = []
      if (x.length > 1) {
        x.map((el, index) => {
          if (el.cameras) {
            el.cameras.map((el, index) => {
              return cameracode.push(el.camera_code)
            })
          } else {
            return
          }
        })
      }
      // console.log(cameracode, 'cameracode')
      let cameraCodelist = await axios({
        url: `${api.baseURL}/device/camera/list/codes`,
        method: 'POST',
        data: cameracode
      })
      // console.log(cameraCodelist.data.data, 'cameracode')
      let merged = []
      x.cameras?.forEach((item1) => {
        cameraCodelist.data.data.forEach((item2) => {
          if (item1.id === item2.id) {
            let mergedItem = {
              ...item1,
              camera_area: { ip: item2.ip, port: item2.port }
            }
            merged.push(mergedItem)
            return
          }
        })
      })
      let endingData = { ...x, cameras: merged }
      // console.log(endingData, 'merged')
    }
  }
   /**
   * 显示运行时界面
   */
   const showRuntimeLeft = () => {
    // let item = document.createElement('div');
    // item.id = 'patrolsRuntime';
    // document.body.append(item);

    // dispatch(setLeftPanelVisible(false));

  }
  /*查看按钮点击事件*/
  const PatrolClick = async (x, i) => {
    // console.log(x, i, '点击的信息')
    setStatus((status) => !status)

    setpatrolbtnshow(true)
    if (xlStateRef.current === PatrolEnum.STOP) {
      // 没有巡逻
      // 添加元素
      await startXL(i)
      // await onPlayRouteEnd();
    } else {
      // 正在巡逻
      patrolStopFuncRef.current()
    }
    // 巡逻结束后的动作
    await stopRoute()
  }
  /**
   * 播放巡逻路线
   * @param cb
   * @returns {Promise<void>}
   */
  const playRoute = async (cb) => {
    setXLState(PatrolEnum.START)
    // 加延迟
    await new Promise((resolve) => {
      window.$viewer.drawer.playRoute(cb)
      setTimeout(() => {
        resolve()
      }, 100)
    })

    // 添加地图移动事件监听
    document
      .getElementById(window.$viewer.config.id)
      .getElementsByTagName('video')[0]
      .addEventListener('mousedown', patrolPauseFuncRef.current)
  }
  /**
   * 循环巡逻, 点击按钮, 开始巡检
   * @param line
   * @returns {Promise<unknown>}
   */
  const startXL = useCallback(
    async (idx) => {
      // console.log(idx, 'idx')
      let isLineLoopInner = true // 退出时使用内部变量, 不影响外部变量
      let idxTmp = idx
      setXLState(PatrolEnum.START)
      // while (isLineLoop && isLineLoopInner) {
      //
      while (xlStateRef.current === PatrolEnum.START) {
        let line = getLineNext(idxTmp)
        // console.log(line, 'line')
        setXLCurr(line)
        // // 添加巡逻历史记录
        // await addPatrolHistory(line);

        let cameraData = line.cameras
        idxTmp++

        cameraData = Array.from(new Set(cameraData))
        // console.log('视频编码去重', cameraData)

        if (line.points && line.points.length === 0) {
          console.warn('路线的点数组为空')
          continue
        }

        // 抬高z
        line.points.forEach((x) => {
          x.z += 20
        })

        // 先分层, 再创建轨迹
        if (line.ground_id) {
          await window.$viewer.build.mgr.showFloorUndergroundByUnderId(
            window.$viewer,
            line.ground_id
          )
          await window.$viewer.scene.service.sceneBuildService.setFloorListUndergroundVisibleEvent.triggerAll(
            window.$viewer,
            true
          )
        } else if (line.indoor === true) {
          await window.$viewer.build.mgr.splitAndShowFloor(
            window.$viewer,
            line.build_id,
            line.floor_id
          )
        } else {
          // 室外
          await window.$viewer.build.mgr.setUndergroundVisible(
            window.$viewer,
            false
          )
          await window.$viewer.build.mgr.resetAllBuildingWrap(window.$viewer)
        }

        // console.log('创建路线的数据', line.points)
        await new Promise((resolve) => {
          window.$viewer.drawer.createRoute(
            {
              gid: 'TMP_ROUTE',
              style: 'sim_arraw_Cyan',
              width: 200,
              speed: speed * 100,
              pitch: linePitch,
              distance: lineDistance,
              geom: line.points,
              visible: lineVisible
            },
            false
          )

          setTimeout(() => {
            resolve()
          }, 100)
        })

        let cameraCurr
        let cameraLast
        let showDataPointIdx = 0 // 当前拐点索引
        let showDataPoint = line.points[0] // 当前拐点位置

        // 绘制可视区域
        await drawVideoArea(line.cameras)

        // 创建图层
        let routeObj = PatrolsRouteService.getRouteObj()
        routeObj.shapes[0].location = showDataPoint
        routeObj.speed = speed * 100
        await PatrolsRouteService.setAndRemoveAndLoadRouteObj(routeObj)

        // 播放路线
        await new Promise((resolve) => {
          patrolStopFuncRef.current = async () => {
            isLineLoopInner = false
            await PatrolsRouteService.removeRouteObj()
            resolve({ cancel: true })
          }
          patrolFuncRef.current = async (msg) => {
            if (xlStateRef.current !== PatrolEnum.START) {
              return
            }
            await patrolLock.lock()
            if (msg && msg.x && showDataPoint) {
              // 没有到达终点
              cameraCurr = getInPolygonCamera(cameraData, msg)[0]
              // 如果和上一个视频不同
              if (cameraCurr && cameraLast !== cameraCurr) {
                cameraLast = cameraCurr
                // 创建设备标注
                await createVideoFlag(cameraCurr.camera_code)
                // onPreview(cameraCurr); // 上传视频对象,播放视频
                // console.log(cameraCurr, 'cameraCurr')

                // {
                //   "id": "55377242F02EBB4D85E85CD02162B563",
                //   "camera_code": "1009998$1$0$37",
                //   "camera_name": "七号楼营养食堂门口球机",
                // }
                const cameraCurrItem = {
                  detail_info: {
                    ...cameraCurr,
                    cameraIndexCode: cameraCurr.camera_code,
                    cameraName: cameraCurr.camera_name
                  }
                }
                // console.log(cameraCurrItem, ' cameraCurrItem ')
                //真实的视频
                // videoPlay(cameraCurrItem, "playVideo", ((msg) => {
                //   let timestamp = Date.parse(new Date()) + "video";
                //   dispatch(changeIsvideo(timestamp))
                // }))

                // 播放后等待10s
                await pauseRouteForWait()
                await new Promise((resolveTimeout) => {
                  setTimeout(() => {
                    if (xlStateRef.current === PatrolEnum.PAUSE_FOR_WAIT) {
                      resumeRoute(patrolFuncRef.current)
                    }
                    resolveTimeout()
                  }, (waitTime || 10) * 1000)
                })
              }

              // 绘制当前位置
              // window.$mapInstance.drawer.overLayerCreateObject({
              //   type: 'box',
              //   location: msg
              // }, false);
              // console.log('distance', showDataPoint, msg, utils.getDistance(showDataPoint, msg));

              // 绘制是否到拐点
              // console.log('判断是否到拐点', showDataPoint, msg)

              // 获取当前路线
              let routeObj = PatrolsRouteService.getRouteObj()
              // 更新路线图层的位置
              routeObj.shapes[0].location = msg
              if (xlStateRef.current === PatrolEnum.START) {
                await PatrolsRouteService.setAndReloadRouteObj(routeObj)
              }

              await drawPosNow(msg)
              if (
                utils.getDistance(showDataPoint, msg) <
                Number(speed * 100) / 3
              ) {
                showDataPointIdx++
                showDataPoint = line.points[showDataPointIdx]
                // console.log('showDataPoint', showDataPoint)
              }
              // 到达最终点
              if (!showDataPoint) {
                resolve()
              }
            }

            await patrolLock.unlock()
          }

          playRoute(patrolFuncRef.current)
        })
      }
    },
    [speed, isLineLoop, lineVisible, linePitch, lineDistance]
  )

  /**
   * 获取吓一跳路线
   * @param idx
   * @returns {*}
   */
  const getLineNext = (idx) => {
    return lineListRef.current[idx % lineListRef.current.length]
  }

  /**
   * 绘制可视区域
   */
  const drawVideoArea = async (cameras) => {
    if (!videoAreaVisible) {
      return
    }
    let size = 100
    for (let i = 0; i < cameras.length; i += size) {
      let mos = cameras.slice(i, i + size).map((x) => x.camera_area)
      mos.forEach((x, i) => {
        x.gid = `VIDEO_AREA_${i}`
      })
      // console.log('创建可视区域', mos)
      areaModelList.push(...mos)
      await window.$viewer.drawer.overLayerCreateObjects(mos)
    }
  }
  return (
    <div className="round-left-bottom">
      <p className="round-left-imgs">
        <p className="round-left-font">视频巡逻</p>
      </p>
      <div className="round-Controls">
        <div className="Controls-header">
          <p className="Controls-Serial">序号</p>
          <p className="Controls-route">路线</p>
          <p className="Controls-Controls">操作</p>
        </div>
        <div className="rounds-inspect">
          {lineList &&
            lineList.map((ite, index) => {
              return (
                <div className="inspect-one">
                  <p className="img"></p>
                  <p className="Controls-Seriall">{index + 1}</p>
                  <p className="Controls-routel">{ite.line_name}</p>
                  <p
                    className="Controls-Controlss"
                    onClick={() => {
                      PatrolClick(ite, index)
                    }}
                  >
                    {xlStateRef.current !== PatrolEnum.STOP &&
                    xlCurr?.id === ite.id
                      ? '结束'
                      : '查看'}
                  </p>
                </div>
                // <div key={index} className="patroltest">
                //   <span>{ite.line_name}</span>
                //   <span
                //     onClick={() => {
                //       PatrolClick(ite, index)
                //     }}
                //   >
                //           {xlStateRef.current !== PatrolEnum.STOP &&
                //           xlCurr?.id === ite.id
                //             ? '结束'
                //             : '查看'}
                //         </span>
                // </div>
              )
            })}
        </div>
        <div id={status ? 'btn_box' : 'btn_box_none'}>
          {state ? (
            <div
              onClick={() => {
                setState(false)
              }}
            >
              暂停
            </div>
          ) : (
            <div
              onClick={() => {
                setState(true)
              }}
            >
              继续
            </div>
          )}

          <div
            onClick={() => {
              PatrolClick(status)
            }}
          >
            退出
          </div>
        </div>
        {errorReportVisible ? (
          <div className={'patrols_runtime_content'}>
            <div className={'runtime_content_title'}>
              <div className={'runtime_content_title_circle'} />
              <span>相机名称</span>
              <div
                className={'runtime_content_title_close'}
                onClick={(e) => {
                  setErrorReportVisible(false)
                }}
              />
            </div>
            <div className={'runtime_content_title_line'}></div>
            <div className={'runtime_content_body'}>
              <div className={'runtime_content_line'}>
                <span>常见问题</span>
                <input
                  value={historyErrReportObj.name}
                  onChange={(e) => {
                    historyErrReportObj.name = e.target.value
                    setHistoryErrReportObj({ ...historyErrReportObj })
                  }}
                />
              </div>
              <div className={'runtime_content_line'}>
                <span>详情信息</span>
                <textarea
                  value={historyErrReportObj.detail}
                  onChange={(e) => {
                    historyErrReportObj.detail = e.target.value
                    setHistoryErrReportObj({ ...historyErrReportObj })
                  }}
                />
              </div>
              <div className={'runtime_content_line'}>
                <span>上传文件</span>
                <div className={'line_file_container'}>
                  <div className={'line_file'} onClick={(e) => {}}>
                    <div className={'line_file_img'} />
                    <span>点击上传</span>
                  </div>
                </div>
              </div>
              <div className={'runtime_content_line'}>
                <button
                  onClick={async (e) => {
                    // 保存数据
                    console.log('保存数据')
                    // 更新到errorList
                    if (!historyDetailItem.error_list) {
                      historyDetailItem.error_list = []
                    }
                    historyDetailItem.error_list.push(historyErrReportObj) // 上传报警

                    let res = await fetchUpdatePatrolsHistory(
                      api.patrolLineHistory.update(historyDetailItem)
                    )

                    console.log('添加异常数据成功', res)
                    setHistoryDetailItem({ ...res })

                    // dispatch(setLeftPanelVisible(true))
                    patrolStopFuncRef.current() // 结束巡逻
                  }}
                >
                  保存信息
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
export default Xunluo
