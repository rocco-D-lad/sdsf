class PatrolsRouteServiceClass {
    viewer;
  
    defaultRouteObj = {
      visible: true,
      gid: "TEST_ROUTE",
      type: "MLT_LAYER_POS_DYNAMIC", // 普通shape图层
      speed: 1, //米/秒   经纬度坐标系：米/秒          场景坐标系： 厘米/秒
      shapes: [
        {
          type: 10110, //骨骼模型
          filename: "person",
          scale: 1.0,
          play: true,
        }
      ]
    };
  
    routeObjKey = 'routeObj';
  
    constructor(viewer) {
      this.viewer = viewer;
    }
  
    /**
     * 始终重置localStorage
     * @returns {{visible: boolean, gid: string, shapes: [{play: boolean, filename: string, scale: number, type: number}], type: string, speed: number}}
     */
    getRouteObj() {
      return this.defaultRouteObj;
    };
  
    setRouteObj(obj) {
      this.defaultRouteObj = obj;
    };
  
    async removeRouteObj() {
      let obj = this.getRouteObj();
      if (obj) {
        await this.viewer?.drawer.layerRemoveAsync(obj.gid);
        obj.gid = "TEST_ROUTE";
      }
    }
  
    async setAndRemoveAndLoadRouteObj(obj) {
      this.setRouteObj(obj);
      await this.removeRouteObj();
      return new Promise(resolve => {
        this.viewer.drawer.layerLoad(obj, (e) => {
          if (e) {
            this.setRouteObj(e);
            console.log('创建动画图层', e);
            setTimeout(() => {
              resolve(e);
            }, 1000);
          }
        });
      });
    }
  
    async setAndReloadRouteObj(obj) {
      console.log('reload model');
      this.setRouteObj(obj);
      this.viewer.core.view3d.LayerReLoad(obj);
    }
  
  }
  
  
  export default PatrolsRouteServiceClass;
  