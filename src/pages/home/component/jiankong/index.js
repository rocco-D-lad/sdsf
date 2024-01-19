import React, { useState, useEffect, useRef, useLayoutEffect } from 'react'
import './index.scss'
import { Tree } from 'antd'
import { CaretDownOutlined } from '@ant-design/icons'
import imgsrc from '../../../../assets/styles/images/icon_sc.png'
import { Listlieb } from '../../../../api/home'
import icon_jk from '../../../../assets/styles/images/icon_jk.png'
import icon_jkCancel from '../../../../assets/styles/images/icon_sc_2.png'
import imgxz from '../../../../assets/styles/images/img-xz.png'
import { DownOutlined } from '@ant-design/icons'

const dinfineInitData = [
  {
    name: '1',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '2',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '3',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '4',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '5',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  },
  {
    name: '校区-1区校区-1区',
    imgjkcanael: 'imgsrc',
    visible: true
  }
]

const Jiankong = () => {
  const [activeTab, setActiveTab] = useState('tab1')
  const [cancel, setCancel] = useState(true)
  const [pageData, setPageData] = useState([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const { TreeNode } = Tree
  const [expandedKeys, setExpandedKeys] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [selectedItem, setSelectedItem] = useState(true)
  const [showCancelIcon, setShowCancelIcon] = useState({})
  const [showCancelIconcollect, setShowCancelIconcollect] = useState(true)
  const [searchResults, setSearchResults] = useState([])
  const [favoritedItems, setFavoritedItems] = useState([])
  const [listdata, setListData] = useState(dinfineInitData)
  const resultRef = useRef(null)
  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }
  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info)
  }

  //  收藏里面的内容
  const handleFavorite = (val) => {
    let newListData = listdata.map((item) => {
      if (item === val) {
        // 当前点击的元素
        return {
          ...item,
          imgjkcanael:
            item.imgjkcanael === 'imgsrc' ? 'icon_jkCancel' : 'imgsrc',
          visible: false // 更新状态为 false
        }
      } else {
        // 其他元素
        return item
      }
    })
    setListData(newListData.filter((item) => item.visible))
    if (val.imgjkcanael === 'imgsrc') {
      setFavoritedItems([...favoritedItems, val])
    } else {
      setFavoritedItems(favoritedItems.filter((item) => item !== val))
    }
  }

  const onExpand = (expandedKeys) => {
    // debugger
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  }

  //搜索内容
  const onChange = (e) => {
    const { value } = e.target
    console.log(value)
    setInputValue(value)

    if (activeTab === 'tab1') {
      setSearchValue(value)
    }

    if (activeTab === 'tab2') {
      console.log(value, 'tab2')

      if (!value.trim()) {
        setListData(dinfineInitData)
      }

      if (value) {
        setListData(
          dinfineInitData.filter((item) => item.name.includes(value.trim()))
        )
      }
    }
  }

  const loop = (data) =>
    data.map((item) => {
      const { title, key, children } = item
      const index = title.indexOf(searchValue)

      const handleClickimg = () => {
        console.log('aaaaaa')
        setShowCancelIcon({
          ...showCancelIcon,
          [key]: !showCancelIcon[key]
        })
        console.log('sssss')
      }

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
            title={
              <div className="list-img-flex">
                <div className="list-img-icon-jk">
                  <img src={icon_jk}></img>
                </div>
                <div className="list-text-icon-buttom">{titleNode}</div>
                <div>
                  {showCancelIcon[key] ? (
                    <img src={imgsrc} onClick={handleClickimg}></img>
                  ) : (
                    <img src={icon_jkCancel} onClick={handleClickimg}></img>
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
                {showCancelIcon[key] ? (
                  <img src={imgsrc} onClick={handleClickimg}></img>
                ) : (
                  <img src={icon_jkCancel} onClick={handleClickimg}></img>
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

  //按钮方法
  const onSearch = (event) => {
    setIsExpanded(true)
    console.log('Search:', event.target.value)
    setInputValue(event.target.value)
    const findMatchedKeys = (data, value) => {
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
    const matchedKeys = findMatchedKeys(pageData, searchValue)

    setExpandedKeys(matchedKeys)
    setAutoExpandParent(true)
    const results = listdata.filter((item) => matchedKeys.includes(item.key))
    setSearchResults(results)

    setTimeout(() => {
      if (resultRef.current && results.length > 0) {
        resultRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        })
      }
    }, 0)
  }

  useEffect(() => {
    Listlieb().then((res) => {
      console.log(res.data.data[0].children, '列表数据data')
      console.log(res.data, '列表数据')
      // listToTree(res.data.data, 'id', 'pid')
      setPageData(res.data.data[0].children)
      // setPageData([res.data.data])
    })
    // 请求收藏列表 setarr
  }, [])

  useEffect(() => {
    console.log(1212313,"test");
    // 定时器，1 秒后让可见性为 false 的元素消失
    const timer = setTimeout(() => {
      const newListData = listdata.filter((item) => item.visible)
    }, 10 * 1000)
    return () => clearTimeout(timer)
    // liebiao()
  }, [listdata])

  useEffect(() => {
    if (searchResults.length > 0 && resultRef.current) {
      console.log(resultRef,"resultRef");
      resultRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
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
              // onClick={handleSearchClick}
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
                    defaultExpandedKeys={['0-0-1']}
                    defaultExpandAll
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
                {listdata.map((val, index) => (
                  <div
                    className="Collect-img-tab2"
                    key={index}
                    style={{
                      backgroundColor: favoritedItems.includes(val)
                        ? 'white !important'
                        : 'transparent'
                    }}
                  >
                    <ul className="Collect-list">
                      <li className="Collect-number" key={index}>
                        {index + 1}
                      </li>
                      <li className="Collect-camera-img"></li>
                      <li className="Collect-text">{val.name}</li>
                      <li
                        className="Collect-Star-img"
                        onClick={() => handleFavorite(val)}
                      >
                        {val.imgjkcanael === 'imgsrc' ? (
                          <img src={imgsrc}></img>
                        ) : (
                          <img src={icon_jkCancel}></img>
                        )}
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
