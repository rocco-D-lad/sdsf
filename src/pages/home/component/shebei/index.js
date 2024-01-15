import React from 'react'
import './index.scss'

const Shebei = () => {
  return (
    <div id="round-left-header">
      <p className="round-left-totality"></p>
      <p className="round-left-title">
        <p className="round-title">监控设备总数</p>
        <p className="rounf-leftTitle-quantity">1425</p>
        <p className="title-Statistics">
          <p className="Statistics-online">
            <p className="online-img"></p>
            <p className="online-text">在线</p>
            <p className="online-people">478</p>
          </p>
          <p className="Statistics-Offline">
            <p className="Offline-img"></p>
            <p className="Offline-text"> 离线</p>
            <p className="Offline-people">154</p>
          </p>
        </p>
      </p>
    </div>
  )
}
export default Shebei
