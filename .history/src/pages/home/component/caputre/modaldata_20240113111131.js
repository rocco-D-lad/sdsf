import { Modal,Pagination  } from 'antd'
import React, { useState } from 'react'
import  './index.scss'
const ModalData = (prop) => {
  const [inputValue, setInputValue] = useState(''); 
  const [searchResult, setSearchResult] = useState([]); 
  // const [isModalOpen, setIsModalOpen] = useState(false)
  const [data] = useState([
    {
      name: '第一个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      name: '第二个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      name: '第三个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      name: '第四个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      name: '第五个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
    {
      name: '第六个',
      age: '手机号',
      detl: '男',
      totole: '抓拍点'
    },
  ])
  const handleChange = (event) => {  
    setInputValue(event.target.value); 
    console.log(event.target.value); 
    const value = event.target.value;  
    const regex = /^[\u4e00-\u9fa5]+$/;  
    if (!regex.test(value)) {  
      event.target.value = value.slice(0, value.length - 1); // 移除最后一个非中文字符  
      // alert('只能输入中文');  
    }  
  };  
  const handleSearchClick=()=>{
    setSearchResult(divArray.filter((div)=>div.content.includes(inputValue)))
  }
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
                onChange={handleChange}
              ></input>
              <div className="Captrue-search" onClick={handleSearchClick}>
                <span className="Captrue-search-da"></span>
              </div>
            </div>
            <div className="capture-text">
              {data.map((val, index) => (
                <div className="capture-photo">
                  <div className="photo-left"></div>
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
                      <span>{val.detl}</span>
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
            <Pagination defaultCurrent={1} total={500} className='paging'/>
            
            </div>
          </div>
        </Modal>
  )
}
export default ModalData
