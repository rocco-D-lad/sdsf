import React, { useState } from 'react'
import './index.scss'
import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'

const Jiankong = () => {
  const [activeTab, setActiveTab] = useState('tab1')
  const [switchs, setswitch] = useState(true)
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  const onstyu = (state) => {
    setswitch((state = !state))
  }

  const treeData = [
    {
      title: '山东师范大学（105）',
      key: '0-0',
      children: [
        {
          title: <div> 室外（46）</div>,
          key: '0-0-0',
          children: [
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  {/* <div className="Supervisory-img"></div> */}
                  <div
                    className={
                      switchs ? 'Supervisory-img-two' : 'Supervisory-img'
                    }
                    onClick={() => onstyu(switchs)}
                  ></div>
                </div>
              ),
              key: '0-0-0-0'
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img-two"></div>
                </div>
              ),
              key: '0-0-0-1'
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img-two"></div>
                </div>
              ),
              key: '0-0-0-2'
            }
          ]
        },
        {
          title: '室内（59）',
          key: '0-0-1',
          children: [
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img-two"></div>
                </div>
              ),
              key: '0-0-1-0'
            }
          ]
        },
        {
          title: '理科教学楼C座（14）',
          key: '0-0-2',
          children: [
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img-two"></div>
                </div>
              ),
              key: '0-0-2-0'
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img-two"></div>
                </div>
              ),
              key: '0-0-2-1'
            }
          ]
        }
      ]
    }
  ]

  const treeCollect=[
    {
      title: '山东师范大学（105）',
      key: '0-0',
      children: [
        {
          title: <div> 室外（46）</div>,
          key: '0-0-0',
          children: [
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  {/* <div className="Supervisory-img"></div> */}
                  <div
                    className={
                      switchs ? 'Supervisory-img' : 'Supervisory-img-two'
                    }
                    onClick={() => onstyu(switchs)}
                  ></div>
                </div>
              ),
              key: '0-0-0-0'
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img"></div>
                </div>
              ),
              key: '0-0-0-1'
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img"></div>
                </div>
              ),
              key: '0-0-0-2'
            }
          ]
        },
        {
          title: '室内（59）',
          key: '0-0-1',
          children: [
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img"></div>
                </div>
              ),
              key: '0-0-1-0'
            }
          ]
        },
        {
          title: '理科教学楼C座（14）',
          key: '0-0-2',
          children: [
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img"></div>
                </div>
              ),
              key: '0-0-2-0'
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">五楼电梯口人脸</div>
                  <div className="Supervisory-img"></div>
                </div>
              ),
              key: '0-0-2-1'
            }
          ]
        }
      ]
    }
  ]

  return (
    <div id="round-Supervisory">
      <div>
        <div>
          <div className="tabs">
            <button
              onClick={() => handleTabChange('tab1')}
              // className="tab-list"
              className={activeTab === 'tab1' ? 'tab-list' : 'tab-Collect'}
              id="liebiao"
            >
              列表
            </button>
            <button
              onClick={() => handleTabChange('tab2')}
              className={activeTab === 'tab1' ? 'tab-Collect' : 'tab-list'}
              id="shoucang"
            >
              收藏
            </button>
            <input placeholder="快速搜索" className="tab-input"></input>
            <div className="tab-Searchbox">
              <p className="tab-Magnifying"></p>
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 'tab1' && (
              <div className="tab-label">
                <p>
                  <div>
                    <Tree
                      showLine
                      switcherIcon={
                        <CaretDownOutlined
                          style={{
                            color: '#16D6E2 ',
                            fontSize: '16px'
                          }}
                        />
                      }
                      defaultExpandedKeys={['0-0-0']}
                      onSelect={onSelect}
                      treeData={treeData}
                    />
                  </div>
                </p>
              </div>
            )}
            {activeTab === 'tab2' && (
              <div className="tab-label">
               <div>
                    <Tree
                      showLine
                      switcherIcon={
                        <CaretDownOutlined
                          style={{
                            color: '#16D6E2 ',
                            fontSize: '16px'
                          }}
                        />
                      }
                      defaultExpandedKeys={['0-0-0']}
                      onSelect={onSelect}
                      treeData={treeCollect}
                    />
                  </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Jiankong
