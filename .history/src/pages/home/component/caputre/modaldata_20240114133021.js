import { Modal, Pagination } from 'antd'
import React, { useEffect, useState } from 'react'
import './index.scss'
import { Renlianzp } from '../../../../api/home'
const ModalData = (prop) => {
  const [inputValue, setInputValue] = useState('')
  const [searchResult, setSearchResult] = useState([])
  const [isDivVisible, setIsDivVisible] = useState(true)
  const [pageData,setPageData]=useState([]) // 当前页数据
  const [photograph, setPhotograph] = useState([])  // 渲染数据
  const [photographtwo, setPhotographtwo] = useState([]) // 原始数据
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [data] = useState([
    {
      id: 1,
      name: '第一个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      id: 2,
      name: '第二个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      id: 3,
      name: '第三个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      id: 4,
      name: '第四个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      id: 5,
      name: '第五个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      id: 6,
      name: '第六个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    }
  ])

  const Zhaopian = () => {
    Renlianzp().then((res) => {
      setPageData(res.data.data.slice(0,15))
      setPhotograph(res.data.data)
      setPhotographtwo(res.data.data)
      // console.log(res.data.data)
    })
  }
  // const code=photograph
  // const getGenderName=(sex)=>{
  //   if(sex===0){
  //     return '女';
  //   }else if(sex===1){
  //     return '男'
  //   }else{
  //     return '未知'
  //   }
  // }

  const handleChange = (event) => {
    setInputValue(event.target.value)
    // console.log(event.target.value)
    const value = event.target.value
    // const regex = /^[\u4e00-\u9fa5]+$/
    // if (!regex.test(value)) {
    //   event.target.value = value.slice(0, value.length - 1) // 移除最后一个非中文字符
    //   alert('只能输入中文');
    // }
  }
  const handleSearchClick = () => {
    // inputValue
    // if(photographtwo=""){
    //   photograph
    // }
    if(inputValue==='') setPhotograph(photographtwo)
    if (!isDivVisible) return
    const searchArr = photographtwo.filter(item=>{
      return item.name.includes(inputValue)
    })
    setPhotograph(searchArr)
    console.log('searchArr',searchArr)
    
    // setSearchResult(data.filter((div) => div.content.includes(inputValue)))
    // setIsDivVisible(false)
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
            onChange={(event)=>{
              setInputValue(event.target.value)
            }}
          ></input>
          <div className="Captrue-search" onClick={handleSearchClick}>
            <span className="Captrue-search-da"></span>
          </div>
        </div>
        <div className="capture-text">
          {searchResult.map((result) => (
            <div>{result.name}</div>
          ))}
          {isDivVisible &&
            pageData.map((val, index) => (
              <div className="capture-photo">
                <img className="photo-left" src={'val.face_url'}></img>
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
                      {val.sex == 0 ? '女' : '男' }
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
          <Pagination defaultCurrent={1} total={photograph.length} defaultPageSize={15} className="paging" 
            onChange={(e)=>{
              console.log('e',e)
              setPageData(photograph.slice((e-1)*15,e*15))
            }}
           />
        </div>
      </div>
    </Modal>
  )
}
export default ModalData
