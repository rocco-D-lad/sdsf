import { useContext } from 'react';
import SceneContext from '../sceneContext';
import { useAtom } from 'jotai';
import { weatherState_atom } from '../../../jotai/store';
import './index.scss'

export default function SceneWeather() {

  const sceneData = useContext(SceneContext);
  const viewer = sceneData.viewer
  const [weatherStateAtom, setWeatherStateAtom] = useAtom(weatherState_atom);
  const weatherList = [
    { name: "日照", iconName: 'sunny' },
    { name: "多云", iconName: 'cloudy' },
    { name: "下雨", iconName: 'rain' },
    { name: "下雪", iconName: 'snow' }
  ]

  const weatherFunc = (index, name) => {

    console.log(sceneData,'sceneData');
    return
    if(index !==0){
      setWeatherStateAtom({ ...weatherStateAtom, sunny: true ,[name]: !weatherStateAtom[name]});
    }else{
      viewer.core.setSceneSnow(false);
      viewer.core.setSceneRain(false);
      viewer.core.setSceneClouds(false);
      setWeatherStateAtom({
        sunny:false,
        cloudy: true,
        rain: true,
        snow: true
      });
    }

    switch (index) {
      case 1:
        viewer.core.setSceneClouds(weatherStateAtom[name]);
        break;
      case 2:
        viewer.core.setSceneRain(weatherStateAtom[name]);
        break;
      case 3:
        viewer.core.setSceneSnow(weatherStateAtom[name]);
        break;
      default:
        break;
    }
  }

  const closeWeather = () => {
    sceneData.secondClick(100)
  }

  return (
    <div id='weatherBox' className='animate__animated animate__fadeInDown'>
      <img className='close' src={require('../../../assets/images/tool/second/icon_close.png')} alt="" onClick={() => closeWeather()} />
      <h6>天气</h6>
      <ul>
        {
          weatherList.map((item, index) => {
            return (
              <li key={index} onClick={() => weatherFunc(index, item.iconName)} className={!weatherStateAtom[item.iconName] ? "active" : null}>
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
