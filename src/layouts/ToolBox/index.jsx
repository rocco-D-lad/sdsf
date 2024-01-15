import { useState } from 'react';
import { useAtom } from 'jotai';
import { dataPanelShow_atom } from '../../jotai/store';
import SceneContext from './sceneContext';
import useMapMethods from '../../utils/mapMethods';
import { getViewer } from '../../components/MapContainer';
// import { getViewer } from '../../components/MapContainer';
import SceneWeather from './SceneWeather';
import SceneMeasurement from './SceneMeasurement';
import SceneLocations from './SceneLocations';
import SceneVideoPatrol from './SceneVideoPatrol';
import SceneFlyRoaming from './SceneFlyRoaming';
import './index.scss'

export default function ToolBox() {

  const viewer = getViewer()
  const [dataPanelShowAtom, setDataPanelShowAtom] = useAtom(dataPanelShow_atom);
  const [secondBoxShow, setSecondBoxShow] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(100)
  const { resetMapPosition } = useMapMethods()

  const secondList = [
    { name: "天气", iconName: 'tianqi1' },
    { name: "测量", iconName: 'cl1' },
    { name: "指北", iconName: 'zb1' },
    { name: "常用位置", iconName: 'cywz1' },
    // { name: "视频巡逻", iconName: 'spxl1' },
    { name: "飞行漫游", iconName: 'fxmy1' }
  ]

  const closeSeconds = () => {
    if (secondBoxShow) {
      setCurrentIndex(100)
    }
    setSecondBoxShow(!secondBoxShow)
  }

  const secondClick = (index) => {
    setCurrentIndex(index)
  }

  const secondComponent = (index) => {
    const components = {
      0: () => currentIndex === index && <SceneWeather/>,
      1: () => currentIndex === index && <SceneMeasurement/>,
      2: () => currentIndex === index && viewer.camera.setNorth(),
      3: () => currentIndex === index && <SceneLocations/>,
      4: () => currentIndex === index && <SceneVideoPatrol/>,
      5: () => currentIndex === index && <SceneFlyRoaming/>
    };
    return components[index] ? components[index]() : null;
  };

  const sceneValue = {
    secondClick,
    viewer
  }

  return (
    <div id='toolBox'>
      <div className='firstBox'>
        <div className='resetPosition animate__animated animate__fadeInUp' style={{ "animationDelay": ".1s" }}
          onClick={() => resetMapPosition()}>
          <img className='icon_fw' src={require('../../assets/images/tool/btn_fw.png')} alt="" />
          {/* 房子图标 */}
        </div>
        {/* <div className='showPage animate__animated animate__fadeInUp' style={{ "animationDelay": ".2s" }}
          onClick={() => setDataPanelShowAtom(!dataPanelShowAtom)}>
          {
            dataPanelShowAtom ? <img className='icon_yc' src={require('../../assets/images/tool/icon_tool_yc.png')} alt="" />
              : <img className='icon_xs' src={require('../../assets/images/tool/icon_tool_xs.png')} alt="" />
          }
        </div> */}
        <div className='tools animate__animated animate__fadeInUp' style={{ "animationDelay": ".3s" }}
          onClick={() => closeSeconds()}>
          <img className='icon_gjx' src={require('../../assets/images/tool/btin_gj.png')} alt="" />
        </div>
      </div>
      {
        secondBoxShow && <div className='secondBox'>
          <ul className='secondList'>
            {
              secondList.map((item, index) => {
                return (
                  <li key={index}
                    className={`secondItem animate__animated ${secondBoxShow ? 'animate__fadeInUp' : 'animate__fadeOutUp'} `}
                    style={{ "animationDelay": "." + (index + 1) + "s" }}>
                    <div className='clickTitle' onClick={() => secondClick(index)}>
                      <img className='secondIcon' src={require(`../../assets/images/tool/second/icon_tool_${item.iconName}.png`)} alt="" />
                      <span className='secondTitle'>{item.name}</span>
                    </div>
                    <SceneContext.Provider value={sceneValue}>
                      {secondComponent(index)}
                    </SceneContext.Provider>
                  </li>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}
