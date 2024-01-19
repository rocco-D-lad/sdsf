import React, { useState, useEffect } from 'react'
import './index.scss'
import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import imgsrc from '../../../../assets/styles/images/icon_sc.png'
import { Listlieb } from '../../../../api/home'
import icon_jk from '../../../../assets/styles/images/icon_jk.png'
import icon_jkCancel from '../../../../assets/styles/images/icon_sc_2.png'

const Jiankong = () => {
  const [activeTab, setActiveTab] = useState('tab1')
  // const [switchs, setswitch] = useState(true)
  const [cancel, setCancel] = useState(true)
  const [pageData, setPageData] = useState([])
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }
  const CollectionMonitoring = (start) => {
    setCancel((start = !start))
  }
  const [inputValue, setInputValue] = useState('')
  // const onstyu = (state) => {
  //   setswitch((state = !state))
  // }
  const { TreeNode } = Tree
  const [favorites, setFavorites] = useState([
    {
      title: '山东师范大学（105）',
      key: '0-0',
      children: [
        {
          title: <div> 室外（46）</div>,
          key: '0-0-0',
          children: [{}]
        },
        {
          title: '室内（59）',
          key: '0-0-1',
          children: [{}]
        },
        {
          title: '理科教学楼C座（14）',
          key: '0-0-2',
          children: [{}]
        }
      ]
    }
  ])
  const [listItems, setListItems] = useState([
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
                  {/* <div className="Supervisory-img-two"></div> */}
                  {/* <div
                    onClick={() => onstyu(switchs)}
                    // className={
                    //   switchs ? 'Supervisory-img-two' : 'Supervisory-img'
                    // }
                  ></div> */}
                </div>
              ),
              key: '0-0-0-0',
              favorite: false,
              id: 1
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">六楼电梯口人脸</div>
                  {/* <div className="Supervisory-img-two"></div> */}
                </div>
              ),
              key: '0-0-0-1',
              favorite: false,

              id: 2
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">七楼电梯口人脸</div>
                  {/* <div className="Supervisory-img-two"></div> */}
                </div>
              ),
              key: '0-0-0-2',
              favorite: false,
              id: 3
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
                  <div className="Supervisory-text">八楼电梯口人脸</div>
                  {/* <div className="Supervisory-img-two"></div> */}
                </div>
              ),
              key: '0-0-1-0',
              favorite: false,
              id: 4
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
                  <div className="Supervisory-text">九楼电梯口人脸</div>
                  {/* <div className="Supervisory-img-two"></div> */}
                </div>
              ),
              key: '0-0-2-0',
              favorite: false,
              id: 5
            },
            {
              title: (
                <div id="Supervisory-header">
                  <div id="Supervisory"></div>
                  <div className="Supervisory-text">十楼电梯口人脸</div>
                  {/* <div className="Supervisory-img-two"></div> */}
                </div>
              ),
              key: '0-0-2-1',
              favorite: false,
              id: 6
            }
          ]
        }
      ]
    }
  ])

  const mapList = (item) => {
    console.log('item', item)
    if (!item) return null
    // return
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.id}>
          {item.children.map((i) => {
            return mapList(i)
          })}
        </TreeNode>
      )
    } else {
      return (
        <TreeNode
          title={() => (
            <div
              onClick={() => {
                // item.id发给后端
                // 改变本地数组
                // []
              }}
            >
              <img src={icon_jk}></img>
              {item.title} <img src={icon_jkCancel}></img>
            </div>
          )}
          key={item.id}
        />
      )
    }
  }

  const liebiao = () => {
    Listlieb().then((res) => {
      console.log(res.data.data[0].children, '列表数据data')
      console.log(res.data, '列表数据')
      // listToTree(res.data.data, 'id', 'pid')
      setPageData(res.data.data)
      // setPageData([res.data.data])
    })
  }

  //  const indoors=setPageData(res.data.data)
  //  console.log(indoors);

  /**
   * 将 list 数组转化为 treeList
   * @param {Array} dataList list数据
   * @param {string} id 节点key值
   * @param {string} pId 父节点key值
   * @returns {Array} treeList
   */
  // function listToTree(DataList, id, pId) {
  //   const data = JSON.parse(JSON.stringify(DataList))
  //   const result = []
  //   if (!Array.isArray(data)) {
  //     return result
  //   }
  //   data.forEach((item) => {
  //     delete item.children
  //   })
  //   const map = {}
  //   data.forEach((item) => {
  //     map[item[id]] = item
  //   })
  //   data.forEach((item) => {
  //     const parent = map[item[pId]]
  //     if (parent) {
  //       ;(parent.children || (parent.children = [])).push(item)
  //     } else {
  //       result.push(item)
  //     }
  //   })
  //   console.log(result, '组织目录')
  //   return result
  // }

  const handleItemClick = (itemId) => {
    console.log(itemId, 'itemId111')
    const updatedListItems = listItems.map((item) => {
      if (item.key === itemId) {
        item.favorite = !item.favorite
        if (item.favorite) {
          setFavorites([...favorites, item])
        } else {
          const updatedFavorites = favorites.filter((fav) => fav !== item)
          setFavorites(updatedFavorites)
        }
      }
      return item
    })
    setListItems(updatedListItems)
  }

  const handleTreeItemClick = (itemId) => {
    console.log(itemId, 'itemId')
    const selectedItem = listItems.find((item) => item.key === itemId)
    if (selectedItem) {
      selectedItem.favorite = !selectedItem.favorite
      if (selectedItem.favorite) {
        setFavorites([...favorites, selectedItem])
      } else {
        const updatedFavorites = favorites.filter((item) => item.key !== itemId)
        setFavorites(updatedFavorites)
      }
    }
  }

  const handleSearchClick = () => {
    const searchArr = pageData.filter((item) => {
      // return item.data.data[0].children.includes(inputValue)
      console.log(item)
      console.log(item.children[0].children)
      console.log(item.children[1].children[0])
      console.log(item.children[2].children[0])
      console.log(item.children[2].children[1])
    })
    // setPhotograph(searchArr)
    console.log(searchArr)
  }
  useEffect(() => {
    liebiao()
    // 请求收藏列表 setarr
  }, [])

  // const mapList = (item) => {
  //   console.log('item', item)
  //   if (!item) return null
  //   // return
  //   if (item.children) {
  //     return (
  //       <TreeNode title={item.title} key={item.id}>
  //         {item.children.map((i) => {

  //           return mapList(i)
  //         })}
  //       </TreeNode>
  //     )
  //   } else {
  //     return (
  //       <TreeNode
  //         title={() => (
  //           <div
  //             onClick={() => {
  //               // item.id发给后端
  //               // 改变本地数组
  //               // []
  //             }}
  //           >
  //             <img src={icon_jk}></img>
  //             {item.title} <img src={icon_jkCancel}></img>
  //           </div>
  //         )}
  //         key={item.id}
  //       />
  //     )
  //   }
  // }

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
            <input
              value={inputValue}
              placeholder="快速搜索"
              className="tab-input"
              onChange={(event) => {
                setInputValue(event.target.value)
              }}
            ></input>
            <div className="tab-Searchbox" onClick={handleSearchClick}>
              <p className="tab-Magnifying"></p>
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 'tab1' && (
              <div className="tab-label">
                <p>
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
                    // treeData={pageData}
                    defaultExpandedKeys={['0-0-1']}
                    onSelect={onSelect}
                  >
                    {mapList(pageData[0])}
                    {console.log(1)}
                  </Tree>
                </p>
              </div>
            )}
            {activeTab === 'tab2' && (
              <div className="tab-label">
                <ul>
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
                    onSelect={onSelect}
                    treeData={pageData}
                  >
                    {/* {pageData.map((node1) => (
                      <TreeNode title={node1.title} key={node1.key}>
                        {node1.children.map((node2) => (
                          <TreeNode title={node2.title} key={node2.key}>
                            {node2.children.map((node3) => (
                              <TreeNode
                                title={
                                  <div>
                                    <div key={node3.key}>
                                      {node3.title}
                                      <span
                                        onClick={() =>
                                          handleItemClick(node3.key)
                                        }
                                      >
                                        <img src={imgsrc} />
                                      </span>
                                    </div>
                                  </div>
                                }
                                key={node3.key}
                              ></TreeNode>
                            ))}
                          </TreeNode>
                        ))}
                      </TreeNode>
                    ))} */}
                  </Tree>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Jiankong





