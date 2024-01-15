import { useContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import * as turf from '@turf/turf';
import { useAtom } from 'jotai';
import { dataPanelShow_atom } from '../../../jotai/store';
import { hooks, utils } from "tuyang-shared";
import { PatrolRouteServiceClass } from "tuyang-mapv3d";
import SceneContext from '../sceneContext';
import { message, Space, Button } from 'antd';
import mockData from './mock.json'
import useMapMethods from '../../../utils/mapMethods';
import './index.scss'

let patrolRouteService;


export default function SceneFlyRoaming() {

  const { resetMapPosition } = useMapMethods()
  const [, setDataPanelShowAtom] = useAtom(dataPanelShow_atom);
  const sceneData = useContext(SceneContext);
  const viewer = sceneData.viewer
  const [roamingList, setRoamingList] = useState([])
  const [patrolState, setPatrolState ] = useState(PatrolRouteServiceClass.PatrolRouteStateEnum.STOP);
  const [mapRouteObj,setMapRouteObj] = useState({})
  const [startRoute,setStartRoute] = useState(null)

  const patrolPauseFuncRef = useRef(e => {
    setPatrolState(PatrolRouteServiceClass.PatrolRouteStateEnum.PAUSE)
  });

  useEffect(() => {
    if (viewer) {
      patrolRouteService = new PatrolRouteServiceClass(viewer);

    document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
      .addEventListener('mousedown',patrolPauseFuncRef.current);
    }
    return ()=>{
      document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
      .removeEventListener('mousedown', patrolPauseFuncRef.current);
    }
  }, [viewer]);

  useEffect(() => {
    (async () => {
      setRoamingList(await viewer.scene.apis.mapRoamApi.list({}));
    })()
    return ()=>{
      exitFlyRoaming()
    }
  }, [])

  //开始漫游
  const handleStart = (data) => {
    setStartRoute(data)
    setDataPanelShowAtom(false)
    // 加载小人
    patrolRouteService.setAndRemoveAndLoadRouteObj(patrolRouteService.getRouteObj());
    // 更新状态
    setPatrolState(PatrolRouteServiceClass.PatrolRouteStateEnum.START)
    viewer.drawer.playRoute((l) => {
      let obj = patrolRouteService.getRouteObj();
      obj.shapes[0].location = l;
      patrolRouteService.setAndReloadRouteObj(obj);
    });
  }

  //暂停、继续漫游
  const togglePause = () => {
    if (patrolState === PatrolRouteServiceClass.PatrolRouteStateEnum.PAUSE) {
      setPatrolState(PatrolRouteServiceClass.PatrolRouteStateEnum.START)
      viewer.drawer.resumeRoute((l) => {
        let obj = patrolRouteService.getRouteObj();
        obj.shapes[0].location = l;
        patrolRouteService.setAndReloadRouteObj(obj);
      });
    } else if (patrolState === PatrolRouteServiceClass.PatrolRouteStateEnum.START) {
      viewer.drawer.pauseRoute();
    }
  }

  //退出漫游
  const exitFlyRoaming = async () => {
    document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
    .removeEventListener('mousedown', patrolPauseFuncRef.current);
    viewer.drawer.stopRoute(console.log);
    await patrolRouteService.removeRouteObj();
    setPatrolState(PatrolRouteServiceClass.PatrolRouteStateEnum.STOP)
    setDataPanelShowAtom(true)
  }

  //显示、隐藏漫游路线
  const toggleShowRoute = (type)=>{
    if(type === 'show'){
      let newMapRouteObj = {
        visible: true, // 显示隐藏路径
        style: "sim_arraw", // 路径的样式  sim_arraw, sim_dot, sim_dashed, sim_flash, sim_scan, sim_dot
        showloc: true, // 是否显示起始点图标loc
        width: 100, // 路径的宽度，单位米
        speed: 500, // 路径的播放，默认20   厘米/每秒   米/秒
        distance: 1000, // 可视距离  > 0.01 单位米
        pitch: 10, // 俯仰角， 范围：0——90度
        iselev: true, // 是否依赖地形高程值
        estep: 500,
        geom: startRoute.points
      };
      setMapRouteObj(newMapRouteObj)
      viewer.drawer.createRoute(newMapRouteObj);
      let obj = patrolRouteService.getRouteObj();
      obj.speed = newMapRouteObj.speed;
      obj.shapes[0].location = startRoute.points[0];
      patrolRouteService.setRouteObj(obj);

    }else{
      viewer.core.clear();
      patrolRouteService.removeRouteObj();
    }
  }

  const closeVideoPatrol = () => {
    sceneData.secondClick(100)
  }

  return (
    <div id='flyRoaming'>
      {
        patrolState === PatrolRouteServiceClass.PatrolRouteStateEnum.STOP ?  <div className='patrol_container animate__animated animate__fadeInRight'>
            <img className='close' src={require('../../../assets/images/tool/second/icon_close2.png')} alt="" onClick={() => closeVideoPatrol()} />
            <h6>飞行漫游</h6>
            <div className='patrolCard'>
              <ul className='patrolList'>
                {
                  roamingList.map((item, index) => {
                    return (
                      <li key={index} className='patrolListItem'>
                        <span>{item.roam_name}</span>
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
                    "marginRight": "10px"
                  }}
                  onClick={togglePause}
                >{patrolState === PatrolRouteServiceClass.PatrolRouteStateEnum.PAUSE ? '继续' : '暂停'}</Button>
                <Button type="primary"
                  className='resetPosition animate__animated animate__fadeInRight' style={{ "animationDelay": ".2s" }}
                  onClick={()=>toggleShowRoute('show')}
                >显示</Button>
                <Button type="primary"
                  className='resetPosition animate__animated animate__fadeInRight' style={{ "animationDelay": ".3s" }}
                  onClick={()=>toggleShowRoute('hide')}
                >隐藏</Button>
                <Button type="primary"
                  className='resetPosition animate__animated animate__fadeInRight' style={{ "animationDelay": ".4s" }}
                  onClick={exitFlyRoaming}
                >退出</Button>
              </Space>
            </div>, document.getElementById('sceneVideoPatrol_ctrl_container'))
          }
        </>
      }
    </div>
  )
}
