import { getViewer, getApi } from '../components/mapViewer';
import { hooks } from 'tuyang-shared';
import { message } from 'antd';

export default function useAlarmMethods() {
  const api = getApi()
  const viewer = getViewer()
  const { useRequest } = hooks

  const { run: fetchDeviceCameraList } = useRequest()
  const { run: fetchDeviceFireList } = useRequest()
  const { run: fetchGridList } = useRequest()

  const alarmMethods = async (code,gid) =>{
    fetchDeviceFireList(
      api.deviceFire.list({
        device_code: code
      })
    ).then(async (res) => {
      if (Number(res.code) === 0) {
        let results1 = res.data[0]
        if (results1) {
          await viewer.drawer.remove.oneById('mian')
          await viewer.drawer.remove.oneById('lizi')
          /** 接收到报警的地图功能操作 */
          if(results1.build_id){
            //1.分层
            await viewer.build.mgr.splitAndShowFloor(
              viewer,
              results1.build_id,
              results1.floor_id
            )
            if(results1.grid_id){
              await fetchGridList(
                api.grid.list({
                  grid_id: results1.grid_id
                })
              ).then(async (res) => {
                if (Number(res.code) === 0) {
                  let results2 = res.data[0]
                  //2.网格面
                  let points = []
                  results2.geom.coordinates[0].forEach((element) => {
                    points.push({
                      x: element[0]*100,
                      y: element[1]*-100,
                      z: viewer.build.getFloorHeightByFloorId(results1.floor_id)
                    })
                  })
                  viewer.drawer.create.polygon({
                    gid:'mian' + (gid ? gid : ''),
                    style:'opacity_hong',
                    points
                  })
                }
              })
            }else{
              message.warning('暂无网格面')
            }
            await viewer.drawer.findObjectById(results1.model_id).then(async (res) => {
              //3.粒子特效
              await viewer.drawer.create.niagara({
                gid:'lizi' + (gid ? gid : ''),
                filename: 'P_Marker_10',
                scale: 2,
                auto_scale: true,
                auto_min_scale: 1,
                auto_max_scale: 200,
                location: {
                  x: res.position.x,
                  y: res.position.y,
                  z: res.position.z + 30
                }
              })
              //4.定位
              await viewer.camera.flyToPosition({
                x: res.position.x,
                y: res.position.y,
                z: res.position.z,
                pitch: 60,
                distance: 10
              })
            })
          }else{
            message.warning('设备暂未上图')
          }
        }else{
          // console.log('设备暂未上图');
          message.warning('设备暂未上图')
        }
      }
    })
  }

  const alarmMethods2 = async (code) =>{
    fetchDeviceCameraList(
      api.deviceCamera.list({
        camera_code: code
      })
    ).then(async (res) => {
      if (Number(res.code) === 0) {
        let results1 = res.data[0]
        if (results1) {
          await viewer.drawer.remove.oneById('mian')
          await viewer.drawer.remove.oneById('lizi')
          /** 接收到报警的地图功能操作 */
          if(results1.build_id){
            //1.分层
            await viewer.build.mgr.splitAndShowFloor(
              viewer,
              results1.build_id,
              results1.floor_id
            )
            //3.粒子特效
            var pos = results1.options.location
            await viewer.drawer.create.niagara({
              gid:'lizi',
              filename: 'P_Marker_10',
              scale: 2,
              auto_scale: true,
              auto_min_scale: 1,
              auto_max_scale: 200,
              location: {
                x: pos.x,
                y: pos.y,
                z: pos.z + 30
              }
            })
            //4.定位
            await viewer.camera.flyToPosition({
              x: pos.x,
              y: pos.y,
              z: pos.z,
              pitch: 60,
              distance: 10
            })
            return;
            await viewer.drawer.findObjectById(results1.model_id).then(async (res) => {
              //3.粒子特效
              await viewer.drawer.create.niagara({
                gid:'lizi',
                filename: 'P_Marker_10',
                scale: 2,
                auto_scale: true,
                auto_min_scale: 1,
                auto_max_scale: 200,
                location: {
                  x: res.position.x,
                  y: res.position.y,
                  z: res.position.z + 30
                }
              })
              //4.定位
              await viewer.camera.flyToPosition({
                x: res.position.x,
                y: res.position.y,
                z: res.position.z,
                pitch: 60,
                distance: 10
              })
            })
          }else{
            message.warning('设备暂未上图')
          }
        }else{
          // console.log('设备暂未上图');
          message.warning('设备暂未上图')
        }
      }
    })
  }

  return {
    alarmMethods,
    alarmMethods2
  }
}
