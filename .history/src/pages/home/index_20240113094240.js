import { useCallback, useEffect, useMemo, useState } from 'react'
import IoT from 'tuyang-iot'
import { utils } from 'tuyang-shared'
import * as echarts from 'echarts'
import { DatePicker, Modal } from 'antd'
import { api } from '../../api/config'
import Theounds from './component/therounds'
import moment from 'moment/moment'
import BaojingPie from './component/EchartsData'
import Shebei from './component/shebei'
import Jiankong from './component/jiankong'
import Xunluo from './component/xunluo'
// import Guiji from './component/guiji'
// import Baojing from './component/baojing'
import Searchs from './component/Search'
import Photograph from './component/photograph'
import './index.scss'
import 'react-datetime/css/react-datetime.css'
import '../../assets/styles/utils.scss'
import 'antd/dist/antd.css'

import Details from './component/details'
import ModalData from './component/caputre/modaldata'
import { BaoJing } from '../../api/home'
import { Qitian, Yitian } from '../../api/home'

const EventBus = utils.EventBus

let viewer = null

export const getViewer = () => viewer

const Home = () => {
  const [iotFooterVisible, setIotFooterVisible] = useState(false)
  const [timeNow, setTime] = useState({ date: '', week: '', time: '' })
  const [taunt, setTaunt] = useState(false)
  const [activeTabs, setActiveTabs] = useState('tab1')
  const [apparatu, setApparatu] = useState(false)
  const [similarity, setSimilarity] = useState(80)
  const [startdata, setStartData] = useState('')
  const [enddata, setEndData] = useState('')
  const [face, setFace] = useState(false)
  const [caputre, setCaputre] = useState(false)
  const [analarm, setAnalarm] = useState([])
  const [trajectory, setTrajectory] = useState(false)
  const [qitian, setQitian] = useState([])

  const [tag, setTag] = useState('7')

  const alarmlist = () => {
    BaoJing().then((res) => {
      console.log(res.data.data)
      setAnalarm(res.data.data)
    })
  }

  const handleSimilarityChange = (event) => {
    const value = event.target.value
    setSimilarity(value)
  }
  const timeStart = (data) => {
    setStartData(data)
  }
  const timeEnd = (data) => {
    setEndData(data)
  }

  const onCapture = (event) => {
    setCaputre(true)
  }
  const onBack = () => {
    setCaputre(false)
  }
  const onofce = () => {
    setFace(true)
  }
  const onCancel = () => {
    setFace(false)
  }
  const measurement = (tab) => {
    setActiveTabs(tab)
  }
  const onSiren = () => [setApparatu(true)]
  const onBacks = () => {
    setApparatu(false)
  }

  const onInspect = () => {
    setTrajectory(true)
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

  let min = moment().format('YYYY-MM-DD')
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
 useEffect(()=>{
  onEchartsData()
 },[qitian])
  
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


  useEffect(() => {
    if (tag == 7) {
      console.log(101010);
      sevendays()
    } else {
      console.log(10010101);
      sevendaysOne()
    }
    onEchartsData()
    console.log(tag)
  }, [tag])

  const handleSuccess = useCallback((viewerInstance) => {
    viewer = viewerInstance
    const config = viewer.core.config

    if (config.footer !== undefined) {
      setIotFooterVisible(!!config.footer)
    }

    // 设置基础空间数据库的接口地址
    api.setUrl(config.api)

    // 设置 DIS 平台的接口地址
    // api.dis.setUrl(config.dis);

    // 设置 DIS 平台 的token
    // api.dis.fetchToken();

    // 有第三方平台的对接是，需要把其平台IP配置好在 config.json 中
    // api.config.setUrl(config.hkApi)

    // 如果是页面是被嵌套(作为 iframe )，且需要和首页通过 postMessage 通信，
    // 可以通过一下的 messageController 通信
    // messageController.subscribe("*");

    // 通知主页，三维已完成初始化
    // messageController.dispatch({
    //   type: 0x00000000
    // });
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
  const onmanufacturer = () => {
    setTaunt(false)
  }

  return (
    <>
      {renderIot}
      <div id="background-max">
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
              <div className="button-merge">视频管控</div>
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

                <div className="one">
                  <div className="round-left-top">
                    <p className="round-left-img"></p>
                    <p className="round-left-font">人脸轨迹</p>
                  </div>
                  <div className="round-left-header">
                    <p className="hunt-down" onClick={onCapture}></p>
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
                        <span className="c-percent" style={{ color: 'white' }}>
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
                              value={startdata}
                              onChange={timeStart}
                              // suffixIcon={<CaretDownOutlined/>}
                            />
                          </div>
                          <div className="calender-end">
                            <h3 className="initiate">结束时间</h3>
                            <DatePicker
                              className="datepicker-right"
                              placeholder="结束时间"
                              value={enddata}
                              onChange={timeEnd}
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
                            onClick={() => {
                              onofce()
                            }}
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
                              <img src={'val.alarmPic'}></img>
                            </div>
                            <div className="tab-cars-right">
                              <div className="one2-tab-cars">
                                <div
                                  onClick={() => measurement('tab1')}
                                  style={{ cursor: 'pointer' }}
                                  //   className='cars-white'
                                  className={
                                    activeTabs === 'tab1'
                                      ? 'cars-white'
                                      : 'cars-distance'
                                  }
                                >
                                  测速报警
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
                                  <div className="cars-juli">一般报警</div>
                                </div>
                              </div>
                              <div className="tab-contents">
                                {activeTabs === 'tab1' && (
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
                                )}
                                {activeTabs === 'tab2' && (
                                  <div>
                                    <h2>asdkl</h2>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="tab-button">
                              <div className="tab-button-text">{val.state}</div>
                              <button
                                className="tab-button-look"
                                onClick={() => {
                                  onSiren()
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
                  </div>
                </div>
              </div>
            </div>
          </div>
          {taunt && <Theounds taunt={taunt} onback={onmanufacturer}></Theounds>}
          {apparatu && (
            <Photograph apparatu={apparatu} onsize={onManufacturer} onbacks={onBacks}></Photograph>
          )}
          {face && <Details face={face} onback={onCancel}></Details>}
          {caputre && <ModalData caputre={caputre} onback={onBack}></ModalData>}
          {trajectory && (
            <Searchs trajectory={trajectory} onback={onSearch}></Searchs>
          )}
        </div>
      </div>
    </>
  )
}

export default Home
