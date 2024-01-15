import React, { useEffect } from 'react'
import { useState } from 'react'
import './index.scss'
import List from '../list'
import { XunGeng } from '../../../../api/home'


const Theounds = (prop) => {
  const [taunts, setTaunts] = useState(false)
  const [xunGeng, setXunGeng] = useState([])
  const [xunGengList, setXunGengList] = useState([])
  const [selectedRow, setSelectedRow] = useState(null); 
  const [isRed, setIsRed] = useState(false);  
  const [clickNumber, setClickNumber] = useState();  
  // const onsizefo = () => {
  //   setTaunts(true)
  // }
  const onManufacturer = () => {
    setTaunts(false)
  }

  const handleButtonClick = (liId) => {  
      setSelectedRow(liId);  
      setIsRed(true);  
    }; 

  //巡更路线
  const getXunGeng=()=>{
    XunGeng().then((res)=>{
      console.log(res.data.data)
      console.log(res.data)
      setXunGeng(res.data.data)
    })
  }
  const getXunGengList=(index)=>{
    XunGeng().then((res)=>{
      // console(res.data.data[0].positions)
      setXunGengList(res.data.data[index].positions)
    })
  }
  const Switch=(str)=>{
    setTaunts((str)=>!str)
  }
  useEffect(()=>{
    getXunGeng()
  },[])
  return (
    <div id="details">
      {taunts && <List taunts={taunts} onsize={onManufacturer} xunGengList={xunGengList}></List>}
      <div className="details-header">
        <div className="details-header-text">巡更详情</div>
        <div className="details-header-img" onClick={prop.onback}>
          关闭
        </div>
      </div>
      <div className="details-context">
        <div className="details-context-header">
          <div className="details-context-kong">
            <ul className="details-context-ul">
              <li className="details-context-li">路线名称</li>
              <li>巡更点名称</li>
              <li>详情</li>
            </ul>
          </div>
        </div>
        <div className="details-foot">
          {xunGeng.map((val, index) => (
            <ul className={`details-foot-ul ${index===clickNumber&&'details-foot-ul-red'}`} style={{ backgroundColor: isRed ? "red" : "initial" }}>
              <li key={index} style={{ backgroundColor: isRed ? "red" : "initial" }}>
                <div className="details-foot-yi">{val.routeName}</div>
              </li>
              <li>
                <div className="details-foot-301">{val.positionRouteStr}</div>
              </li>
              <li>
                <div className="details-foot-button">
                  <button
                    className="details-foot-look"
                    onClick={() => {
                      Switch(taunts)
                      getXunGengList(index)
                      handleButtonClick(index)
                      // onsizefo()
                      setClickNumber(idx)
                    }}
                  >
                    查看
                  </button>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
export default Theounds
