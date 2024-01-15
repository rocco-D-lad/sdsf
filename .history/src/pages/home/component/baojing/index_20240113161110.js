import React, { useState } from 'react'
import './index.scss'
import Photograph from '../photograph'

const Baojing = () => {
  const [activeTabs, setActiveTabs] = useState('tab1')
  const [apparatu, setApparatu] = useState(false)
  const measurement = (tab) => {
    setActiveTabs(tab)
  }
  const onSiren = () => [setApparatu(true)]
  const onBacks = () => {
    setApparatu(false)
  }
  return (
    <div>
      {apparatu && (
        <Photograph apparatu={apparatu} onbacks={onBacks}></Photograph>
      )}
      <div className="round-left-top">
        <p className="round-left-img"></p>
        <p className="round-left-font">报警列表</p>
      </div>
      <div>
        <div className="round-left-header">
          <div className="alarm-enquiries">
            {/* <div className="one1">1</div> */}
            <div className="one2">
              <div className="tab-cars"></div>
              <div className="tab-cars-right">
                <div className="one2-tab-cars">
                  <div
                    onClick={() => measurement('tab1')}
                    style={{ cursor: 'pointer' }}
                    //   className='cars-white'
                    className={
                      activeTabs === 'tab1' ? 'cars-white' : 'cars-distance'
                    }
                  >
                    测速报警
                  </div>
                  <div
                    onClick={() => measurement('tab2')}
                    style={{ cursor: 'pointer' }}
                    className={
                      activeTabs === 'tab1' ? 'cars-distance' : 'cars-white'
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
                        <div className="tab1-text">校区-1区-枪机k09</div>
                      </div>
                      <div className="tab1-border1">
                        <div className="tab-bottom-img"></div>
                        <div className="tab-bottom-text">
                          2023-11-24 10:45:58
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
                <div className="tab-button-text">已处理</div>
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
        </div>
        <div className="button-upper"></div>
        <div className="button-aidkit"></div>
        {/* <div className="button-aidkit" onClick={}></div> */}
      </div>
      <div>
        <div className="round-left-header">
          <div className="alarm-enquiries">
            {/* <div className="one1">1</div> */}
            <div className="one2">
              <div className="tab-cars"></div>
              <div className="tab-cars-right">
                <div className="one2-tab-cars">
                  <div
                    onClick={() => measurement('tab1')}
                    style={{ cursor: 'pointer' }}
                    //   className='cars-white'
                    className={
                      activeTabs === 'tab1' ? 'cars-white' : 'cars-distance'
                    }
                  >
                    测速报警
                  </div>
                  <div
                    onClick={() => measurement('tab2')}
                    style={{ cursor: 'pointer' }}
                    className={
                      activeTabs === 'tab1' ? 'cars-distance' : 'cars-white'
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
                        <div className="tab1-text">校区-1区-枪机k09</div>
                      </div>
                      <div className="tab1-border1">
                        <div className="tab-bottom-img"></div>
                        <div className="tab-bottom-text">
                          2023-11-24 10:45:58
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
                <div className="tab-button-text">已处理</div>
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
        </div>
        <div className="button-upper"></div>
        <div className="button-aidkit"></div>
      </div>
    </div>
  )
}
export default Baojing
