import React, { useState } from 'react'
import './index.scss'
import Details from '../details'

export default function Search(props) {
  const [face, setFace] = useState(false)
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

  const onofce = () => {
    setFace(true)
  }
  return (
    <div id="results">
      <div id="details-header">
        <div className="details-header-text">巡更点列表</div>
        <div className="details-header-img" onClick={props.onback}>关闭</div>
      </div>
      <div id="details-context">
        <div className="details-context-header">
          <div className="details-context-kong">
            <ul className="details-context-ul">
              <li className="details-context-li">序号</li>
              <li>巡更点名称</li>
              <li>详情</li>
            </ul>
          </div>
        </div>
        <div className="details-foot">
          {date.map((val, index) => (
            <ul className="details-foot-ul" onClick={onofce()}>
              <li>
                <div className="details-foot-yi">{val.number}</div>
              </li>
              <li>
                <div className="details-foot-301">{val.time}</div>
              </li>
              <li>
                <div id="details-foot-button">
                  {val.frequency}
                  {/* <span className="details-foot-button-img">{val.frequency}</span> */}
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
