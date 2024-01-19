import React, { useState } from 'react'
import './index.scss'
const Videofusion = (props) => {
  const tags = props
  const [data] = useState([
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    },
    {
      name: '南北区监控_D区连廊-南向'
    }
  ])

  return (
    <div>
      <div className="modal-overlay" onClick={props.onback}>
        <div id="Video-max">
          <div className="Video-header">
            <div className="video-header-text">设备列表</div>
            <div className="video-header-off" onClick={props.onback}>
              关闭
            </div>
          </div>
          <div className="video-centex">
            {data.map((val, index) => (
              <ul className="video-centxt-ul">
                <li>{val.name}</li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videofusion
