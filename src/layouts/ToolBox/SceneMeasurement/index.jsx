import { useContext } from 'react';
import SceneContext from '../sceneContext';
import './index.scss'

export default function SceneMeasurement() {

  const sceneData = useContext(SceneContext);
  const viewer = sceneData.viewer

  const measureList = [
    { name: "测量距离", iconName: 'juli' },
    { name: "测量高度", iconName: 'gaodu' },
    { name: "测量面积", iconName: 'mianji' },
  ]

  // useEffect(() => {
  //   const handleContextMenu = (e) => {
  //     e.preventDefault();
  //     viewer.core.stopMeasure();
  //   };

  //   document.addEventListener('contextmenu', handleContextMenu);
  //   return () => {
  //     document.removeEventListener('contextmenu', handleContextMenu);
  //   };
  // }, []);

  const measureFunc = (index, name) => {
    switch (index) {
      case 0:
        viewer.core.startMeasureDistance();
        break;
      case 1:
        viewer.core.startMeasureHeight();
        break;
      case 2:
        viewer.core.startMeasureArea();
        break;
      default:
        break;
    }
  }

  const closeMeasurement = () => {
    sceneData.secondClick(100)
    viewer.core.stopMeasure();
  }

  return (
    <div id='measurementBox' className='animate__animated animate__fadeInDown'>
      <img className='close' src={require('../../../assets/images/tool/second/icon_close.png')} alt="" onClick={() => closeMeasurement()} />
      <h6>图上量算</h6>
      <ul>
        {
          measureList.map((item, index) => {
            return (
              <li key={index} onClick={() => measureFunc(index, item.iconName)}>
                <img src={require(`../../../assets/images/tool/second/icon_${item.iconName}.png`)} alt="" />
                <span>{item.name}</span>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
