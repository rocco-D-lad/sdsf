import { useContext, useEffect, useState } from 'react';
import SceneContext from '../sceneContext';
import { ConfigProvider, Switch, Input, message, Button } from 'antd';
import { RedoOutlined, DeleteOutlined } from '@ant-design/icons';
import { utils } from "tuyang-shared";
import './index.scss'

export default function SceneLocations() {

  const sceneData = useContext(SceneContext);
  const viewer = sceneData.viewer
  const [locationList, setLocationList] = useState([])
  const [isThumbnailShow, setThumbnailShow] = useState(true)

  useEffect(() => {
    getLocationList()
  }, [])

  //获取场景列表
  const getLocationList = async () => {
    viewer.core.setKeyBoardEnable(false);
    let locationList = await viewer.scene.apis.mapLocationApi.list({});
    setLocationList(locationList)
    console.log("查询常用位置", locationList);
  }

  //新增场景
  const handleAdd = async (e) => {
    let base64Url = utils.captureUtil.captureVideo(
      document.getElementById(viewer.core?.view3d?.id)?.querySelector("video")
    );

    let pos = await viewer.camera?.getCurrentPosition();
    let obj = {
      id: utils.createUUID32(),
      location_name: "新位置",
      camera_pic: base64Url,
      position: pos
    };
    let res = await viewer.scene.apis.mapLocationApi.create([obj]);
    console.log("添加常用位置", obj, res);
    message.success("操作成功");
    setLocationList((pre) => {
      let da = [...pre];
      da.push(obj);
      return da;
    });
  };

  //删除场景
  const handleRemove = async (e, loc) => {
    console.log("删除图标", loc);
    let d = locationList.filter((x) => x !== loc);
    let res = await viewer.scene.apis.mapLocationApi.destroy(loc);
    message.success("删除成功");
    setLocationList([...d]);
  };

  //修改场景
  const handleLocationChange = async (e, loc) => {
    console.log(
      viewer.core?.view3d?.id,
      window.document
        .getElementById(viewer.core?.view3d?.id)
        ?.querySelector("video")
    );
    let base64Url = utils.captureUtil.captureVideo(
      document.getElementById(viewer.core?.view3d?.id)?.querySelector("video")
    );
    loc.camera_pic = base64Url;

    let pos = await viewer.camera?.getCurrentPosition();
    loc.position = { ...pos, distance: undefined };
    let res = await viewer.scene.apis.mapLocationApi.update(loc);
    message.success("保存成功");
    setLocationList([...locationList]);
  };

  const handleNameChange = async (e, loc) => {
    console.log("改变名称", e.target.value);
    loc.location_name = e.target.value;
    setLocationList([...locationList]);
  };

  const handleNameBlur = async (e, loc) => {
    let res = await viewer.scene.apis.mapLocationApi.update(loc);
    console.log("更新常用位置名称", res);
    message.success("保存成功");
  };

  const handleLocation = (loc) => {
    viewer.camera?.flyToPosition({...loc.position,distance:100});
  }

  const onChange = (checked) => {
    setThumbnailShow(checked)
  };

  const closeLocations = () => {
    sceneData.secondClick(100)
  }

  return (
    <div id='locationsBox' className='animate__animated animate__fadeInRight'>
      <img className='close' src={require('../../../assets/images/tool/second/icon_close2.png')} alt="" onClick={() => closeLocations()} />
      <h6>常用位置</h6>
      <div className='buttonGroup'>
        <Button type="primary" onClick={handleAdd}>添加</Button>
        <div className='switchThumbnail'>
          <ConfigProvider
            theme={{
              components: {
                Switch: {
                  handleSize: 15,
                  trackHeight: 19,
                  trackMinWidth: 50,
                }
              }
            }}
          >
            <Switch defaultChecked={isThumbnailShow} onChange={onChange} />
          </ConfigProvider>
          <span className='switchLabel'>显示缩略图</span>
        </div>
      </div>
      <div className='locationList_container'>
        <ul className='locationList'>
          {
            locationList.map((item, index) => {
              return (
                <li key={index} className='locationItem' onClick={() => handleLocation(item)}>
                  <div className='operate'>
                    <div className='operateInput'>
                      <span className='name'>名称：</span>
                      <Input value={item.location_name}
                        onChange={(e) => {
                          handleNameChange(e, item);
                        }}
                        onBlur={(e) => {
                          handleNameBlur(e, item);
                        }}
                      />
                    </div>
                    <div className='operateButton'>
                      <Button icon={<RedoOutlined />}
                        onClick={(e) => {
                          handleLocationChange(e, item);
                          e.stopPropagation();
                        }} />
                      <Button icon={<DeleteOutlined />} onClick={(e) => { handleRemove(e, item) }} />
                    </div>
                  </div>
                  {
                    isThumbnailShow && <img className='camera_pic'
                      alt=""
                      src={item.camera_pic.indexOf("data:image") < 0 ? viewer.config.api + "/" + item.camera_pic : item.camera_pic}
                    />
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
