import React, { useState, useEffect, useRef } from 'react'
import { useAtom } from 'jotai'
import './index.scss'
import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import imgsrc from '../../../../assets/styles/images/icon_sc.png'
import { Listlieb } from '../../../../api/home'
import icon_jk from '../../../../assets/styles/images/icon_jk.png'
import icon_jkCancel from '../../../../assets/styles/images/icon_sc_2.png'
import imgxz from '../../../../assets/styles/images/img-xz.png'
import { DownOutlined } from '@ant-design/icons'
// import { canmeraList } from '../../../../app/store'
import axios from 'axios'
import { getApi } from '../../../../pages/home'

const Jiankong = () => {
  const api = getApi()

  const [activeTab, setActiveTab] = useState('tab1')
  const [pageData, setPageData] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { TreeNode } = Tree
  const [expandedKeys, setExpandedKeys] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [favoritedItems, setFavoritedItems] = useState([])
  // const [cameradata, setcameradata] = useAtom(canmeraList)
  const [cameraListData, setCameraListData] = useState([])
  const [alldata, setAllData] = useState([])
  const [alldataClone, setAllDataClone] = useState([])
  const resultRef = useRef(null)
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
    //将ul中的值存到value中
    const { value } = info.node
    ontoggle(value)
  }

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }
  //收藏接口
  const cameralist = async () => {
    console.log(api, 'api')
    try {
      const res = await axios.post(`${api.baseURL}/device/camera/tree`, null)
      if (res.data.msg === 'success') {
        const data = res.data.data[0].children
        console.log(data)
        // setcameradata(data)
        setCameraListData(data.filter((item) => item.is_like)) //筛选 is_like 属性为 true 的摄像头
        console.log(cameraListData, '筛选 is_like 属性为 true 的摄像头')
      } else {
        console.error('获取摄像头树失败')
      }
    } catch (err) {
      console.error(err)
    }
  }

  //点击图片进行收藏
  const ontoggle = async (value) => {
    console.log(value, '1111')
    // debugger
    const isLike = value.is_like
    if (isLike) {
      const Updatedata = await axios({
        url: `${api.baseURL}/device/camera/update`,
        method: 'POST',
        data: { ...value, is_like: false }
      }).then((res) => {
        getliebiao()
      })
      console.log(Updatedata, 'Updatedata')
    } else {
      const Updatedata = await axios({
        url: `${api.baseURL}/device/camera/update`,
        method: 'POST',
        data: { ...value, is_like: true }
      }).then((res) => {
        getliebiao()
      })
      console.log(Updatedata, 'Updatedata')
    }
  }

  const onStarsdisappear = async (value) => {
    console.log(value)
    // debugger
    const isLike = value.is_like
    if (isLike) {
      const Updatedata = await axios({
        url: `${api.baseURL}/device/camera/update`,
        method: 'POST',
        data: { ...value, is_like: false }
      }).then((res) => {
        getliebiao()
      })
      console.log(Updatedata, 'Updatedata')
    } else {
      const Updatedata = await axios({
        url: `${api.baseURL}/device/camera/update`,
        method: 'POST',
        data: { ...value, is_like: true }
      }).then((res) => {
        getliebiao()
      })
    }
  }

  //遍历树形结构中的数据
  const loop = (data) =>
    data.map((item) => {
      //title返回的是每一条的文字   children返回的是每一条的数据
      const { title, key, children } = item
      const index = title.indexOf(searchValue)
      if (index > -1) {
        const beforeStr = title.substr(0, index)
        //树结构的内容
        const afterStr = title.substr(index + searchValue.length)
        const titleNode = (
          <span>
            {beforeStr}
            <span style={{ background: 'red' }}>{searchValue}</span>
            {afterStr}
          </span>
        )

        //表头室内室外地下
        if (children) {
          return (
            <TreeNode key={key} title={titleNode}>
              {loop(children)}
            </TreeNode>
          )
        }

        //给树结构中内容添加图片
        return (
          <TreeNode
            key={key}
            value={item}
            title={
              <div className="list-img-flex">
                <div className="list-img-icon-jk">
                  <img src={icon_jk}></img>
                </div>
                <div className="list-text-icon-buttom">{titleNode}</div>
                <div>
                  {item.is_like ? (
                    <img
                      src={imgsrc}
                      onClick={() => {
                        setPageData([...pageData]) // 将更新后的数组重新设置给 pageData 状态
                        ontoggle(item)
                      }}
                    />
                  ) : (
                    <img
                      src={icon_jkCancel}
                      onClick={() => {
                        setPageData([...pageData]) // 将更新后的数组重新设置给 pageData 状态
                        ontoggle(item)
                      }}
                    />
                  )}
                </div>
              </div>
            }
          />
        )
      }

      //使搜索完的内容保持树结构
      if (children) {
        return (
          <TreeNode key={key} title={title}>
            {loop(children)}
          </TreeNode>
        )
      }

      //搜索完的其他内容添加两张图片
      return (
        <TreeNode
          key={key}
          title={
            <div className="list-img-flex">
              <div className="list-img-icon-jk">
                <img src={icon_jk}></img>
              </div>
              <div className="list-text-icon-buttom">{title}</div>
              <div>
                {item.is_like ? (
                  <img
                    src={imgsrc}
                    onClick={() => {
                      setPageData([...pageData]) // 将更新后的数组重新设置给 pageData 状态
                      ontoggle(item)
                    }}
                  />
                ) : (
                  <img
                    src={icon_jkCancel}
                    onClick={() => {
                      setPageData([...pageData]) // 将更新后的数组重新设置给 pageData 状态
                      ontoggle(item)
                    }}
                  />
                )}
              </div>
            </div>
          }
        />
      )
    })

  const getParentKey = (key, tree, parentKey) => {
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.key === key) {
        return parentKey
      }
      if (node.children) {
        if (node.children.some((item) => item.key === key)) {
          return node.key
        }
        const parentKey = getParentKey(key, node.children, node.key)
        if (parentKey) {
          return parentKey
        }
      }
    }
    return null
  }
  //收藏里面图片的消失与隐藏
  const onasd = async (item) => {
    try {
      // 调用获取摄像头列表接口
      const res = await axios.post(`${api.baseURL}/device/camera/tree`, null)
      if (res.data.msg === 'success') {
        const data = res.data.data[0].children
        setCameraListData(data)
        console.log(cameraListData)
      } else {
        console.error('获取摄像头树失败')
      }
    } catch (err) {
      console.error(err)
    }
  }
  const handleClickimgs = (index) => {
    console.log(index, 'key')
    let newListData = cameraListData.filter(
      (item, itemIndex) => itemIndex != index
    )
    setCameraListData(newListData)
  }

  //搜索内容
  const onChange = (e) => {
    const { value } = e.target
    setInputValue(value)
    if (activeTab === 'tab1') {
      setSearchValue(value)
    }
    if (activeTab === 'tab2') {
      if (!value.trim()) {
        setAllData(alldataClone)
      }
      if (value) {
        setAllData(
          alldataClone.filter((item) => item.camera_name.includes(value.trim()))
        )
      }
    }
    console.log(value)
  }
  //搜索按钮方法
  const onSearch = (event) => {
    setIsExpanded(true)
    // console.log('Search:', event.target.value)
    setInputValue(event.target.value)
    const findMatchedKeys = (data, value) => {
      //将搜索的内容存到matchedKeys
      const matchedKeys = []
      data.forEach((item) => {
        if (item.title.indexOf(value) > -1) {
          matchedKeys.push(item.key)
        }
        if (item.children) {
          matchedKeys.push(...findMatchedKeys(item.children, value))
        }
      })
      return matchedKeys
    }
    const matchedKeys = pageData ? findMatchedKeys(pageData, searchValue) : []
    // console.log(matchedKeys);

    setExpandedKeys(matchedKeys)
    setAutoExpandParent(true)
    const results = cameraListData.filter((item) =>
      matchedKeys.includes(item.key)
    )
    console.log(results,'results');
    setSearchResults(results)
     // if (searchResults.length > 0 && resultRef.current) {
    //   console.log(resultRef, 'resultRef')
    //   resultRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center'
    //   })
    // }
  }

  const getliebiao = async () => {
    const CameraOtherdata = await axios({
      url: `${api.baseURL}/device/camera/tree`,
      method: 'POST',
      data: null
    })
    console.log(CameraOtherdata, '返回值状态')
    if (CameraOtherdata.data.msg === 'success') {
      console.log(CameraOtherdata.data.data, '树code树code树code')
      const CloneData = []
      const processNode = (node) => {
        if (node.is_like) {
          CloneData.push(node)
        }
        if (node.children && node.children.length > 0) {
          node.children.forEach(processNode)
        }
      }
      CameraOtherdata?.data?.data.forEach(processNode)
      setAllData(CloneData)
      setAllDataClone(CloneData)
      setPageData(CameraOtherdata.data.data)
      // const CloneData = []
      // CameraOtherdata?.data?.data[0]?.children?.map((val, index) => {
      //   if (val?.is_like == true) {
      //     return CloneData.push(val)
      //   }
      // })
    }
  }

  useEffect(() => {
    onasd()
    getliebiao()
  }, [activeTab])

  // useEffect(() => {
  //   console.log(1212313, 'test')
  //   // 定时器，1 秒后让可见性为 false 的元素消失
  //   const timer = setTimeout(() => {
  //     const newListData = cameraListData.filter((item) => item.visible)
  //   }, 1000)
  //   console.log(cameraListData)
  //   return () => clearTimeout(timer)
  //   // liebiao()
  // }, [cameraListData])

  useEffect(() => {
    cameralist()
    // if (searchResults.length > 0 && resultRef.current) {
    //   console.log(resultRef, 'resultRef')
    //   resultRef.current.scrollIntoView({
    //     behavior: 'smooth',
    //     block: 'center'
    //   })
    // }
  }, [searchResults])

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
              onChange={onChange}
            ></input>
            <div
              icon={<DownOutlined />}
              className="tab-Searchbox"
              onClick={onSearch}
            >
              <p className="tab-Magnifying"></p>
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 'tab1' && (
              <div className="tab-label">
                <p className="tab-Tree-structure">
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
                    // defaultExpandedKeys={['0-0-1-0']}
                    defaultExpandedKeys={['0-0-0-0']}
                    // defaultExpandAll 
                    ref={resultRef}
                    onSelect={onSelect}
                    onExpand={onExpand}
                    expandedKeys={expandedKeys}
                    autoExpandParent={autoExpandParent}
                  >
                    {/* {mapList(pageData[0])} */}
                    {/* {console.log('1111111')} */}
                    {loop(pageData)}
                  </Tree>
                </p>
              </div>
            )}
            {activeTab === 'tab2' && (
              <div className="tab-label">
                {/* pageData */}
                {alldata?.map((val, index) => (
                  // {cameraListData.map((val, index) => (
                  <div
                    className="Collect-img-tab2"
                    key={index}
                    style={{
                      // display: showCancelIcon[val.key] ? 'none' : 'block',
                      backgroundColor: favoritedItems.includes(val)
                        ? 'white !important'
                        : 'transparent'
                    }}
                  >
                    <ul className="Collect-list" key={val.id}>
                      <li className="Collect-number" key={index}>
                        {index + 1}
                      </li>
                      <li className="Collect-camera-img"></li>
                      <li className="Collect-text">{val.camera_name}</li>
                      <li
                        className="Collect-Star-img"
                        onClick={() => handleClickimgs(index)}
                      >
                        <img
                          src={imgsrc}
                          onClick={() => {
                            onStarsdisappear(val)
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
export default Jiankong
