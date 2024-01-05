import { useCallback, useEffect, useMemo, useState } from 'react'
import IoT from 'tuyang-iot'
import { utils } from 'tuyang-shared'
// import { messageCreator } from "../../app/server";
import { api } from '../../api/config'
import './index.scss'
import moment from 'moment/moment'

const EventBus = utils.EventBus

// const messageController = messageCreator();

let viewer = null

export const getViewer = () => viewer

const Home = () => {
  const [iotFooterVisible, setIotFooterVisible] = useState(false)
  const [timeNow, setTime] = useState({ date: '', week: '', time: '' })
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const handleItemClick = (item) => {
    // 处理点击下拉列表项的逻辑
    console.log(`Clicked on ${item}`) // 这里可以根据需要进行其他操作
  }

  // 监听来自主页相关的事件信号
  useEffect(() => {
    showtime()
    // 示例 - 场景切换
    EventBus.on('scene_change', (payload) => {})
  }, [])

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
  const [activeTab, setActiveTab] = useState('tab1')

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  return (
    <>
      {renderIot}
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
            <div className="round-left-header">
              <p className="round-left-totality"></p>
              <p className="round-left-title">
                <p className="round-title">监控设备总数</p>
                <p className="rounf-leftTitle-quantity">1425</p>
                <p className="title-Statistics">
                  <p className="Statistics-online">
                    <p className="online-img"></p>
                    <p className="online-text">在线</p>
                    <p className="online-people">478</p>{' '}
                  </p>
                  <p className="Statistics-Offline">
                    <p className="Offline-img"></p>
                    <p className="Offline-text"> 离线</p>
                    <p className="Offline-people">154</p>
                  </p>
                </p>
              </p>
            </div>
            <div className="round-left-middle">
              <p className="round-left-img"></p>
              <p className="round-left-font">视频监控</p>
              <div className="round-Supervisory">
                <div>
                  <div>
                    <div className="tabs">
                      <button
                        onClick={() => handleTabChange('tab1')}
                        className="tab-list"
                      >
                        列表
                      </button>
                      <button
                        onClick={() => handleTabChange('tab2')}
                        className="tab-Collect"
                      >
                        收藏
                      </button>
                      <input
                        placeholder={'快速收藏'}
                        className="tab-input"
                      ></input>
                      <div className="tab-Searchbox">
                        <p className="tab-Magnifying"></p>
                      </div>
                    </div>
                    <div className="tab-content">
                      {activeTab === 'tab1' && (
                        <div className="tab-label">
                          <p>
                            <div>
                              <p
                                className='dropdown-img'
                                style={{cursor: 'pointer',transform: showDropdown? 'rotate(90deg)': 'rotate(0deg)'}}
                                onClick={toggleDropdown}
                              />
                              <p className='dropdown-list'>山东师范大学（105）</p>
                              {showDropdown && (
                                <div style={{position: 'absolute',top: '50px',left: '40px',border: '1px solid #ccc'}}
                                >
                                  <ul style={{position: 'absolute',top: '10px'}} className='outdoor' >
                                    <li onClick={() => handleItemClick('Item 1')} className='outdoor1'><p className='list-collegiate' style={{cursor: 'pointer',transform: showDropdown? 'rotate(90deg)': 'rotate(0deg)'}}></p>室外(46)</li>
                                    <li onClick={() => handleItemClick('Item 2')}><p className='list-collegiate'></p>室内（45）</li>
                                    <li onClick={() => handleItemClick('Item 3')}><p className='list-collegiate'></p>理科教学楼c座（14）</li>
                                  </ul>
                                </div>
                              )}
                            </div>
                          </p>
                        </div>
                      )}
                      {activeTab === 'tab2' && (
                        <div className="tab-label">
                          <h2>收藏</h2>
                          <p>Content for Tab 2</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="round-left-bottom">
              <p className="round-left-imgs"></p>
              <p className="round-left-font">视asdlojazsdjki</p>
              <div className="round-Controls"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
