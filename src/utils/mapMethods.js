import { getViewer } from '../components/MapContainer';
import { getApi } from '../pages/home';
import { hooks } from 'tuyang-shared';

export default function useMapMethods() {

  const api = getApi()
  const viewer = getViewer()
  const { useRequest } = hooks
  const { run: fetchSysConfigAsync } = useRequest()

  //地图复位
  const resetMapPosition  = ()=>{
    fetchSysConfigAsync(api.system.list()).then(res => {
      if(Number(res.code) === 0) {
        const sysConfig = res.data[0]
        if(sysConfig) {
          const centerLocation = sysConfig.center_location
          if(centerLocation) {
            viewer.camera.flyToPositionByOptions({
              position: centerLocation
            })
          } else {
            viewer.camera.resetHome()
          }
        }
      } else {
        viewer.camera.resetHome()
      }
    })
  }

  return {
    resetMapPosition
  }
}
