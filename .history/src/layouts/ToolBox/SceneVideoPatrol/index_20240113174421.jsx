import { useContext, useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as turf from '@turf/turf';
import { useAtom } from 'jotai';
import { dataPanelShow_atom } from '../../../jotai/store';
import { hooks, utils } from "tuyang-shared";
// import { getApi } from '../../../pages/home';
import { getApi } from '../../../pages/home/index';
import SceneContext from '../sceneContext';
import PatrolsRouteServiceClass from "./PatrolsRouteServiceClass";
import useMapMethods from '../../../utils/mapMethods';
import { message, Space, Button } from 'antd';
import './index.scss'

let PatrolsRouteService;
let areaModelList = [];
let patrolLock = new utils.Lock();
let waitTime = 5;

class PatrolEnum {
  /**
   * 巡逻开始
   * @type {number}
   */
  static START = 'START';
  /**
   * 巡逻暂停
   * @type {number}
   */
  static PAUSE = 'PAUSE';
  /**
   * 停止
   * @type {number}
   */
  static STOP = 'STOP';
  /**
   * 停止等待视频加载
   * @type {number}
   */
  static PAUSE_FOR_WAIT = 'PAUSE_FOR_WAIT';
}

export default function SceneVideoPatrol() {

  const api = getApi()
  const { useRequest } = hooks
  const { run: fetchLocationList } = useRequest()

  const [, setDataPanelShowAtom] = useAtom(dataPanelShow_atom);
  const sceneData = useContext(SceneContext);
  const { resetMapPosition } = useMapMethods()
  const viewer = sceneData.viewer

  const [isLineLoop, setIsLineLoop] = useState(true);
  const [xlState, setXLState, xlStateRef] = hooks.useStateAndRef(PatrolEnum.STOP);
  const [xlCurr, setXLCurr, xlCurrRef] = hooks.useStateAndRef(null);
  const [patrolList, setPatrolList, lineListRef] = hooks.useStateAndRef([]);
  const [speed, setSpeed] = useState(10);
  const [linePitch, setLinePitch] = useState(viewer.config.patrolPitch || 10);
  const [lineDistance, setLineDistance] = useState(viewer.config.patrolDistance || 1000);
  const [lineVisible, setLineVisible] = useState(true);
  const [videoAreaVisible, setVideoAreaVisible] = useState(false);
  const [videoPosVisible, setVideoPosVisible] = useState(false);

  useEffect(() => {
    if (viewer) {
      PatrolsRouteService = new PatrolsRouteServiceClass(viewer);
      getPatrolList();
    }
    return () => {
      exitVideoPatrol()
    };
  }, [viewer]);

  //获取视频巡逻列表
  const getPatrolList = () => {
    fetchLocationList(api.patrols.lineList()).then((res) => {
      if (Number(res.code) === 0) {
        setPatrolList(res.data)
      }
    }).catch((e) => console.error(e));
  }

  const patrolPauseFuncRef = useRef(e => {
    console.log('1111111');
    setXLState(PatrolEnum.PAUSE);
  });

  const playRoute = async (cb) => {
    setXLState(PatrolEnum.START);
    // 加延迟
    await (new Promise(resolve => {
      viewer.drawer.playRoute(cb);
      setTimeout(() => {
        resolve();
      }, 100);
    }));

    // 添加地图移动事件监听
    document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
      .addEventListener('mousedown', patrolPauseFuncRef.current);
  };

  /**
 * 播放那个视频的标记
 * @param code
 * @returns {Promise}
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
  };

  /**
 * 获取面内的相机
 * @param cameras
 * @param location
 * @returns {}
 */
  function getInPolygonCamera(cameras = [{
    options: { location: {} }, camera_area: { points: [] }
  }], location) {
    let res = [];
    let pt = turf.point([location.x, location.y]);
    let poly;
    let polygonArr;
    for (const camera of cameras) {
      polygonArr = camera.camera_area.points.map(x => {
        return [x.x, x.y];
      });
      // console.log([location.x, location.y], [...polygonArr, polygonArr[0]]);
      poly = turf.polygon([
        [...polygonArr, polygonArr[0]]
      ]);
      let isIn = turf.booleanPointInPolygon(pt, poly);
      if (isIn) { //点是否在面中
        res.push(camera);
      }
    }
    return res;
  }

  /**
   * 遇到可视区域的停止方法
   * @returns {Promise}
   */
  const pauseRouteForWait = async () => {
    setXLState(PatrolEnum.PAUSE_FOR_WAIT);
    console.log('xlStateRef.current', xlStateRef.current);
    await viewer.drawer.pauseRoute();
  };


  /**
   * 继续巡逻
   * @param cb
   * @returns {Promise}
   */
  const resumeRoute = async (cb) => {
    await viewer.drawer.resumeRoute(cb);
    setXLState(PatrolEnum.START);
    console.log('xlStateRef.current', xlStateRef.current);
  };


  /**
   * 绘制当前位置
   * @param pos
   * @returns {Promise}
   */
  const drawPosNow = async (pos) => {
    if (!videoPosVisible) {
      return;
    }
    await removePosNow();
    await viewer.drawer.overLayerCreateObject({
      gid: 'VIDEO_ROUTE_POS',
      type: 'box',
      location: pos
    });
  };

  /**
 * 移除当前位置
 * @returns {Promise}
 */
  const removePosNow = async () => {
    if (!videoPosVisible) {
      return;
    }
    await viewer.drawer.overLayerRemoveObjectById('VIDEO_ROUTE_POS');
  };

  /**
 * 绘制可视区域
 */
  const drawVideoArea = async (cameras) => {
    if (!videoAreaVisible) {
      return;
    }
    let size = 100;
    for (let i = 0; i < cameras.length; i += size) {
      let mos = cameras.slice(i, i + size).map(x => x.camera_area);
      mos.forEach((x, i) => {
        x.gid = `VIDEO_AREA_${i}`;
      });
      console.log('创建可视区域', mos);
      areaModelList.push(...mos);
      await viewer.drawer.overLayerCreateObjects(mos);
    }
  };

  /**
 * 移除可视区域
 * @returns {Promise}
 */
  const removeVideoArea = async () => {
    if (!videoAreaVisible) {
      return;
    }
    let size = 100;
    for (let i = 0; i < areaModelList.length; i += size) {
      let mos = areaModelList.slice(i, i + size);
      console.log('删除可视区域', mos.map(x => x.gid));
      await viewer.drawer.overLayerRemoveObjectsById(mos.map(x => x.gid));
    }
  };

  /**
 * 停止函数Ref
 */
  const patrolStopFuncRef = useRef(() => {
  });

  /**
   * 视频巡逻Ref
   */
  const patrolFuncRef = useRef(() => {
  });

  const stopRoute = async () => {
    await viewer.drawer.stopRoute();

    setXLState(PatrolEnum.STOP);

    // 添加地图移动事件监听
    document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
      .removeEventListener('mousedown', patrolPauseFuncRef.current);

    await removeVideoArea();
    await removePosNow();

    viewer.core.clear();
    // stopPlay();
  };

  //点击开始
  const handleStart = async (item, i) => {
    setDataPanelShowAtom(false)
    if (xlStateRef.current === PatrolEnum.STOP) { // 没有巡逻
      // 添加元素
      // showRuntimeLeft();
      await creatLine(i);
      //播放回调
      // await onPlayRouteEnd();
    } else { // 正在巡逻
      patrolStopFuncRef.current();
    }
    // 巡逻结束后的动作
    await stopRoute();
  }

  /**
   * 获取下一条路线
   * @param idx
   * @returns {*}
   */

  console.log(1 % 2);
  const getLineNext = (idx) => {
    console.log(lineListRef.current, idx, lineListRef.current[(idx) % lineListRef.current.length], ((idx) % lineListRef.current.length), lineListRef.current.length, '666');
    return lineListRef.current[(idx) % lineListRef.current.length];
  };

  //创建路线巡逻
  const creatLine = useCallback(async (idx) => {
    let idxTmp = idx;
    setXLState(PatrolEnum.START);
    while (xlStateRef.current === PatrolEnum.START) {
      console.log('xlStateRef.current', xlStateRef.current);

      let line = getLineNext(idxTmp);

      setXLCurr(line);

      let cameraData = line.cameras;
      idxTmp++;

      cameraData = Array.from(new Set(cameraData));
      console.log('视频编码去重', cameraData);

      if (line.points && line.points.length === 0) {
        console.warn('路线的点数组为空');
        continue;
      }

      // 抬高z
      line.points.forEach(x => {
        x.z += 1000;
      });

      // 先分层, 再创建轨迹
      if (line.ground_id) {
        await viewer.build.mgr.showFloorUndergroundByUnderId(viewer, line.ground_id);
        await viewer.scene.service.sceneBuildService.setFloorListUndergroundVisibleEvent.triggerAll(
          viewer,
          true
        );
      } else if (line.indoor === true) {
        await viewer.build.mgr.splitAndShowFloor(viewer, line.build_id, line.floor_id);
      } else {
        // 室外
        await viewer.build.mgr.setUndergroundVisible(viewer, false);
        await viewer.build.mgr.resetAllBuildingWrap(viewer);
      }

      console.log("创建路线的数据", line.points);
      await (new Promise(resolve => {
        viewer.drawer.createRoute({
          gid: "TMP_ROUTE",
          style: "sim_arraw_Cyan",
          width: 200,
          speed: speed * 100,
          pitch: linePitch,
          distance: lineDistance,
          geom: line.points,
          visible: lineVisible
        }, false);

        setTimeout(() => {
          resolve();
        }, 100);
      }));

      let cameraCurr;
      let cameraLast;
      let showDataPointIdx = 0; // 当前拐点索引
      let showDataPoint = line.points[0]; // 当前拐点位置

      // 绘制可视区域
      await drawVideoArea(line.cameras);


      // 创建图层
      let routeObj = PatrolsRouteService.getRouteObj();
      routeObj.shapes[0].location = showDataPoint;
      routeObj.speed = speed * 100;
      await PatrolsRouteService.setAndRemoveAndLoadRouteObj(routeObj);


      // 播放路线
      await new Promise(resolve => {
        patrolStopFuncRef.current = async () => {
          await PatrolsRouteService.removeRouteObj();
          resolve({ cancel: true });
        };
        patrolFuncRef.current = async msg => {
          if (xlStateRef.current !== PatrolEnum.START) {
            return;
          }
          await patrolLock.lock();
          if (msg && msg.x && showDataPoint) { // 没有到达终点
            cameraCurr = getInPolygonCamera(cameraData, msg)[0];
            // 如果和上一个视频不同
            if (cameraCurr && cameraLast !== cameraCurr) {
              cameraLast = cameraCurr;
              // 创建设备标注
              await createVideoFlag(cameraCurr.camera_code);
              message.success("播放视频")
              console.log('播放视频-------------------', cameraCurr); // 上传视频对象,播放视频

              // 播放后等待10s
              await pauseRouteForWait();
              await new Promise(resolveTimeout => {
                setTimeout(() => {
                  if (xlStateRef.current === PatrolEnum.PAUSE_FOR_WAIT) {
                    resumeRoute(patrolFuncRef.current);
                  }
                  resolveTimeout();
                }, (waitTime || 10) * 1000);
              });
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
            let routeObj = PatrolsRouteService.getRouteObj();
            // 更新路线图层的位置
            routeObj.shapes[0].location = msg;
            if (xlStateRef.current === PatrolEnum.START) {
              await PatrolsRouteService.setAndReloadRouteObj(routeObj);
            }

            await drawPosNow(msg);
            if (utils.getDistance(showDataPoint, msg) < Number(speed * 100) / 3) {
              showDataPointIdx++;
              showDataPoint = line.points[showDataPointIdx];
              console.log('showDataPoint', showDataPoint);
            }
            // 到达最终点
            if (!showDataPoint) {
              resolve();
            }
          }

          await patrolLock.unlock();
        };

        playRoute(patrolFuncRef.current);
      });
    }
  }, [speed, isLineLoop, lineVisible, linePitch, lineDistance]);

  const pauseRoute = async () => {
    await viewer.drawer.pauseRoute();
    setXLState(PatrolEnum.PAUSE);
  };

  //退出视频巡逻
  const exitVideoPatrol = async () => {
    await PatrolsRouteService.removeRouteObj();

    setDataPanelShowAtom(true)
    await viewer.drawer.stopRoute();

    setXLState(PatrolEnum.STOP);

    await patrolStopFuncRef.current();

    // 添加地图移动事件监听
    document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
      .removeEventListener('mousedown', patrolPauseFuncRef.current);

    await removeVideoArea();
    await removePosNow();

    viewer.core.clear();
    // resetMapPosition()
  }

  const closeVideoPatrol = () => {
    sceneData.secondClick(100)
  }

  return (
    <div id='videoPatrol'>
      {
        xlStateRef.current === PatrolEnum.STOP ? <div className='patrol_container animate__animated animate__fadeInRight'>
          <img className='close' src={require('../../../assets/images/tool/second/icon_close2.png')} alt="" onClick={() => closeVideoPatrol()} />
          <h6>视频巡逻</h6>
          <div className='patrolCard'>
            <ul className='patrolList'>
              {
                patrolList.map((item, index) => {
                  return (
                    <li key={index} className='patrolListItem'>
                      <span>{item.line_name}</span>
                      <div className='button' onClick={() => handleStart(item, index)}>开始</div>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </div> : <>
          {
            createPortal(<div className='ctrolLine'>
              <Space>
                <Button type="primary"
                  className='resetPosition animate__animated animate__fadeInRight' style={{
                    "animationDelay": ".1s",
                    "marginRight":"10px"
                  }}
                  onClick={() => {
                    if (xlStateRef.current === PatrolEnum.PAUSE) {
                      resumeRoute(patrolFuncRef.current);
                    } else {
                      pauseRoute();
                    }
                    console.log('xlState', xlStateRef.current);
                  }}>{xlState === PatrolEnum.PAUSE ? '继续' : '暂停'}</Button>
                <Button type="primary"
                  className='resetPosition animate__animated animate__fadeInRight' style={{ "animationDelay": ".2s" }}
                  onClick={exitVideoPatrol}>退出</Button>
              </Space>
            </div>, document.getElementById('sceneVideoPatrol_ctrl_container'))
          }
        </>
      }
    </div>
  )
}
