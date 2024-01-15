// import { Button, Modal } from 'antd'、
import React, { useState } from 'react'
import {Switch} from 'antd'
import './index.scss'
const Details = (props) => {
  const tags=props
  const [date] = useState([
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    },
    {
      number: '1',
      photograph: '',
      room: '室内',
      floor: '无',
      point: '无',
      time: '2023-12-20 16:49:59',
      Controls: ''
    }
  ])
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <div id="face-carefuls">
      <div className="careful-header">
        <div className="careful-text">人脸抓拍明细</div>
        <div className="careful-img" onClick={props.onback}></div>
        {/* onClick={() => {
                onsizefo()
              }} */}
      </div>
      <ul className="careful-title">
        <li>
          <div className="careful-one">序号</div>
        </li>
        <li>
          <div className="careful-ten">照片</div>
        </li>
        <li>
          <div className="careful-qqq">室内/室外</div>
        </li>
        <li>
          <div className="careful-floor">楼层</div>
        </li>
        <li>
          <div className="careful-dainwei">点位名称</div>
        </li>
        <li>
          <div className="careful-time">时间</div>
        </li>
        <li>
          <div className="careful-Controls">操作</div>
        </li>
      </ul>
      <div className="careful-context">
        <div className="careful-Slide">
          {tags.map((val, index) => (
            <div>
              <ul className="careful-bottom">
                <li className="Serial-number">
                  <span className="Serial-number-span">{val.number}</span>
                </li>
                <li className="Serial-img">
                  <img className="context-img" src={val.face_pic_url}></img>
                  {/* {val.photograph} */}
                </li>
                <li className="Serial-room">
                  <span className="Serial-room-span">{val.room}</span>
                </li>
                <li className="Serial-wu">
                  <span className="Serial-wu-span">{val.floor}</span>
                </li>
                <li className="Serial-max">
                  <span className="Serial-max-sapn">{val.point}</span>
                </li>
                <li className="Serial-time">
                  <span className="Serial-time-sapn">{val.capture_time}</span>
                </li>
                <li className="Serial-video">
                  <div className="context-video"></div>
                  {/* {val.Controls} */}
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="careful-foot">
          <ul className="foot-one">
            <li>
              <Switch defaultChecked onChange={onChange} />
            </li>
            <li>
              <div className="foot-text">抓拍点合理性检查</div>
            </li>
            <li>
              <div className="foot-image">查看轨迹</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    // </Modal>
  )
}
export default Details
