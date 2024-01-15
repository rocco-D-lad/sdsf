import React from 'react'
import { useState } from 'react'
import './index.scss'

const Photograph = (prop) => {
  const [activeTabs, setActiveTabs] = useState('tab1')
  const measurement = (tab) => {
    setActiveTabs(tab)
  }
  const measurements = () => {
    prop.onbacks()
  }
  return (
    <div id='rocco-li'>
      <div id="rocco">
        <div className="information-header">
          <div className="header-text">报警详情</div>
          <div className="header-img" onClick={prop.onbacks}></div>
        </div>
        <div className="information-content">
          <div>
            <div className="content-left">
              <div className="content-left-img"></div>
            </div>
          </div>
          <div className="content-text">
            <ul className="context-text-ul">
              <li>
                名称: &nbsp;&nbsp;&nbsp;&nbsp;<span>校区-1区-枪机k09</span>
              </li>
              <li>
                类型:&nbsp;&nbsp;&nbsp;&nbsp;<span>测速报警</span>
              </li>
              <li>
                等级:&nbsp;&nbsp;&nbsp;&nbsp;<span>一级报警</span>
              </li>
              <li>
                地点:&nbsp;&nbsp;&nbsp;&nbsp;<span>校区-1区</span>
              </li>
              <li>
                时间:&nbsp;&nbsp;&nbsp;&nbsp;<span>2023-12-13 17:21:44</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="information-foot">
          <div className="one2-tab-cars">
            <div
              onClick={() => measurement('tab1')}
              className="information-foot-left"
            >
              已处理
            </div>
            <div onClick={() => measurement('tab2')} className="cars-distance">
              误报
            </div>
            {/* <div onClick={() => measurement('tab3')} className="ignore"> */}
            <div onClick={measurements} className="ignore">
              忽略
            </div>
          </div>
          <div className="tab-contents">
            {activeTabs === 'tab1' && (
              <div>
                <div className="tab1-border">
                  <div className="tab1-text">备注&nbsp;:</div>
                </div>
                <div className="tab1-border1">
                  <div className="tab-bottom-img"></div>
                  <input
                    className="tab-bottom-text"
                    placeholder="请输入"
                  ></input>
                </div>
              </div>
            )}
            {activeTabs === 'tab2' && (
              <div>
                <div className="tab1-border">
                  <div className="tab1-text">备注&nbsp;:</div>
                </div>
                <div className="tab1-border1">
                  <div className="tab-bottom-img"></div>
                  <input
                    className="tab-bottom-text"
                    placeholder="请输入处理意见....."
                  ></input>
                </div>
              </div>
            )}
            {activeTabs === 'tab3' && <div>aaaa</div>}
          </div>
        </div>
      </div>
      <div id='rocco-bottom'>
        <div className='rocco-bottom-ing'></div>
      </div>
    </div>
  )
}
export default Photograph
