import { Modal, Pagination, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.scss'
import { Renlianzp } from '../../../../api/home'
const ModalData = (prop) => {
  const { setImgSrc } = prop || {}
  const [inputValue, setInputValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isDivVisible, setIsDivVisible] = useState(true)
  const [pageData, setPageData] = useState([]) // 当前页数据
  const [photograph, setPhotograph] = useState([]) // 渲染数据
  const [photographtwo, setPhotographtwo] = useState([]) // 原始数据
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const options = [10, 20, 30, 40, 50]
  const [current, setCurrent] = useState(1) // 当前页码
  const [pageSize, setPageSize] = useState() // 每页显示的数据数量
  const [total, setTotal] = useState(0) // 数据总数，根据实际情况进行计算或传递

  const Zhaopian = () => {
    Renlianzp().then((res) => {
      setPageData(res.data.data)
      // setPageData(res.data.data.slice(0, 15))
      setPhotograph(res.data.data)
      setPhotographtwo(res.data.data)
      console.log(res.data.data)
    })
  }

  const handleSearchClick = (e) => {
    console.log(pageSize,current,'pageSize')
    // const {value}=e.target
    // console.log(e.target.value,'value');
    // setPageData(searchArr.slice(0, 15))
    if (inputValue === '') {
      // setPageData(photographtwo.slice(0, 15))
      setPageData(photographtwo)
      setCurrent(1);
      console.log('asdasdasd')
      // setInputValue('') // 清空input值
      return
    }
    if (!isDivVisible) return
    const searchArr = photographtwo.filter((item) => {
      return item.name.includes(inputValue)
    })
    setPhotograph(searchArr)
    // setPageData(searchArr.slice(0, 15))
    setPageData(searchArr)
    console.log(searchArr)
  }

  useEffect(() => {
    Zhaopian()
  }, [])
  return (
    <Modal
      title="抓拍库"
      open={prop.caputre}
      footer={[<></>]}
      onOk={prop.onback}
      onCancel={prop.onback}
      style={{
        width: 'auto'
      }}
      centered
    >
      <div className="Capture-photograph">
        <div className="capture-header">
          <input
            type="text"
            value={inputValue}
            className="Captrue-input"
            placeholder="请输入姓名"
            onChange={(event) => {
              setInputValue(event.target.value)
              if (event.target.value === '') {
                setCurrent(1);
                setPhotograph(photographtwo)
                setPageData(photographtwo.slice(0, 15))
                // setInputValue('') // 清空input值
              }
            }}
          ></input>
          <div className="Captrue-search" onClick={() => handleSearchClick()}>
            <span className="Captrue-search-da"></span>
          </div>
        </div>
        <div className="capture-text">
          {searchResult.map((result) => (
            <div>{result.name}</div>
          ))}
          {isDivVisible &&
            pageData.map((val, index) => (
              <div className="capture-photo" onClick={prop.onback}>
                <img
                  className="photo-left"
                  src="https://gw.alicdn.com/bao/uploaded/i4/1993969976/O1CN01LqQh2T2NZ3vZi1oil_!!0-item_pic.jpg_300x300q90.jpg"
                  onClick={() => {
                    setImgSrc(
                      'https://gw.alicdn.com/bao/uploaded/i4/1993969976/O1CN01LqQh2T2NZ3vZi1oil_!!0-item_pic.jpg_300x300q90.jpg'
                    )
                  }}
                ></img>
                <div className="photo-right">
                  <div>
                    <span>姓名&nbsp;:&nbsp;&nbsp;&nbsp;</span>
                    <span>{val.name}</span>
                  </div>
                  <div>
                    <span>年龄&nbsp;:&nbsp;&nbsp;&nbsp;</span>
                    <span>{val.age}</span>
                  </div>
                  <div>
                    <span>性别&nbsp;:&nbsp;&nbsp;&nbsp;</span>
                    <span>
                      {/* {val.sex === 0 ? '女' : val.sex === 1 ? '男' : '未知'} */}
                      {val.sex == 0 ? '女' : '男'}
                    </span>
                  </div>
                  <div>
                    <span>抓拍点&nbsp;:&nbsp;&nbsp;&nbsp;</span>
                    <span>{val.totole}</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div>
          <Pagination
            className="paging"
            defaultCurrent={1}
            current={current}
            // defaultCurrent={libParam.pageNo}
            // pageSize={libParam.pageSize}
            total={photograph.length}
            defaultPageSize={15}
            onChange={(page, pageSize) => {
              setCurrent(page)
              setPageSize(pageSize)
              // console.log('e', e)
              // setPageData(photograph.slice((e - 1) * 15, e * 15))
              setPageData(
                photograph.slice((page - 1) * pageSize, page * pageSize)
               
              )
            }}
          />
        </div>
      </div>
    </Modal>
  )
}
export default ModalData