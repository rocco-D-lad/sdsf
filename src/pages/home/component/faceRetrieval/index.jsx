import React, { useState, useRef,useEffect, useCallback } from "react";
import ReactDOM, { createPortal } from 'react-dom';
import { hooks, utils } from 'tuyang-shared'
import { getApi, getViewer } from "../../../home/index";
import { DatePicker, Space, Input, Pagination, Image, message, Empty, Spin } from 'antd';
import { Build } from '../../utils/map3d'
import * as turf from '@turf/turf';
import './style.scss';
import axios from 'axios';
import dayjs from 'dayjs';
import lodash from 'lodash';
import {
  changeIsvideo
} from '../../app/otherSlice';
import { useDispatch } from 'react-redux';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import { videoPlay } from '../../utils/videoSocket'
import locale from "antd/es/date-picker/locale/zh_CN";
import { decodeISCFaceCaptureImage } from '../../utils/imageDeco'
import PatrolsRouteServiceClass from "../ElectronicPatrol/PatrolsRouteServiceClass";
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(customParseFormat);
let faceTimeFormat = 'YYYY-MM-DD HH:mm:ss';

const FaceRetrieval = () => {
  const api = getApi()
  const viewer = getViewer()
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState(1); // 默认第一个标签页为选中状态
  const [isFaceLibShow, setIsFaceLibShow] = useState(false);
  const [faceCaptureListshow, setfaceCaptureListshow] = useState(false) //人脸抓拍显隐
  const [renSelect, setRenSelect] = useState({
    pageNo: "1",
    pageSize: "200",
    name: "",
    certificateNum: ""
  });//人脸库查询
  const [renData, setRenData] = useState([
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    {
      name: "张三",
      certificateNum: "123456",
      sex: "male",
      faceUrl: "http://192.168.0.27:10451/no_pic.png"
    },
    // {
    //   name:"张三",
    //   certificateNum:"123456",
    //   sex:"male",
    //   faceUrl:"http://192.168.0.27:10451/no_pic.png"
    // },
    // {
    //   name:"张三",
    //   certificateNum:"123456",
    //   sex:"male",
    //   faceUrl:"http://192.168.0.27:10451/no_pic.png"
    // },
    // {
    //   name:"张三",
    //   certificateNum:"123456",
    //   sex:"male",
    //   faceUrl:"http://192.168.0.27:10451/no_pic.png"
    // },{
    //   name:"张三",
    //   certificateNum:"123456",
    //   sex:"male",
    //   faceUrl:"http://192.168.0.27:10451/no_pic.png"
    // },
  ]);
  const [paginationVisible, setPaginationVisible] = useState(true);
  const handleTabClick = async (index) => {
    setActiveTab(index);
    switch (index) {
      case 0:
        setIsFaceLibShow(false);
        getFaceCameraList()
        break;
      case 1:
        break
      case 2:
        setIsFaceLibShow(true)
        // setIsCatchFaceLibShow(false);
        // setIsFaceDetailShow(false);
        await faceDatabase();
        break;
      default:
        break
    }

  };

  // 图片上传
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState();
  const { run: getfaceMany } = hooks.useRequest();
  const chooseImg = async (event) => {
    console.log('上传图片', event.target.files);
    if (event.target.files.length === 0) {
      return;
    }
    let imgFile;
    let reader = new FileReader(); //html5读文件
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = async function (event) {
      //读取完毕后调用接口
      imgFile = event.target.result;
      console.log('上传图片', imgFile); 
      //=============================识别人员id
      // setIshttp(false);
      // setIchoose(true);
      setImgUpload(imgFile);
      let param = {
        faceData:imgFile.split(',')[1]
      }
      //
      let res = await getfaceMany(api.config.isc.faceMany(param))
      if( res.msg === "success"){
        setCertNoId(res.data[0]?.certNo)
        setSearchParam({ ...searchParam, certNo: res.data[0]?.certNo })
      }
    };
  };

  // 人脸相关
  const [faceDetailList, setFaceDetailList] = useState([]);
  const { run: getFaceLib, cancel: getFaceLibCancel } = hooks.useRequest();
  const { run: getCamraList, cancel: getCameraCancel } = hooks.useRequest();
  const { run: getDeviceChannelsReq, cancel: getDeviceChannelsReqCanel } =
    hooks.useRequest();
  const { run: getFaceCameraTypeReq, cancel: getFaceCameraTypeReqCanel } =
    hooks.useRequest();
  const { run: getFaceCameraListReq, cancel: getFaceCameraListReqCanel } =
    hooks.useRequest();
  const { run: searchFace, cancel: searchFaceCanel } = hooks.useRequest();
  const inputRef = useRef();
  const [faceData, setFaceData] = useState([]);
  const [faceImgList, setFaceImgList] = useState([]);
  const [faceCameraList, setFaceCameraList] = useState([]);
  const [isFaceDataLoading, setIsFaceDataLoading] = useState(false);

  /**
   * 人脸抓拍显隐
   */
  const [isFaceDetailShow, setIsFaceDetailShow] = useState(false);
  /**
  * 人脸路径是否折叠
  */
  const [isFaceDetailFold, setIsFaceDetailFold] = useState(false);
  /**
   * 人脸图片
   */
  const [imgUpload, setImgUpload] = useState();
  // 人员id
  const [certNoId,setCertNoId] = useState()


  /**
   * 人脸搜索时间
   */
  const [time, setTime] = useState({
    stime: dayjs().subtract(7, 'days'),
    etime: dayjs()
  });

  /**
   * 随机颜色
   * @returns {string}
   */
  function rgba() {
    //rgb颜色随机
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgba(${r},${g},${b}, 0.5)`;
  }

  /**
   * 人库脸查询条件
   */
  const [libParam, setLibParam] = useState({
    pageNo: 1,
    pageSize: 100,
    certificateNum: "",
    name: "",
  });

  /**
   * 人脸查询条件
   */
  const [searchParam, setSearchParam] = useState({
    // face_pic: '',
    startTime: time.stime.format(faceTimeFormat),
    endTime: time.etime.format(faceTimeFormat),
    // similarity: 65
    certNo:''
  });


  /**handleImg
   * 查询人脸库
   * @param obj
   * @returns {Promise<void>}
   */
  const faceDatabase = async (obj = libParam) => {
    console.log(obj, 'obj');
    let hide = message.loading('查询人脸库');
    let res = await getFaceLib(api.dis.face.library(obj));

    console.log(res, '人脸数据');
    setLibParam({ ...libParam });
    setFaceImgList(res.data.data);
    hide();
  };
  /**
   *@人员Id 
   */
  const handlePersonId =(e) => {
    const value = e.target.value.split(/[\t\r\f\n\s]*/g).join('');
    // 进行一些验证逻辑，确保输入的车牌号码符合要求
    setCertNoId(value)
    setSearchParam({ ...searchParam, certNo: value })
  }

  /**
   * 选择人脸库图片
   * @param item
   */
  const handleImg = (item) => {
    setImgUpload(item.face_url);
    setCertNoId(item?.certificateNum)
    setSearchParam({ ...searchParam, certNo: item?.certificateNum })
    setIsFaceLibShow(false);
  };

  /**
   * 搜索人脸日期列表
   * @constructor
   */
  const searchFaceDateList = async () => {
    if (time.stime && time.etime && certNoId) {
      // setIsFaceDataLoading(true);
      let imgSearch_json;
      // console.log("is_httpImg", is_httpImg);
      imgSearch_json = {
        // face_pic: imgUpload,
        startTime: searchParam.startTime,
        endTime: searchParam.endTime,
        // similarity: searchParam.similarity,
        certNo: searchParam.certNo
      };

      console.log(imgSearch_json, 'imgSearch_json');

      // 查询人脸设备通道
      try {
        let deviceChannels = await getDeviceChannelsReq(api.dis.face.getFaceCamera(null));
        console.log('获取人脸通道', deviceChannels.data);

        // 传入设备
        if (deviceChannels?.data && Array.isArray(deviceChannels?.data) && deviceChannels?.data?.length > 0) {
          imgSearch_json = { ...imgSearch_json, deviceChannels: deviceChannels?.data[0] };
        }
        console.log('抓拍人脸参数', imgSearch_json);
      } catch (e) {
        console.log('定制接口 getFaceCamera 无法接入');
      }


      // 查询人脸==============================================================
      // let faceRes = await searchFace(api.dis.face.search(imgSearch_json));
      let faceRes = await searchFace(api.config.isc.trasSearchImg(imgSearch_json))
      let faceResFilter = faceRes.data.filter(item=>{ return item.resourceType !== "virtual"  })
      if (faceResFilter) {
        console.warn('查询人脸时会去重, 时间完全相同时会去重, 实际显示数量会比对接平台上的数量要少');
 
        faceResFilter.sort((a, b) => {
          return dayjs(a.capture_time) - dayjs(b.capture_time);
        });

        // 去重
        let faceResDataTmp = [];
        let captureTimeLast = null;
        faceResFilter.forEach(x => {
          // 日期不相等, 才加入新数组
          if (captureTimeLast !== x.capture_time) {
            faceResDataTmp.push(x);
            captureTimeLast = x.capture_time;
          }
        });
        faceResFilter = faceResDataTmp;

        let groupData = lodash(faceResFilter)
          .groupBy((x) => dayjs(x.capture_time).format('YYYY-MM-DD'))
          .value();
        console.log('人脸数据', faceRes, groupData);
        if (faceRes.code === '0') {
          // 处理人脸数据 list
          const cameraList = Object.entries(groupData).map((k, idx, value) => ({
            date: k[0],
            list: k[1]
          }));
          cameraList.sort((a, b) => {
            return b.date.localeCompare(a.date);
          });
          setFaceData(cameraList);
        }
        setIsFaceDataLoading(false);
        setIsFaceLibShow(false);
      } else {
        message.error(faceRes.msg)
        setIsFaceDataLoading(true);
      }
    } else {
      message.warning('参数不足');
    }
  };

  /**
   * 查询详细tabActive
   * @param item
   * @param index
   */
  const { run: getBuildList } = hooks.useRequest();
  const captureDetail = async (item, index) => {
    console.log('查询详细人脸', item);
    // camera的双通道======================================================================
    // let prodes = await axios.post(
    //   `${viewer.core.config.api}/device/camera/list/codes`,
    //   item.list.map((x) => x.camera_code)
    // );

    // if (prodes.data.msg === 'success') {
    //   let _dataProdes = prodes.data.data;
    //   console.log(_dataProdes, '_data');
    //   let cameraList = await getCamraList(api.deviceCamera.list({
    //     "camera_name": {
    //       "Op.in": _dataProdes.map((x) => x.camera_name)
    //     }
    //   }))

    //   if (cameraList.msg === 'success') {
    //     let filterCamera = cameraList.data.filter(x => (x.options != null) && (JSON.stringify(x.options) != "{}"))
    //     let filterCamera1 = cameraList.data.filter(x => (x.options === null) || (JSON.stringify(x.options) === "{}"))
    //     filterCamera.forEach(x => {
    //       filterCamera1.forEach(y => {
    //         if (x.camera_name === y.camera_name) {
    //           x.cameraCode = y.camera_code
    //         }
    //       })
    //     })
    //     let _data = filterCamera;
    //     let deviceOptions = _data.filter(x => x.options);
    //     let faceCaptureRes = item.list.map(x => {
    //       let matchDeviceInfo = deviceOptions.filter(f => f.cameraCode === x.camera_code)[0];
    //       // let matchDeviceInfo = deviceOptions.filter(f => f.camera_code === x.camera_code)[0]
    //       if (matchDeviceInfo) { // 关联字段
    //         x = {
    //           ...x,
    //           ...matchDeviceInfo
    //         };
    //       }
    //       return x;
    //     });

    //     // 随机颜色
    //     let colorCurr;
    //     let codeCurr;
    //     faceCaptureRes.forEach((x) => {
    //       if (codeCurr !== x.camera_code) {
    //         colorCurr = rgba();
    //         codeCurr = x.camera_code;
    //       }
    //       x.bgColor = colorCurr;
    //     });

    //     // 关联楼层信息
    //     faceCaptureRes.forEach((x) => {
    //       if (x.indoor === true) {
    //         let buildInfo = viewer.build.mgr.getBuildInfoById(x.build_id);
    //         let floorInfo = viewer.build.mgr.getFloorInfoById(x.build_id, x.floor_id);
    //         x.floor_name = `${buildInfo.name} ${floorInfo ? floorInfo.name : ''}`;
    //       } else if (x.floor_name === false) {
    //         x.floor_name = `室外`;
    //       } else {
    //         x.floor_name = '无';
    //       }
    //     });

    //     console.log('设置人脸列表', faceCaptureRes);
    //     setFaceDetailList(faceCaptureRes);

    //     // setIsShowFaceRoute(false); // 删除路线
    //     viewer.path.removeAllSearch(viewer);

    //   } else {
    //     console.log('接口有问题');
    //   }
    //   setIsFaceLibShow(false);
    //   setIsFaceDetailShow(true);
    // }

    // camera和door
    let camraList = [], doorList = []
    item.list.forEach(x=>{
      x.resourceType === 'camera'?camraList.push(x):doorList.push(x)
    })
    
    Promise.all([cameraCode(camraList),doorCode(doorList)]).then(res=>{
      console.log(res,'promiseAll');
      
      // let prodesData = [...res[0].data.data,...res[1].data.data]
      // console.log(prodesData,'camera and door is data');

      // let _data = prodesData;
      // let deviceOptions = _data.filter(x => x.options);
      // let faceCaptureRes = item.list.map(x => {
      //   // let matchDeviceInfo = deviceOptions.filter(f => f.cameraCode === x.camera_code)[0];
      //   let matchDeviceInfo = deviceOptions.filter(f => {return f.camera_code ? f.camera_code:f.device_code === x.indexCode } )[0];
      //   // let matchDoorInfo = deviceOptions.filter(f => f.device_code === x.indexCode)[0]
      //   // let matchDeviceInfo = [...matchCameraInfo,...matchDoorInfo]
      //   if (matchDeviceInfo) { // 关联字段
      //     x = {
      //       ...x,
      //       ...matchDeviceInfo
      //     };
      //   }
      //   return x;
      // });
      let cameraData = [...res[0].data.data]; let doorDarta = [...res[1].data.data]

      let deviceOptionsCamera = cameraData.filter(x => x.options);
      let deviceOptionsDoor = doorDarta.filter(x => x.options);
  
      let faceCaptureCamera = camraList.map(x => {
          let matchCameraInfo = deviceOptionsCamera.filter(f => f.camera_code === x.indexCode)[0]
          if (matchCameraInfo) { // 关联字段
            x = {
              ...x,
              ...matchCameraInfo
            };
          }
          return x;
        });
  
        let faceCaptureDoor = doorList.map(x => {
          let matchDoorInfo = deviceOptionsDoor.filter(f => f.device_code === x.indexCode)[0]
          if (matchDoorInfo) { // 关联字段
            x = {
              ...x,
              ...matchDoorInfo
            };
          }
          return x;
        });
  
      let faceCaptureRes = [...faceCaptureCamera,...faceCaptureDoor]

      // 随机颜色
      let colorCurr;
      let codeCurr;
      faceCaptureRes.forEach((x) => {
        if (codeCurr !== x.camera_code && codeCurr !== x.device_code) {
          colorCurr = rgba();
          codeCurr = x.camera_code ? x.camera_code : x.device_code;
        }
        x.bgColor = colorCurr;
      });

      // 关联楼层信息
      faceCaptureRes.forEach((x) => {
        if (x.indoor === true) {
          let buildInfo = viewer.build.mgr.getBuildInfoById(x.build_id);
          let floorInfo = viewer.build.mgr.getFloorInfoById(x.build_id, x.floor_id);
          x.floor_name = `${buildInfo.name} ${floorInfo ? floorInfo.name : ''}`;
        } else if (x.floor_name === false) {
          x.floor_name = `室外`;
        } else {
          x.floor_name = '无';
        }
      });

      console.log('设置人脸列表', faceCaptureRes);
      setFaceDetailList(faceCaptureRes);

      // setIsShowFaceRoute(false); // 删除路线
      viewer.path.removeAllSearch(viewer);

      setIsFaceLibShow(false);
      setIsFaceDetailShow(true);
    }).catch((error)=>{
      console.log(error,'error');
    })
  };

  //
  const cameraCode = (camraList) =>{
    return axios.post(
      `${viewer.core.config.api}/device/camera/list/codes`,
      camraList.map((x) => x.indexCode)
    )
  }

  const doorCode = (doorList) =>{
    return axios.post(
      `${viewer.core.config.api}/device/info/list/codes`,
      doorList.map((x) => x.indexCode)
    )
  }


  /**
   * 删除标注
   * @returns {Promise<void>}
   */
  // async function removeFlag() {
  //   await viewer.drawer.remove.oneById(flagGid);
  // }

  const [loc,setLoc] = useState({pitch:89,x: -33456.96226523904,y: -24430.658935524996,z: 17601.501687852862})
  /**
    * 查看人脸逻辑
    * @returns {Promise<void>}
    */
  async function searchRoute() {

  //   setLineList({
  //     "id": "BBF4EF6CE8FFB34FD5B8DE627B9F9388",
  //     "line_name": "415646",
  //     "indoor": false,
  //     "build_id": "",
  //     "floor_id": "",
  //     "points": [
  //         {
  //             "x": -302.02569580078125,
  //             "y": 3623.5849609375,
  //             "z": 24.0003662109375
  //         },
  //         {
  //             "x": -326.0782470703125,
  //             "y": 4492.4150390625,
  //             "z": 24.0018310546875
  //         },
  //         {
  //             "x": -890.394287109375,
  //             "y": 4059.982177734375,
  //             "z": 24
  //         },
  //         {
  //             "x": -597.751953125,
  //             "y": 3739.59130859375,
  //             "z": 23.9981689453125
  //         }
  //     ],
  //     "remark": "",
  //     "order": -1,
  //     "ground_id": null,
  //     "region_id_internal": null,
  //     "cameras": [
  //         {
  //             "id": "7B4044E33E0AA447F59887BACAD9B0ED",
  //             "camera_code": "e214c614d92b42a4aaa1d62562d586ad",
  //             "camera_name": "西广场西路南向北F13.40",
  //             "camera_area": {
  //                 "gid": "TEMP_SHAPE_D177",
  //                 "name": "TEMP_SHAPE_D177",
  //                 "type": 10300,
  //                 "typename": "polygon",
  //                 "style": "",
  //                 "color": "#00ff00",
  //                 "lighting": true,
  //                 "linestyle": "",
  //                 "attr": {
  //                     "id": "7B4044E33E0AA447F59887BACAD9B0ED",
  //                     "gid": "$AREA_CAMERA_7B4044E33E0AA447F59887BACAD9B0ED"
  //                 },
  //                 "linewidth": 1,
  //                 "scale": 1,
  //                 "points": [
  //                     {
  //                         "x": 30.40644073486328,
  //                         "y": 5969.72314453125,
  //                         "z": 19.99908447265625
  //                     },
  //                     {
  //                         "x": -669.54833984375,
  //                         "y": 4024.581298828125,
  //                         "z": 9.99969482421875
  //                     },
  //                     {
  //                         "x": 116.36253356933594,
  //                         "y": 3844.99853515625,
  //                         "z": 24.7371826171875
  //                     },
  //                     {
  //                         "x": 517.9996948242188,
  //                         "y": 4833.75390625,
  //                         "z": 9.9942626953125
  //                     },
  //                     {
  //                         "x": 168.1215057373047,
  //                         "y": 5943.68896484375,
  //                         "z": 9.99969482421875
  //                     }
  //                 ],
  //                 "linecolor": "#00ff00",
  //                 "linevisible": true,
  //                 "onMousePoint": {
  //                     "x": 0,
  //                     "y": 0,
  //                     "z": 0
  //                 },
  //                 "onMouse": false,
  //                 "bmin": {
  //                     "x": -670.5460815429688,
  //                     "y": 3843.99951171875,
  //                     "z": 9.9942626953125
  //                 },
  //                 "bmax": {
  //                     "x": 518.9988403320312,
  //                     "y": 5970.72314453125,
  //                     "z": 24.95099639892578
  //                 }
  //             }
  //         },
  //         {
  //             "id": "62B5F81F0A5A104C474B00BB5A11D03C",
  //             "camera_code": "aa3b323a68274f8b80cccc8b474c8bcd",
  //             "camera_name": "西北门向校内13.48",
  //             "camera_area": {
  //                 "gid": "TEMP_SHAPE_D624",
  //                 "name": "TEMP_SHAPE_D624",
  //                 "type": 10300,
  //                 "typename": "polygon",
  //                 "style": "",
  //                 "color": "#00ff00",
  //                 "lighting": true,
  //                 "linestyle": "",
  //                 "attr": {
  //                     "id": "62B5F81F0A5A104C474B00BB5A11D03C",
  //                     "gid": "$AREA_CAMERA_62B5F81F0A5A104C474B00BB5A11D03C"
  //                 },
  //                 "linewidth": 1,
  //                 "scale": 1,
  //                 "points": [
  //                     {
  //                         "x": 415.25634765625,
  //                         "y": 3967.742431640625,
  //                         "z": 40
  //                     },
  //                     {
  //                         "x": -1958.510986328125,
  //                         "y": 4599.33642578125,
  //                         "z": 10.772705078125
  //                     },
  //                     {
  //                         "x": -3754.226318359375,
  //                         "y": 903.5322265625,
  //                         "z": 10.000244140625
  //                     },
  //                     {
  //                         "x": -1741.420166015625,
  //                         "y": -917.6048583984375,
  //                         "z": 30.000244140625
  //                     }
  //                 ],
  //                 "linecolor": "#00ff00",
  //                 "linevisible": true,
  //                 "onMousePoint": {
  //                     "x": 0,
  //                     "y": 0,
  //                     "z": 0
  //                 },
  //                 "onMouse": false,
  //                 "bmin": {
  //                     "x": -3755.225830078125,
  //                     "y": -918.603515625,
  //                     "z": 10.000244140625
  //                 },
  //                 "bmax": {
  //                     "x": 416.256103515625,
  //                     "y": 4600.3330078125,
  //                     "z": 40.21189880371094
  //                 }
  //             }
  //         },
  //         {
  //             "id": "7B4044E33E0AA447F59887BACAD9B0ED",
  //             "camera_code": "e214c614d92b42a4aaa1d62562d586ad",
  //             "camera_name": "西广场西路南向北F13.40",
  //             "camera_area": {
  //                 "gid": "TEMP_SHAPE_D177",
  //                 "name": "TEMP_SHAPE_D177",
  //                 "type": 10300,
  //                 "typename": "polygon",
  //                 "style": "",
  //                 "color": "#00ff00",
  //                 "lighting": true,
  //                 "linestyle": "",
  //                 "attr": {
  //                     "id": "7B4044E33E0AA447F59887BACAD9B0ED",
  //                     "gid": "$AREA_CAMERA_7B4044E33E0AA447F59887BACAD9B0ED"
  //                 },
  //                 "linewidth": 1,
  //                 "scale": 1,
  //                 "points": [
  //                     {
  //                         "x": 30.40644073486328,
  //                         "y": 5969.72314453125,
  //                         "z": 19.99908447265625
  //                     },
  //                     {
  //                         "x": -669.54833984375,
  //                         "y": 4024.581298828125,
  //                         "z": 9.99969482421875
  //                     },
  //                     {
  //                         "x": 116.36253356933594,
  //                         "y": 3844.99853515625,
  //                         "z": 24.7371826171875
  //                     },
  //                     {
  //                         "x": 517.9996948242188,
  //                         "y": 4833.75390625,
  //                         "z": 9.9942626953125
  //                     },
  //                     {
  //                         "x": 168.1215057373047,
  //                         "y": 5943.68896484375,
  //                         "z": 9.99969482421875
  //                     }
  //                 ],
  //                 "linecolor": "#00ff00",
  //                 "linevisible": true,
  //                 "onMousePoint": {
  //                     "x": 0,
  //                     "y": 0,
  //                     "z": 0
  //                 },
  //                 "onMouse": false,
  //                 "bmin": {
  //                     "x": -670.5460815429688,
  //                     "y": 3843.99951171875,
  //                     "z": 9.9942626953125
  //                 },
  //                 "bmax": {
  //                     "x": 518.9988403320312,
  //                     "y": 5970.72314453125,
  //                     "z": 24.95099639892578
  //                 }
  //             }
  //         },
  //         {
  //             "id": "62B5F81F0A5A104C474B00BB5A11D03C",
  //             "camera_code": "aa3b323a68274f8b80cccc8b474c8bcd",
  //             "camera_name": "西北门向校内13.48",
  //             "camera_area": {
  //                 "gid": "TEMP_SHAPE_D624",
  //                 "name": "TEMP_SHAPE_D624",
  //                 "type": 10300,
  //                 "typename": "polygon",
  //                 "style": "",
  //                 "color": "#00ff00",
  //                 "lighting": true,
  //                 "linestyle": "",
  //                 "attr": {
  //                     "id": "62B5F81F0A5A104C474B00BB5A11D03C",
  //                     "gid": "$AREA_CAMERA_62B5F81F0A5A104C474B00BB5A11D03C"
  //                 },
  //                 "linewidth": 1,
  //                 "scale": 1,
  //                 "points": [
  //                     {
  //                         "x": 415.25634765625,
  //                         "y": 3967.742431640625,
  //                         "z": 40
  //                     },
  //                     {
  //                         "x": -1958.510986328125,
  //                         "y": 4599.33642578125,
  //                         "z": 10.772705078125
  //                     },
  //                     {
  //                         "x": -3754.226318359375,
  //                         "y": 903.5322265625,
  //                         "z": 10.000244140625
  //                     },
  //                     {
  //                         "x": -1741.420166015625,
  //                         "y": -917.6048583984375,
  //                         "z": 30.000244140625
  //                     }
  //                 ],
  //                 "linecolor": "#00ff00",
  //                 "linevisible": true,
  //                 "onMousePoint": {
  //                     "x": 0,
  //                     "y": 0,
  //                     "z": 0
  //                 },
  //                 "onMouse": false,
  //                 "bmin": {
  //                     "x": -3755.225830078125,
  //                     "y": -918.603515625,
  //                     "z": 10.000244140625
  //                 },
  //                 "bmax": {
  //                     "x": 416.256103515625,
  //                     "y": 4600.3330078125,
  //                     "z": 40.21189880371094
  //                 }
  //             }
  //         }
  //     ]
  // })
    console.log('查看轨迹', faceDetailList);
    // 画轨迹==============================
    let faceDetailData = faceDetailList.filter(x => x.ground_id === '') // 过滤地下的

    let map = new Map()
    for(let item of faceDetailData){
      map.set(item.indexCode,item)
    }
    let faceDetailFilter = [...map.values()]
    // let faceDetailFilter = [...faceDetailList]
    console.log('camera and door',faceDetailFilter);

    // 第二次点击隐藏, 是否合理性
    let devices = faceDetailFilter.filter((x) => x.options);
    if (devices.length === 0 || devices.length === 1) {
      message.warning('室外已上图的抓拍点数量为0或1个, 无法绘制');
      return;
    }

    let res = (await viewer.scene.apis.mapLocationApi.list({ location_name: '人脸定位' }))[0];
    console.warn('如果常用位置中有名称为 "人脸定位" 位置的话, 会优先定位到人脸定位的位置');
    if (res) {
      await viewer.camera.flyToPosition(res.position, false, 0.5);
    }

    await viewer.path.removeAllSearch(viewer);
    await viewer.path.createPathProcess(viewer, faceDetailFilter.filter(x => x.options).map((item) => {
      return {
        ...item.options.location,
        floor: item.indoor ? viewer.build.getFloorNameSmallByFloorId(item.floor_id) : 'W1'
      };
    }));

    // 显示分段路网, 默认比设备数少一个
    let _routeDataShow = JSON.parse(
      JSON.stringify(viewer.path.mosSearchRes)
    );
    _routeDataShow.forEach((x, i) => {
      x.device = devices[i];
      x.deviceNext = devices[i + 1];
    });
    console.log('路网结果', devices, viewer.path.mosSearchRes, _routeDataShow);

    // setLineList
    lineListFun(devices, viewer.path.mosSearchRes)


    // 人脸定位
    console.warn('如果常用位置中有名称为 "人脸定位" 位置的话, 会优先定位到人脸定位的位置');
    if (!res) {
      let locations = viewer.path.mosSearchRes.map(x => x.line.points).reduce((a, b) => a.concat(b));
      // 定位到所有点
      let loc = viewer.camera.getPointsLookupLocation(locations);
      setLoc(loc)
      await viewer.camera.flyToPosition(loc, false, 0.5);
      // TODO: 考虑室内定位
    }

  }

  function lineListFun(devices, viewerPathRes) {
    // let lineList = {}, devicesType = [], devicePoints = []
    // devices.forEach(item => {
    //   let listItem = {}
    //   listItem.camera_area = item;
    //   listItem.camera_code = item.camera_code;
    //   listItem.cameraCode = item.cameraCode
    //   listItem.camera_name = item.camera_name
    //   devicesType.push(listItem)
    // })
    // viewerPathRes.forEach(x => {
    //   x.line.points.forEach(y => {
    //     let listY = {}
    //     listY.x = y.x;
    //     listY.y = y.y;
    //     listY.z = y.z
    //     devicePoints.push(listY)
    //   })
    // })

    // lineList.cameras = devicesType
    // lineList.points = devicePoints
    let lineList = {}, devicesType = [], devicePoints = []
    // console.log(devices,'devices');
    devices.forEach(item => {
        let listItem = {}
        listItem.camera_area = item;
        listItem.camera_code = item.camera_code?item.camera_code:item.device_code;
        // listItem.cameraCode = item.cameraCode
        listItem.camera_name = item.camera_name?item.camera_name:item.device_name
        devicesType.push(listItem)
    })
    viewerPathRes.forEach(x => {
        x.line.points.forEach(y => {
            let listY = {}
            listY.x = y.x;
            listY.y = y.y;
            listY.z = y.z
            devicePoints.push(listY)
        })
    })

    lineList.cameras = devicesType
    lineList.points = devicePoints
    setLineList({ ...lineList });
  }


  /**
   * 获取人脸相机列表
   * @returns {Promise<void>}
   */
  const getFaceCameraList = async () => {
    let type = (
      await getFaceCameraTypeReq(api.deviceType.list({ type_name: '人脸' }))
    ).data[0];
    console.log('face list', type);
    let cameras = (
      await getFaceCameraListReq(
        api.deviceCamera.list({ category_id: type.type_code })
      )
    ).data;
    console.log('face list', cameras);
    cameras.sort((a, b) => {
      return a.camera_name.localeCompare(b.camera_name);
    });
    setFaceCameraList(cameras);
  };

  const handlePlayBack = (item) => {
    console.log(item, 'item');
    if(item.camera_code){
      videoPlay(item, "BackplayAlarm", ((msg) => {
        let timestamp = Date.parse(new Date()) + "video";
        dispatch(changeIsvideo(timestamp))
      }))
    }else{
      message.info("该点位是门禁点位")
    }

  }

  //巡更相关
  /**
 * @type {PatrolsRouteServiceClass}
 */
  let PatrolsRouteService;

  // let patrolLineApi;
  let patrolLock = new utils.Lock();
  let waitTime = 5;
  // let api = new Api();

  let areaModelList = [];
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

    static PATROLS_LINE = 'PATROLS_LINE';

    static PATROLS_HISTORY = 'PATROLS_HISTORY';
  }
  const [speed, setSpeed] = useState(10);
  const [linePitch, setLinePitch] = useState(45);
  const [lineDistance, setLineDistance] = useState(2000)
  const [lineVisible, setLineVisible] = useState(false);
  const [electrolShow, setElectrolShow] = useState(true)
  const [videoPosVisible, setVideoPosVisible] = useState(false);
  const [videoAreaVisible, setVideoAreaVisible] = useState(false);
  const [lineList, setLineList, lineListRef] = hooks.useStateAndRef([]);
  /**
 * 是否循环播放
 */
  const [isLineLoop, setIsLineLoop] = useState(true);
  /**
  * 视频巡逻状态
  * @type {PatrolEnum}
  */
  const [xlState, setXLState, xlStateRef] = hooks.useStateAndRef(PatrolEnum.STOP);
  const [xlCurr, setXLCurr, xlCurrRef] = hooks.useStateAndRef(null);
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

  const patrolPauseFuncRef = useRef(e => {
    setXLState(PatrolEnum.PAUSE);
  });

  /**
 * 显示运行时界面
 */
  const showRuntimeLeft = () => {
    // let item = document.createElement('div');
    // item.id = 'patrolsRuntime';
    // document.body.append(item);
    setElectrolShow(false)
  }

  const pauseRoute = async () => {
    await viewer.drawer.pauseRoute();
    setXLState(PatrolEnum.PAUSE);
  };

  /**
   * 遇到可视区域的停止方法
   * @returns {Promise<void>}
   */
  const pauseRouteForWait = async () => {
    setXLState(PatrolEnum.PAUSE_FOR_WAIT);
    console.log('xlStateRef.current', xlStateRef.current);
    await viewer.drawer.pauseRoute();
  };

  /**
   * 继续巡逻
   * @param cb
   * @returns {Promise<void>}
   */
  const resumeRoute = async (cb) => {
    await viewer.drawer.resumeRoute(cb);
    setXLState(PatrolEnum.START);
    console.log('xlStateRef.current', xlStateRef.current);
  };
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */

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
   * @returns {Promise<void>}
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
   * 绘制当前位置
   * @param pos
   * @returns {Promise<void>}
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
   * @returns {Promise<void>}
   */
  const removePosNow = async () => {
    if (!videoPosVisible) {
      return;
    }
    await viewer.drawer.overLayerRemoveObjectById('VIDEO_ROUTE_POS');
  };
  /**
   * 获取吓一跳路线
   * @param idx
   * @returns {*}
   */
  const getLineNext = (idx) => {
    // return lineListRef.current[(idx) % lineListRef.current.length];
    // 路线的处理
    console.log(lineListRef.current, 'lineListRef.current');
    return lineListRef.current
  };

  /**
* 循环巡逻, 点击按钮, 开始巡检
* @param line
* @returns {Promise<unknown>}
*/
  const startXL = useCallback(async (idx) => {
    let isLineLoopInner = true; // 退出时使用内部变量, 不影响外部变量
    let idxTmp = idx;
    setXLState(PatrolEnum.START);
    // while (isLineLoop && isLineLoopInner) {
    //
    // while (xlStateRef.current === PatrolEnum.START) {
      
      // 获取路线
      let line = getLineNext(idxTmp);

      setXLCurr(line);
      // 添加巡逻历史记录
      // await addPatrolHistory(line);

      // let cameraData = line.cameras;
      let _cameraData = line.cameras.filter(x=>{ return x.camera_area.resourceType === 'camera' && x.camera_area.camera_area != null})
      // idxTmp++;
      const hasObj = {};
      let cameraData = []
      for (let i = 0; i < _cameraData.length; i++) {
        if (!hasObj[_cameraData[i].camera_code]) {
          cameraData.push(_cameraData[i])
          hasObj[_cameraData[i].camera_code] = true
        }
     }

      // cameraData = Array.from(new Set(cameraData))
      console.log('视频编码去重', cameraData);

      if (line.points && line.points.length === 0) {
        console.warn('路线的点数组为空');
        // continue;
      }

      // 抬高z
      line.points.forEach(x => {
        x.z += 1;
      });

      // 先分层, 再创建轨迹
      // if (line.ground_id) {
      //   await viewer.build.mgr.showFloorUndergroundByUnderId(viewer, line.ground_id);
      //   await viewer.scene.service.sceneBuildService.setFloorListUndergroundVisibleEvent.triggerAll(
      //       viewer,
      //       true
      //   );
      // } else if (line.indoor === true) {
      //   await viewer.build.mgr.splitAndShowFloor(viewer, line.build_id, line.floor_id);
      // } else {
      // // 室外
      // await viewer.build.mgr.setUndergroundVisible(viewer, false);
      // await viewer.build.mgr.resetAllBuildingWrap(viewer);
      // }
      // 室外
      await viewer.build.mgr.setUndergroundVisible(viewer, false);
      await viewer.build.mgr.resetAllBuildingWrap(viewer);
      // 先分层, 再创建轨迹
      let map = new Map()
      for(let item of line.cameras){
        if(item.camera_area.build_id !== '' && item.camera_area.floor_id !== ''){
            // map.set(item.camera_code,item)
            map.set(item.camera_area.build_id,item)
        }
      }
      let buildFilter = [...map.keys()]

      let param = {"group_id":buildFilter}
      //
      let buildList = await getBuildList(api.config.apiGet.build_list(param))
      if(buildList.success){
        await (new Promise(resolve =>{
          // 5.5分层
          buildList.data?.forEach((element)=>{
            Build.showFloorShow(viewer.core.view3d,element.group_id,element.floors)
          })
          setTimeout(() => {
            resolve();
          }, 100);
        }))
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
          isLineLoopInner = false;
          await PatrolsRouteService.removeRouteObj();
          resolve({ cancel: true });
        };
        patrolFuncRef.current = async msg => {
          if (xlStateRef.current !== PatrolEnum.START) {
            return;
          }
          await patrolLock.lock();
          if (msg && msg.x && showDataPoint) { // 没有到达终点
            // console.log(cameraData,msg,'======================');
            cameraCurr = getInPolygonCamera(cameraData, msg)[0];
            // 如果和上一个视频不同
            if (cameraCurr && cameraLast !== cameraCurr) {
              cameraLast = cameraCurr;
              // 创建设备标注
              await createVideoFlag(cameraCurr.camera_code);
              // onPreview(cameraCurr); // 上传视频对象,播放视频
              console.log(cameraCurr, 'cameraCurr');

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
              console.log(cameraCurrItem, ' cameraCurrItem ');
              // videoPlay(cameraCurrItem, "playVideo", ((msg) => {
              //   let timestamp = Date.parse(new Date()) + "video";
              //   dispatch(changeIsvideo(timestamp))
              // }))


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
              // console.log(1111111);
              setElectrolShow(true)
            }
          }

          await patrolLock.unlock();
        };

        playRoute(patrolFuncRef.current);
      });
    // }
  }, [speed, isLineLoop, lineVisible, linePitch, lineDistance]);

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
      polygonArr = camera.camera_area?.camera_area?.points.map(x => {
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
  };

  /**
   * 点击开始按钮
   * @param x
   * @returns {Promise<void>}
   */
  const handlePatrols = async () => {
    if (xlStateRef.current === PatrolEnum.STOP) { // 没有巡逻
      // 添加元素
      showRuntimeLeft();
      await viewer.path.removeAllSearch(viewer);
      await startXL(0);
      // await onPlayRouteEnd();
    } else { // 正在巡逻
      patrolStopFuncRef.current();
    }
    // 巡逻结束后的动作
    await stopRoute();
  };

  /**
   * 播放巡逻路线
   * @param cb
   * @returns {Promise<void>}
   */
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
 * // 结束巡逻
 * @returns {Promise<void>}
 */
  const stopRoute = async () => {
    await viewer.drawer.stopRoute();

    setXLState(PatrolEnum.STOP);

    await patrolStopFuncRef.current();

    // 添加地图移动事件监听
    document.getElementById(viewer.config.id).getElementsByTagName('video')[0]
      .removeEventListener('mousedown', patrolPauseFuncRef.current);

    await removeVideoArea();
    await removePosNow();

    viewer.core.clear();

    await viewer.camera.flyToPosition(loc, false, 0.5);
    // stopPlay();
  };

  useEffect(() => {

    (async () => {
      PatrolsRouteService = new PatrolsRouteServiceClass(viewer);

      // patrolLineApi = `${viewer.config.api}/patrol/line`;
      // await getLinePatrol();

      // await getPatrolHistory()
    })()


    return () => {
      PatrolsRouteService.removeRouteObj();
    };
  }, []);

  return (
    <>
      <div id="faceRetrieval" className=" animate__animated animate__slideInLeft">
        <div className="title-primary">人脸应用</div>
        <div className="tab-buttons">
          {/* <button
            className={activeTab === 0 ? 'active' : 'btnoff'}
            onClick={() => handleTabClick(0)}
          >
            相机列表
          </button> */}
          <button
            className={activeTab === 1 ? 'active' : 'btnoff'}
            onClick={() => handleTabClick(1)}
          >
            人脸检索
          </button>
          <button
            className={activeTab === 2 ? 'active' : 'btnoff'}
            onClick={() => handleTabClick(2)}
          >
            人脸库
          </button>
        </div>
        <div className="tab-content">
          {/*相机列表*/}
          {activeTab === 0 && <div className="tabContent_camera">

            {
              faceCameraList.map((item, index) => {
                return (<div key={index}>
                  {item.camera_name}
                </div>)
              })
            }
          </div>}
          {/*人脸检索tab*/}
          {(activeTab === 1 || activeTab === 2) && <div className="rljs">
            <div className="SearchCriteria">
              <div className="UploadImg">
                <span
                  className="shangchuan"
                  onClick={() => {
                    inputRef.current.click();
                  }}>
                  <input
                    type="file"
                    id="optUrl"
                    ref={inputRef}
                    hidden
                    accept=".jpg,.jpeg,.png"
                    onClick={(e) => {
                      inputRef.current.value = '';
                    }}
                    onChange={(e) => chooseImg(e)}
                  />
                </span>

                {/* 预览图片 */}
                {imgUpload ? (
                  <img className="uploaded-img" src={imgUpload} alt="" />
                ) : (
                  <div className={'uploaded_img_empty'} />
                )}
              </div>
              <div className="SearchRight">
                <Input
                  value={certNoId}
                  className="personId"
                  onChange={handlePersonId}
                  placeholder="请输入人员id"
                />
                <Space direction="vertical" size={12}>
                  <DatePicker
                    className="startTime"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="起始时间"
                    showTime={{
                      defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                    }}
                    locale={locale}
                    value={time.stime}
                    onChange={(date, dateString) => {
                      console.log(date, dateString);
                      if (!date) {
                        return;
                      } else {
                        // console.log(date, dateString, 'dateString')
                        setTime({ ...time, stime: date });
                        setSearchParam({
                          ...searchParam,
                          startTime: date.format(faceTimeFormat)
                        });
                      }
                    }}
                  />
                </Space>
                <Space direction="vertical" size={12}>
                  <DatePicker
                    className="startTime"
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="终止时间"
                    showTime={{
                      defaultValue: dayjs('00:00:00', 'HH:mm:ss'),
                    }}
                    locale={locale}
                    value={time.etime}
                    onChange={(date, dateString) => {
                      if (!date) {
                        return;
                      } else {
                        setTime({ ...time, etime: date });
                        setSearchParam({
                          ...searchParam,
                          endTime: date.format(faceTimeFormat)
                        });
                      }
                    }}
                  />
                </Space>
                {/* 相似度:<InputNumber
                  min={50}
                  max={100}
                  defaultValue={80}
                  className="Numberinput"
                  onChange={(e) => {
                    // console.log('设置相似度', e);
                    setSearchParam({ ...searchParam, similarity: e });
                  }}
                /> */}
              </div>
            </div>
            <div className="sousuo"
              onClick={async () => {
                await searchFaceDateList();
              }}
            >搜索
            </div>
            <div className="sousuoresult">人脸轨迹搜索结果</div>

            {/* 人脸日期记录 */}
            <Spin spinning={isFaceDataLoading}>
              <div className="SSresult">
                <div className="suosuotitle">
                  <span >序号</span>
                  <span >时间</span>
                  <span >次数</span>
                </div>
                <div className="Ssend">
                  {faceData.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="sSlist"
                        onClick={() => {
                          console.log('查询一天的人脸列表');
                          captureDetail(item, index);
                        }}
                      >
                        <span >{index + 1}</span>
                        <span >{item.date}</span>
                        <span >{item.list.length}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Spin>

          </div>}
          {/*人脸库*/}
          {activeTab === 2 && <div>
            {/* 人脸库 */}
            {
              isFaceLibShow ? <div className="renData animate_speed animate__animated animate__fadeInDown">
                <div className="renData_header">
                  <h1>人脸库</h1>
                  <img className="cha" src={require('../../assets/img/icon_close.png')} alt=""
                    onClick={() => { setIsFaceLibShow(false); setLibParam({ ...libParam, name: "", certificateNum: "" }); }} />
                </div>
                <div className="condition">
                  <div className="seach_name">
                    <input
                      type="text"
                      placeholder="输入姓名"
                      value={libParam.name}
                      onKeyDown={(e) => {
                        // console.log('人脸库搜索框回车', e);
                        if (e.key === 'Enter') {
                          faceDatabase();
                        }
                      }}
                      onChange={(e) => {
                        setLibParam({ ...libParam, name: e.target.value });
                      }}
                    />

                    <input
                      type="text"
                      placeholder="输入证件号"
                      value={libParam.certificateNum}
                      onKeyDown={(e) => {
                        // console.log('人脸库搜索框回车', e);
                        if (e.key === 'Enter') {
                          faceDatabase();
                        }
                      }}
                      onChange={(e) => {
                        setLibParam({ ...libParam, certificateNum: e.target.value });
                      }}
                    />

                  </div>
                  <div className="search_button" onClick={() => {
                    console.log('查询人脸库');
                    faceDatabase();
                  }}>搜索</div>
                </div>
                {/* 人脸库列表 */}
                <div className="dataList">
                  {faceImgList.length > 0 ? (
                    faceImgList.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className="imgimg_face"
                          onClick={() => {
                            handleImg(item);
                          }}
                        >
                          <img src={item.face_url} alt="" />
                          <div className="imgrightbox_face">
                            <div className="imgtext_face">
                              <span>姓名：</span>
                              <span className="imgname_face">{item.name}</span>
                            </div>
                            <div className="imgtext_face">
                              <span>证件：</span>
                              <span>{item.certificateNum}</span>
                            </div>
                            <div className="imgtext_face">
                              <span>性别：</span>
                              <span>
                                {item.sex?.toString() === '0' ? '女' : '男'}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Empty />
                  )}


                </div>

                {/* 分页 */}
                <Pagination
                  className={'faceListPage'}
                  defaultCurrent={libParam.pageNo}
                  pageSize={libParam.pageSize}
                  total={libParam.total}
                  onChange={(pageNo, pageSize) => {
                    setLibParam({ ...libParam, pageNo, pageSize });
                    setTimeout(() => {
                      console.log('分页', pageNo, pageSize, libParam);
                      faceDatabase({
                        pageNo: pageNo,
                        pageSize: pageSize,
                        name: libParam.name,
                        certificateNum: libParam.certificateNum,
                      });
                    }, 100);
                  }}
                />

              </div> : null
            }
          </div>}

          {/*人脸抓拍照片*/}
          {/* {faceCaptureListshow ? */}
          {isFaceDetailShow ?
            <div className={"faceCapture animate_speed animate__animated animate__fadeInDown " + (isFaceDetailFold ? 'faceDetailFold' : 'faceDetailUnFold')}>
              <div className="renData_header">
                <h1>人脸抓拍明细</h1>

                {/* 查看轨迹效果 ========================================= */}
                <div className="renData_electrol">
                  {
                    electrolShow ? <div className="renData_xl"
                      onClick={() => { setElectrolShow(false); handlePatrols(); }}
                    >
                      开始巡更
                    </div> : <div className={'patrolsRuntime'}>
                      <div className={'patrols_runtime_container'}>
                        <div className={'runtime_container_toolbar'}>
                          <div className={1 ? 'patrols_runtime_btn' : 'patrols_runtime_btn_select'}
                            onClick={async e => {
                              if (xlStateRef.current === PatrolEnum.PAUSE) {
                                await resumeRoute(patrolFuncRef.current);
                              } else {
                                await pauseRoute();
                              }
                              console.log('xlState', xlStateRef.current);
                            }}
                          >
                            {xlState === PatrolEnum.PAUSE ? '继续' : '暂停'}
                          </div>
                          <div className={'patrols_runtime_btn'}
                            onClick={async e => {
                              setElectrolShow(true)
                              await stopRoute();
                            }}
                          >退出
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                </div>

                <div className="iconRight">

                  {/* 折叠按钮 */}
                  <img
                    className="iconFold"
                    src={
                      isFaceDetailFold
                        ? require('../../assets/img/unfold.png')
                        : require('../../assets/img/fold.png')
                    }
                    alt=""
                    onClick={async () => {
                      setIsFaceDetailFold(!isFaceDetailFold);
                    }}
                  />

                  <img className="cha" src={require('../../assets/img/icon_close.png')} alt=""
                    onClick={async () => {
                      setIsFaceDetailShow(false);
                      setElectrolShow(true)
                      let map = viewer;
                      await map.path.removeAllSearch(map);
                      await stopRoute();
                      await viewer.path.removeAllSearch(viewer);
                      await viewer.build.mgr.resetAllBuildingWrap(viewer)
                    }}
                  />
                </div>

              </div>
              <div className="carCapturList">
                <div style={{ display: 'flex' }} className="carCapturetitle">
                  <div style={{ width: '14%' }}>序号</div>
                  <div style={{ width: '15%' }}>照片</div>
                  <div style={{ width: '24%' }}>室内/室外</div>
                  {/* <div style={{ width: '18%' }}>楼层</div> */}
                  <div style={{ width: '56%' }}>点位名称</div>
                  <div style={{ width: '40%' }}>时间</div>
                  <div style={{ width: '9%' }}>操作</div>
                </div>
                <div className="carCapturesend">
                  {
                    faceDetailList.length > 0 && faceDetailList.map((item, index) => {
                      return (<div key={index} style={{ display: 'flex' }} className={false ? "active" : "sSlist"}>
                        <div style={{ width: '7%' }}>{index + 1}</div>
                        <div style={{ width: '13%' }}>
                          <Image
                            className="carImg"
                            // src={item.face_pic_url ? item.face_pic_url : ""}
                            src={item.imageUrl?decodeISCFaceCaptureImage(item.imageUrl):''}
                          />
                        </div>

                        <div style={{ width: '14%' }}>{item.indoor === false ? '室外' : '室内'}</div>
                        {/* <div style={{ width: '8%' }}>{!item.floor_name ? '空' : item.floor_name}</div> */}
                        <div style={{ width: '36%' }}>{item.camera_name ? item.camera_name : item.device_name?item.device_name:'该点位没有名称'}</div>
                        <div style={{ width: '24%' }}>{item.capture_time}</div>
                        <div style={{ width: '0%' }} onClick={() => { handlePlayBack(item) }}>
                          <div className="carHFImg"></div>
                        </div>
                      </div>)
                    })

                  }

                </div>

              </div>

              <div className="faceSearch" onClick={async () => { await searchRoute() }}>
                查看轨迹
              </div>

            </div>
            : <></>}
          {/* 详细的人脸 */}


        </div>

      </div>

    </>

  );
};

export default FaceRetrieval;
