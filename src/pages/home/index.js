import { useCallback, useEffect, useMemo, useState } from 'react'
import IoT from 'tuyang-iot'
import { utils } from 'tuyang-shared'
import * as echarts from 'echarts'
import { DatePicker, message } from 'antd'
import { api } from '../../api/config'
import Theounds from './component/therounds'
import moment from 'moment/moment'
import BaojingPie from './component/EchartsData'
import Shebei from './component/shebei'
import Jiankong from './component/jiankong'
import Xunluo from './component/xunluo'
import Searchs from './component/Search'
import Photograph from './component/photograph'
import ModalData from './component/caputre/modaldata'
import Videofusion from './component/videofusion'
import { BaoJing, Qitian, Yitian } from '../../api/home'
import Medikits from '../../layouts/ToolBox/index'
// import FaceRetrieval from './component/faceRetrieval'
import MapContainer from '../../components/MapContainer'
import zhCN from 'antd/es/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
import dayjs from 'dayjs'
import './index.scss'
import 'react-datetime/css/react-datetime.css'
import '../../assets/styles/utils.scss'
import 'antd/dist/antd.css'
// 上图
import axios from 'axios'
// import { usePlayer, setPlatform, platformInfo } from 'tuyang-module-components';

moment.locale('zh-cn')

const EventBus = utils.EventBus
let apiInterface = null
let view3d = null
let viewer = null
export const getApi = () => apiInterface

export const getViewer = () => viewer

const Home = () => {
  const [iotFooterVisible, setIotFooterVisible] = useState(false)
  const [timeNow, setTime] = useState({ date: '', week: '', time: '' })
  const [taunt, setTaunt] = useState(false)
  const [activeTabs, setActiveTabs] = useState('tab1')
  const [apparatu, setApparatu] = useState(false)
  const [similarity, setSimilarity] = useState(80)
  // const [face, setFace] = useState(false)
  const [locale, setLocale] = useState('zh') // 设置语言为中文
  const [caputre, setCaputre] = useState(false)
  const [analarm, setAnalarm] = useState([])
  const [trajectory, setTrajectory] = useState(false)
  const [qitian, setQitian] = useState([])
  const [selectedRow, setSelectedRow] = useState(null)
  const [imgSrc, setImgSrc] = useState(null)
  const [tag, setTag] = useState('7')
  const [tags, setTags] = useState({})
  const [selectedDate, setSelectedDate] = useState(null)
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isEndDateDisabled, setIsEndDateDisabled] = useState(false)
  /*上图*/
  const [otherDevices, setotherDevices] = useState()
  const [ready, setReady] = useState(false)
  const [vfusion, setVfusion] = useState(false)
  /*ending*/
  //报警列表
  const alarmlist = () => {
    BaoJing().then((res) => {
      console.log(res.data)
      setAnalarm(res.data.data)
    })
  }
  //报警详情
  const alarmlistp = (index) => {
    BaoJing().then((res) => {
      console.log(res.data.data[index])
      setTags(res.data.data[index])
    })
  }

  const handleSimilarityChange = (event) => {
    const value = event.target.value
    setSimilarity(value)
  }
  const handleStartDateChange = (date, da) => {
    setStartDate(date)
    // setIsEndDateDisabled(date && new Date(date) < new Date(endDate)); // 禁用结束日期选择器如果开始日期早于当前选定的结束日期
    console.log('da', da)
    console.log('new Date(date)', new Date(date))
    console.log('new Date(endDates)', new Date(startDate))
  }
  const handleEndDateChange = (date, da) => {
    // setIsEndDateDisabled(date && new Date(date) < new Date(endDate));
    if (new Date(date) < new Date(startDate)) {
      console.log(new Date(startDate), 'new Date(startDate)')
      message.info('结束时间不能小于开始时间')
      return
    }
    setEndDate(date)

    console.log('da', date, da)
  }

  const onCapture = (event) => {
    setCaputre(true)
  }
  const onBack = () => {
    setCaputre(false)
  }
  const measurement = (tab) => {
    setActiveTabs(tab)
  }
  const onSiren = (liId) => {
    setSelectedRow(liId)
    setApparatu(true)
  }
  const onBacks = () => {
    setApparatu(false)
  }
  const onInspect = () => {
    console.log(moment(startDate).format('YYYY-MM-DD HH:mm:ss'))
    console.log(moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
    if (moment(startDate).format('YYYY-MM-DD HH:mm:ss') == 'Invalid date') {
      message.info('请选择开始时间')
      console.log('roccoo')
    } else if (
      moment(endDate).format('YYYY-MM-DD HH:mm:ss') == 'Invalid date'
    ) {
      message.info('请选择结束时间')
    } else if (startDate !== null && endDate !== null) {
      setTrajectory(true)
    }

    // 简单粗暴版
    // if (startDate !== null && endDate !== null ) {
    //   setTrajectory(true)
    //   console.log('roccoo')
    // }
  }

  const onSearch = () => {
    setTrajectory(false)
  }

  const handleItemClick = (item) => {
    // 处理点击下拉列表项的逻辑
    console.log(`Clicked on ${item}`) // 这里可以根据需要进行其他操作
  }

  // 监听来自主页相关的事件信号
  useEffect(() => {
    // sevendays()
    alarmlist()
    showtime()

    // 示例 - 场景切换
    EventBus.on('scene_change', (payload) => {})
  }, [])

  const onEchartsData = () => {
    var chartDom = document.getElementById('mainEcharts')
    var myChart = echarts.init(chartDom)
    var option
    option = {
      xAxis: {
        // type: 'time',
        type: 'category',
        // timeNow:'date',
        boundaryGap: false,
        data: qitian[0]?.x,
        // data: ['12-10', '12-11', '12-13', '12-14', '12-15', '12-16', '12-17'],
        axisLine: {
          lineStyle: {
            show: true, //是否显示坐标轴轴线，
            color: 'white', //x轴轴线的颜色
            width: 1 //x轴粗细
          }
        },
        splitLine: {
          show: false // 不显示网格线
        }
      },
      yAxis: {
        type: 'value',
        boundaryGap: false,
        data: qitian[0]?.y,
        axisLine: {
          lineStyle: {
            show: true,
            color: 'white',
            width: 1,
            opacity: 0.5
          }
        },
        splitLine: {
          show: false // 不显示网格线
        }
      },

      series: [
        {
          data: qitian[0]?.y,
          type: 'line',
          areaStyle: {}
        }
      ]
    }
    console.log(qitian, 'qitian123')
    option && myChart.setOption(option)
  }
  // useEffect(() => {
  //   onEchartsData()
  // }, [qitian])

  const sevendays = () => {
    Qitian().then((res) => {
      console.log(res.data.data, '123123123')
      setQitian(res.data.data)
    })
  }

  const sevendaysOne = () => {
    Yitian().then((res) => {
      console.log(res.data.data, '123')
      setQitian(res.data.data)
    })
  }
  /*上图   ygq*/
  const cameralist = async (viewer) => {
    try {
      const [cameradata] = await Promise.all([
        axios.post(`${api.baseURL}/device/camera/list`, null)
      ])
      const DoormodelAdapter = viewer.model.getAdapter()
      const [Doordata] = await Promise.all([
        axios.post(`${api.baseURL}/device/info/list`, [])
      ])
      const devices = [...cameradata.data.data, ...Doordata.data.data]

      // const Doorandcamera = cameradata.data.data.concat(Doordata.data.data)
      // console.log(Doorandcamera,"合并之后是啥")
      // console.log(devices, "devices");
      // setotherDevices(Doordata.data.data)
      if (devices.length > 0) {
        // setcameradata(cameradata.data.data)

        await viewer.model.options.setDefault({
          imageScreen: false,
          imageScale: 1,
          modelText: true,
          modelScale: 0.6,
          fontSize: 24,
          defaultLocate: true
        })

        await DoormodelAdapter.setAll(devices, {
          onMap: false
        })
        await DoormodelAdapter.setVisible({
          outdoor: true,
          visible: true
        })
      } else {
        throw new Error(Doordata.data.msg)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (tag == 7) {
      console.log(101010)
      sevendays()
    } else {
      console.log(10010101)
      sevendaysOne()
    }
    // onEchartsData()
    console.log(tag)
  }, [tag])

  const handleSuccess = useCallback((viewerInstance) => {
    viewer = viewerInstance
    const config = viewer.core.config
    window.$viewer = viewerInstance
    if (config.footer !== undefined) {
      setIotFooterVisible(!!config.footer)
    }

    // 设置基础空间数据库的接口地址
    api.setUrl(config.api)

    apiInterface = api

    // 设置 DIS 平台的接口地址
    api.dis.setUrl(config.dis)

    // 设置 DIS 平台 的token
    // api.dis.fetchToken();

    // 有第三方平台的对接是，需要把其平台IP配置好在 config.json 中
    // api.config.setUrl(config.hkApi)
    cameralist(viewerInstance)

    // 需要预先设置好,视频流对接的安防平台(海康: ISC, 大华: ICC)
    // if (config.platform) {
    //   setPlatform(config.platform);
    // }
    // else{
    //   setPlatform({
    //     "name": "ICC",
    //     "type": "WEB",
    //     "protocol": "rtsp",
    //     "directPlay": false,
    //     "appKey": "",
    //     "appSecret": "",
    //     "ip": "",
    //     "port": 443
    //   })
    // }
    // 如果是页面是被嵌套(作为 iframe )，且需要和首页通过 postMessage 通信，
    // 可以通过一下的 messageController 通信
    // messageController.subscribe("*");

    // 通知主页，三维已完成初始化
    // messageController.dispatch({
    //   type: 0x00000000
    // });
    setReady(true)
  }, [])

  // 切换功能模块
  const onModuleChange = useCallback((tab) => {
    console.log(tab) // tab = null.表示关闭了某个功能模块
  }, [])

  const renderIot = useMemo(
    () => (
      <IoT
        onSuccess={handleSuccess}
        footer={iotFooterVisible}
        onModuleChange={onModuleChange}
        login={false}
        onCameraClick={() => null}
      />
    ),
    [handleSuccess, iotFooterVisible, onModuleChange]
  )

  const showtime = () => {
    setTime({
      date: moment().format('YYYY-MM-DD'),
      week: moment().format('dddd'),
      time: moment().format('HH:mm:ss')
    })
    setTimeout(showtime, 1000)
  }

  const getWeek = (date) => {
    let week = moment(date).day()
    switch (week) {
      case 1:
        return '星期一'
      case 2:
        return '星期二'
      case 3:
        return '星期三'
      case 4:
        return '星期四'
      case 5:
        return '星期五'
      case 6:
        return '星期六'
      case 0:
        return '星期日'
    }
  }
  const onsizefo = () => {
    setTaunt(true)
  }
  const onfusion = () => {
    setVfusion(true)
  }
  const onClosevideo = () => {
    setVfusion(false)
  }
  const onmanufacturer = () => {
    setTaunt(false)
  }
  // const styles = {
  //   green: {
  //     color: '#FFB660 '
  //   },
  //   red: {
  //     color: '#FF6060 '
  //   },
  //   blue: {
  //     color: '#FFDC60'
  //   }
  // }
  // const style = styles[color]
  const alarmLevelColor = {
   一般: '#FFB660', 
    严重: '#FF6060', 
    轻微: 'FFDC60' 
  }
  const alarmLeves = {
   已处理: '#85BFE5', 
    未处理: '#E58B85 ', 
    误报: '#E5AD85 ' 
  }

  const Render = useMemo(
    () => <MapContainer onSuccess={handleSuccess} />,
    [ready]
  )

  return (
    <>
      {Render}
      {ready ? (
        <div id="background-max">
          {/* <div id='sceneVideoPatrol_ctrl_container'></div> */}
          <div id="background-img">
            <div id="header">
              <div className="parcel">
                <div className="SchoolBadge"></div>
                <div className="SchoolName">山东师范大学智能管理平台</div>
              </div>
            </div>
            <div id="round">
              <div className="date-time">
                <div className="Real-time">{timeNow.time}</div>
                <div className="real-totality">
                  <p className="Real-date">{timeNow.date}</p>
                  <p className="real-week">{getWeek()}</p>
                </div>
              </div>
              <div className="round-left">
                <div className="round-left-top">
                  <p className="round-left-img"></p>
                  <p className="round-left-font">设备管控</p>
                </div>
                <div
                  className="button-merge"
                  onClick={() => {
                    onfusion()
                  }}
                >
                  视频融合
                </div>
                {/* <Videofusion></Videofusion> */}
                <div
                  className="button-manage"
                  onClick={() => {
                    onsizefo()
                  }}
                >
                  巡更管理
                </div>
                <Shebei></Shebei>
                <div className="round-left-middle">
                  <p className="round-left-img"></p>
                  <p className="round-left-font">视频监控</p>
                  <Jiankong></Jiankong>
                </div>
                <Xunluo></Xunluo>
              </div>
              <div className="round-right">
                <div className="round-right-guiji">
                  {/* 人脸轨迹 */}
                  {/* <Guiji></Guiji> */}
                  {/* <FaceRetrieval></FaceRetrieval> */}
                  <div className="one">
                    <div className="round-left-top">
                      <p className="round-left-img"></p>
                      <p className="round-left-font">人脸轨迹</p>
                    </div>
                    <div className="round-left-header">
                      <p className="hunt-down" onClick={onCapture}>
                        <img
                          src={`${
                            imgSrc
                              ? imgSrc
                              : '../../assets/styles/images/img_zp.png'
                          }`}
                          className="hunt-down-img"
                        />
                      </p>
                      <div className="down-input">
                        <div className="data-span-right">
                          <div style={{ color: 'white' }}>相似度:</div>
                          <div className="similarity-percent">
                            <input
                              className="similarity-percent1"
                              type="range"
                              min="0"
                              max="100"
                              // step="1"
                              value={similarity}
                              onChange={handleSimilarityChange}
                              style={{ width: '80%' }}
                            />
                          </div>
                          <span
                            className="c-percent"
                            style={{ color: 'white' }}
                          >
                            {similarity}%
                          </span>
                        </div>
                        <div>
                          <div className="calendar">
                            <div className="calender-time">
                              <div className="initiate">开始时间</div>
                              <DatePicker
                                className="datepicker-left"
                                placeholder="开始时间"
                                value={startDate}
                                showTime={{
                                  defaultValue: dayjs('00:00:00', 'HH:mm:ss')
                                }}
                                onChange={handleStartDateChange}
                                locale={zhCN}
                                selected={startDate}
                                // suffixIcon={<CaretDownOutlined/>}
                              />
                            </div>
                            <div className="calender-end">
                              <h3 className="initiate">结束时间</h3>
                              <DatePicker
                                className="datepicker-right"
                                placeholder="结束时间"
                                value={endDate}
                                showTime={{
                                  defaultValue: dayjs('00:00:00', 'HH:mm:ss')
                                }}
                                onChange={handleEndDateChange}
                                locale={zhCN}
                                selected={endDate}
                                disabled={isEndDateDisabled} // 禁用结束日期选择器如果开始日期早于当前选定的结束日期
                                // locale={locale}
                                // disabledDate={disableData}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="Capture-photograph">
                          <div className="Capture-library">
                            <div className="Capture-library-left">抓拍库</div>
                            <div
                              className="Capture-library-right"
                              // onClick={() => {
                              //   onofce()
                              // }}
                            >
                              人脸库
                            </div>
                          </div>
                          <div
                            className="Capture-search"
                            onClick={() => {
                              onInspect()
                            }}
                          >
                            <div className="Capture-search-img"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* 报警管理 */}
                <div className="two">
                  <div className="round-left-top">
                    <p className="round-left-img"></p>
                    <p className="round-left-font">报警管理</p>
                  </div>
                  <div className="round-left-header">
                    <BaojingPie></BaojingPie>
                  </div>
                </div>
                {/* 报警趋势 */}
                <div className="there">
                  <div className="round-left-top">
                    <p className="round-left-img"></p>
                    <p className="round-left-font">报警趋势</p>
                    <div className="round-select-img"></div>
                    <select
                      className="round-left-select"
                      name="fruits"
                      onChange={(e) => {
                        setTag(e.target.value)
                      }}
                    >
                      {/* <select name="fruits"> */}
                      <option value="7" className="round-left-option">
                        近七天
                      </option>
                      <option value="1" className="round-left-option">
                        当天
                      </option>
                      {/* <option value="cherry" className="round-left-option">
                    近30天
                  </option> */}
                    </select>
                  </div>
                  <div className="round-left-header">
                    {/* eachars */}
                    <div id="mainEcharts"></div>
                  </div>
                </div>
                {/* 报警列表 */}
                <div id="four">
                  {/* <Baojing></Baojing> */}

                  <div>
                    <div className="round-left-top">
                      <p className="round-left-img"></p>
                      <p className="round-left-font">报警列表</p>
                    </div>

                    <div className="round-left-quanti">
                      <div className="round-left-header">
                        {analarm.map((val, index) => (
                          <div className="alarm-enquiries">
                            <div className="one1"></div>
                            <div className="one2">
                              <div className="tab-cars">
                                <img src={val.alarmPic}></img>
                              </div>
                              <div className="tab-cars-right">
                                <div className="one2-tab-cars">
                                  <div
                                    onClick={() => measurement('tab1')}
                                    style={{ cursor: 'pointer' }}
                                    //   className='cars-white'
                                    // className={
                                    //   activeTabs === 'tab1'
                                    //     ? 'cars-white'
                                    //     : 'cars-distance'
                                    // }
                                  >
                                    测速
                                  </div>
                                  <div
                                    onClick={() => measurement('tab2')}
                                    style={{ cursor: 'pointer' }}
                                    className={
                                      activeTabs === 'tab1'
                                        ? 'cars-distance'
                                        : 'cars-white'
                                    }
                                  >
                                    {/* <div>
                                      <div
                                        text="一般报警"
                                        styles={
                                          val.alarm_lv === '一般' ?{ color:'green'} : ''
                                          
                                        }
                                      />
                                      <div
                                        text="严重报警"
                                        style={
                                          val.alarm_lv === '严重' ? 'red' : ''
                                        }
                                      />
                                      <div
                                        text="轻微报警"
                                        style={
                                          val.alarm_lv === '轻微' ? 'blue' : ''
                                        }
                                      />
                                      <div>{val.alarm_lv === '一般' ? {color:red} : ''}</div> */}
                                    {/* </div> */}
                                    <div className='Generalalarm'
                                      style={{
                                        color: alarmLevelColor[val.alarm_lv]
                                      }}
                                    >
                                      {val.alarm_lv}
                                    </div>
                                    <div className="cars-juli"></div>
                                  </div>
                                </div>
                                <div className="tab-contents" >
                                  {/* {activeTabs === 'tab1' && ( */}
                                    <div>
                                      <div className="tab1-border">
                                        <div className="tab1-img"></div>
                                        <div className="tab1-text">
                                          {val.alarmAddr}
                                          {/* 校区-1区-枪机k09 */}
                                        </div>
                                      </div>
                                      <div className="tab1-border1">
                                        <div className="tab-bottom-img"></div>
                                        <div className="tab-bottom-text">
                                          {val.alarmTime}
                                          {/* 2023-11-24 10:45:58 */}
                                        </div>
                                      </div>
                                    </div>
                                  {/* )} */}
                                  {/* {activeTabs === 'tab2' && (
                                    <div>
                                      <h2>asdkl</h2>
                                    </div>
                                  )} */}
                                </div>
                              </div>
                              <div className="tab-button">
                                <div className="tab-button-text" style={{color:alarmLeves[val.state]}}>
                                  {val.state}
                                </div>
                                <button
                                  className="tab-button-look"
                                  onClick={() => {
                                    onSiren()
                                    alarmlistp(index)
                                  }}
                                >
                                  查看
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="button-upper"></div>
                      <div className="button-aidkit"></div>
                      <div id="Icon-m">
                        <Medikits></Medikits>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {taunt && (
              <Theounds taunt={taunt} onback={onmanufacturer}></Theounds>
            )}
            {apparatu && (
              <Photograph
                apparatu={apparatu}
                onbacks={onBacks}
                tags={tags}
              ></Photograph>
            )}
            {/* {face && <Details face={face} onback={onCancel}></Details>} */}
            {caputre && (
              <ModalData
                setImgSrc={setImgSrc}
                caputre={caputre}
                onback={onBack}
              ></ModalData>
            )}
            {trajectory && (
              <Searchs trajectory={trajectory} onback={onSearch}></Searchs>
            )}
            {vfusion && (
              <Videofusion
                vfusion={vfusion}
                onback={onClosevideo}
              ></Videofusion>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
      {/*<div id="background-max">*/}

      {/*<div id="background-img">*/}
      {/*  <div id="header">*/}
      {/*    <div className="parcel">*/}
      {/*      <div className="SchoolBadge"></div>*/}
      {/*      <div className="SchoolName">山东师范大学智能管理平台</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div id="round">*/}
      {/*    <div className="date-time">*/}
      {/*      <div className="Real-time">{timeNow.time}</div>*/}
      {/*      <div className="real-totality">*/}
      {/*        <p className="Real-date">{timeNow.date}</p>*/}
      {/*        <p className="real-week">{getWeek()}</p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="round-left">*/}
      {/*      <div className="round-left-top">*/}
      {/*        <p className="round-left-img"></p>*/}
      {/*        <p className="round-left-font">设备管控</p>*/}
      {/*      </div>*/}
      {/*      <div className="button-merge">视频管控</div>*/}
      {/*      <div*/}
      {/*        className="button-manage"*/}
      {/*        onClick={() => {*/}
      {/*          onsizefo()*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        巡更管理*/}
      {/*      </div>*/}
      {/*      <Shebei></Shebei>*/}
      {/*      <div className="round-left-middle">*/}
      {/*        <p className="round-left-img"></p>*/}
      {/*        <p className="round-left-font">视频监控</p>*/}
      {/*        <Jiankong></Jiankong>*/}
      {/*      </div>*/}
      {/*      <Xunluo></Xunluo>*/}
      {/*    </div>*/}
      {/*    <div className="round-right">*/}
      {/*      <div className="round-right-guiji">*/}
      {/*        /!* 人脸轨迹 *!/*/}
      {/*        /!* <Guiji></Guiji> *!/*/}
      {/*        /!* <FaceRetrieval></FaceRetrieval> *!/*/}
      {/*        <div className="one">*/}
      {/*          <div className="round-left-top">*/}
      {/*            <p className="round-left-img"></p>*/}
      {/*            <p className="round-left-font">人脸轨迹</p>*/}
      {/*          </div>*/}
      {/*          <div className="round-left-header">*/}
      {/*            <p className="hunt-down" onClick={onCapture}>*/}
      {/*              <img*/}
      {/*                src={`${imgSrc ? imgSrc : '../../assets/styles/images/img_zp.png'}`}*/}
      {/*                className="hunt-down-img"*/}
      {/*              />*/}
      {/*            </p>*/}
      {/*            <div className="down-input">*/}
      {/*              <div className="data-span-right">*/}
      {/*                <div style={{color: 'white'}}>相似度:</div>*/}
      {/*                <div className="similarity-percent">*/}
      {/*                  <input*/}
      {/*                    className="similarity-percent1"*/}
      {/*                    type="range"*/}
      {/*                    min="0"*/}
      {/*                    max="100"*/}
      {/*                    // step="1"*/}
      {/*                    value={similarity}*/}
      {/*                    onChange={handleSimilarityChange}*/}
      {/*                    style={{width: '80%'}}*/}
      {/*                  />*/}
      {/*                </div>*/}
      {/*                <span className="c-percent" style={{color: 'white'}}>*/}
      {/*                    {similarity}%*/}
      {/*                  </span>*/}
      {/*              </div>*/}
      {/*              <div>*/}
      {/*                <div className="calendar">*/}
      {/*                  <div className="calender-time">*/}
      {/*                    <div className="initiate">开始时间</div>*/}
      {/*                    <DatePicker*/}
      {/*                      className="datepicker-left"*/}
      {/*                      placeholder="开始时间"*/}
      {/*                      value={startDate}*/}
      {/*                      showTime={{*/}
      {/*                        defaultValue: dayjs('00:00:00', 'HH:mm:ss'),*/}
      {/*                      }}*/}
      {/*                      onChange={handleStartDateChange}*/}
      {/*                      locale={zhCN}*/}
      {/*                      selected={startDate}*/}
      {/*                      // suffixIcon={<CaretDownOutlined/>}*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                  <div className="calender-end">*/}
      {/*                    <h3 className="initiate">结束时间</h3>*/}
      {/*                    <DatePicker*/}
      {/*                      className="datepicker-right"*/}
      {/*                      placeholder="结束时间"*/}
      {/*                      value={endDate}*/}
      {/*                      showTime={{*/}
      {/*                        defaultValue: dayjs('00:00:00', 'HH:mm:ss'),*/}
      {/*                      }}*/}
      {/*                      onChange={handleEndDateChange}*/}
      {/*                      locale={zhCN}*/}
      {/*                      selected={endDate}*/}
      {/*                      disabled={isEndDateDisabled} // 禁用结束日期选择器如果开始日期早于当前选定的结束日期*/}
      {/*                      // locale={locale}*/}
      {/*                      // disabledDate={disableData}*/}
      {/*                    />*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*              <div className="Capture-photograph">*/}
      {/*                <div className="Capture-library">*/}
      {/*                  <div className="Capture-library-left">抓拍库</div>*/}
      {/*                  <div*/}
      {/*                    className="Capture-library-right"*/}
      {/*                    // onClick={() => {*/}
      {/*                    //   onofce()*/}
      {/*                    // }}*/}
      {/*                  >*/}
      {/*                    人脸库*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*                <div*/}
      {/*                  className="Capture-search"*/}
      {/*                  onClick={() => {*/}
      {/*                    onInspect()*/}
      {/*                  }}*/}
      {/*                >*/}
      {/*                  <div className="Capture-search-img"></div>*/}
      {/*                </div>*/}
      {/*              </div>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      /!* 报警管理 *!/*/}
      {/*      <div className="two">*/}
      {/*        <div className="round-left-top">*/}
      {/*          <p className="round-left-img"></p>*/}
      {/*          <p className="round-left-font">报警管理</p>*/}
      {/*        </div>*/}
      {/*        <div className="round-left-header">*/}
      {/*          <BaojingPie></BaojingPie>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      /!* 报警趋势 *!/*/}
      {/*      <div className="there">*/}
      {/*        <div className="round-left-top">*/}
      {/*          <p className="round-left-img"></p>*/}
      {/*          <p className="round-left-font">报警趋势</p>*/}
      {/*          <div className="round-select-img"></div>*/}
      {/*          <select*/}
      {/*            className="round-left-select"*/}
      {/*            name="fruits"*/}
      {/*            onChange={(e) => {*/}
      {/*              setTag(e.target.value)*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            /!* <select name="fruits"> *!/*/}
      {/*            <option value="7" className="round-left-option">*/}
      {/*              近七天*/}
      {/*            </option>*/}
      {/*            <option value="1" className="round-left-option">*/}
      {/*              当天*/}
      {/*            </option>*/}
      {/*            /!* <option value="cherry" className="round-left-option">*/}
      {/*              近30天*/}
      {/*            </option> *!/*/}
      {/*          </select>*/}
      {/*        </div>*/}
      {/*        <div className="round-left-header">*/}
      {/*          /!* eachars *!/*/}
      {/*          <div id="mainEcharts"></div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*      /!* 报警列表 *!/*/}
      {/*      <div id="four">*/}
      {/*        /!* <Baojing></Baojing> *!/*/}

      {/*        <div>*/}
      {/*          <div className="round-left-top">*/}
      {/*            <p className="round-left-img"></p>*/}
      {/*            <p className="round-left-font">报警列表</p>*/}
      {/*          </div>*/}

      {/*          <div className="round-left-quanti">*/}
      {/*            <div className="round-left-header">*/}
      {/*              {analarm.map((val, index) => (*/}
      {/*                <div className="alarm-enquiries">*/}
      {/*                  <div className="one1"></div>*/}
      {/*                  <div className="one2">*/}
      {/*                    <div className="tab-cars">*/}
      {/*                      <img src={val.alarmPic}></img>*/}
      {/*                    </div>*/}
      {/*                    <div className="tab-cars-right">*/}
      {/*                      <div className="one2-tab-cars">*/}
      {/*                        <div*/}
      {/*                          onClick={() => measurement('tab1')}*/}
      {/*                          style={{cursor: 'pointer'}}*/}
      {/*                          //   className='cars-white'*/}
      {/*                          className={*/}
      {/*                            activeTabs === 'tab1'*/}
      {/*                              ? 'cars-white'*/}
      {/*                              : 'cars-distance'*/}
      {/*                          }*/}
      {/*                        >*/}
      {/*                          测速报警*/}
      {/*                        </div>*/}
      {/*                        <div*/}
      {/*                          onClick={() => measurement('tab2')}*/}
      {/*                          style={{cursor: 'pointer'}}*/}
      {/*                          className={*/}
      {/*                            activeTabs === 'tab1'*/}
      {/*                              ? 'cars-distance'*/}
      {/*                              : 'cars-white'*/}
      {/*                          }*/}
      {/*                        >*/}
      {/*                          <div className="cars-juli">一般报警</div>*/}
      {/*                        </div>*/}
      {/*                      </div>*/}
      {/*                      <div className="tab-contents">*/}
      {/*                        {activeTabs === 'tab1' && (*/}
      {/*                          <div>*/}
      {/*                            <div className="tab1-border">*/}
      {/*                              <div className="tab1-img"></div>*/}
      {/*                              <div className="tab1-text">*/}
      {/*                                {val.alarmAddr}*/}
      {/*                                /!* 校区-1区-枪机k09 *!/*/}
      {/*                              </div>*/}
      {/*                            </div>*/}
      {/*                            <div className="tab1-border1">*/}
      {/*                              <div className="tab-bottom-img"></div>*/}
      {/*                              <div className="tab-bottom-text">*/}
      {/*                                {val.alarmTime}*/}
      {/*                                /!* 2023-11-24 10:45:58 *!/*/}
      {/*                              </div>*/}
      {/*                            </div>*/}
      {/*                          </div>*/}
      {/*                        )}*/}
      {/*                        {activeTabs === 'tab2' && (*/}
      {/*                          <div>*/}
      {/*                            <h2>asdkl</h2>*/}
      {/*                          </div>*/}
      {/*                        )}*/}
      {/*                      </div>*/}
      {/*                    </div>*/}
      {/*                    <div className="tab-button">*/}
      {/*                      <div className="tab-button-text">{val.state}</div>*/}
      {/*                      <button*/}
      {/*                        className="tab-button-look"*/}
      {/*                        onClick={() => {*/}
      {/*                          onSiren()*/}
      {/*                          alarmlistp(index)*/}
      {/*                        }}*/}
      {/*                      >*/}
      {/*                        查看*/}
      {/*                      </button>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              ))}*/}
      {/*            </div>*/}
      {/*            <div className="button-upper"></div>*/}
      {/*            <div className="button-aidkit"></div>*/}
      {/*            <div id="Icon-m">*/}
      {/*              <Medikits></Medikits>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  {taunt && <Theounds taunt={taunt} onback={onmanufacturer}></Theounds>}*/}
      {/*  {apparatu && (*/}
      {/*    <Photograph*/}
      {/*      apparatu={apparatu}*/}
      {/*      onbacks={onBacks}*/}
      {/*      tags={tags}*/}
      {/*    ></Photograph>*/}
      {/*  )}*/}
      {/*  /!* {face && <Details face={face} onback={onCancel}></Details>} *!/*/}
      {/*  {caputre && (*/}
      {/*    <ModalData*/}
      {/*      setImgSrc={setImgSrc}*/}
      {/*      caputre={caputre}*/}
      {/*      onback={onBack}*/}
      {/*    ></ModalData>*/}
      {/*  )}*/}
      {/*  {trajectory && (*/}
      {/*    <Searchs trajectory={trajectory} onback={onSearch}></Searchs>*/}
      {/*  )}*/}
      {/*</div>*/}
      {/*</div>*/}
    </>
  )
}

export default Home
