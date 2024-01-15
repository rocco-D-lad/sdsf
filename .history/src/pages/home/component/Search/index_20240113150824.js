import React, { useState } from 'react'
import './index.scss'
import Details from '../details'
import Tansuo from '../../../../api/home'

export default function Search(props) {
  const [face, setFace] = useState(false)
  const [analarm, setAnalarm] = useState([])
  const [date] = useState([
    {
      number: '01',
      time: '2023-12-20 16:45:14',
      frequency: '1'
    },
    {
      number: '01',
      time: '2023-12-20 16:45:14',
      frequency: '1'
    },
    {
      number: '01',
      time: '2023-12-20 16:45:14',
      frequency: '1'
    },
    {
      number: '01',
      time: '2023-12-20 16:45:14',
      frequency: '1'
    },
    {
      number: '01',
      time: '2023-12-20 16:45:14',
      frequency: '1'
    },
    {
      number: '01',
      time: '2023-12-20 16:45:14',
      frequency: '1'
    },
  ])


  const alarmlist = () => {
    BaoJing().then((res) => {
      console.log(res.data)
      setAnalarm(res.data.data)
    })
  }
  const onofce = () => {
    setFace(true)
  }
  const onCancel = () => {
    setFace(false)
  }
  return (
    <div id="results">
      
      <div id="details-header">
        <div className="details-header-text">人脸轨迹检索结果</div>
        <div className="details-header-img" onClick={props.onback}>关闭</div>
      </div>
      <div id="details-context">
        <div className="details-context-header">
          <div className="details-context-kong">
            <ul className="details-context-ul">
              <li className="details-context-li">序号</li>
              <li>时间</li>
              <li>次数</li>
            </ul>
          </div>
        </div>
        <div className="details-foot">
          {date.map((val, index) => (
            <ul className="details-foot-ul" onClick={()=>{onofce()}}>
              <li>
                <span className="details-foot-yi">{val.number}</span>
              </li>
              <li>
                <span className="details-foot-301">{val.time}</span>
              </li>
              <li>
                <span id="details-foot-button">
                  {val.frequency}
                  {/* <span className="details-foot-button-img">{val.frequency}</span> */}
                </span>
              </li>
            </ul>
          ))}
        </div>
      </div>
      {face && <Details face={face} onback={onCancel}></Details>}
    </div>
  )
}
