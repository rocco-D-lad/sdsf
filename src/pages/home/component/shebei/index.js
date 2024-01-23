import React, { useEffect, useState } from 'react'
import './index.scss'
import axios from 'axios'
import { getApi } from '../../../../pages/home'

// http://localhost:9000/api/device/camera/statusnum GET请求 online //在线 offline //离线  total  //总数

const Shebei = () => {
  const api = getApi()
  const [totality, settotality] = useState([])
  const [cameradata, setcameradata] = useState([])

  // 时间转化 2023-5-31 00:00:00
  const newDate = (time) => {
    var date = new Date(time)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    var d = date.getDate()
    d = d < 10 ? '0' + d : d
    var h = date.getHours()
    h = h < 10 ? '0' + h : h
    var minute = date.getMinutes()
    minute = minute < 10 ? '0' + minute : minute
    var s = date.getSeconds()
    s = s < 10 ? '0' + s : s
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + s
  }

  const getalarmCountList = async () => {
    axios({
      url: `${api.dis.baseURL}/api/Token/GetToken`,
      method: 'POST',
      data: {
        appkey: '20170301'
      }
    }).then(async (res) => {
      const cameralist = await axios({
        url: `${api.dis.baseURL}/api/device/camera/statusnum`,
        headers: { auth: res.data.token },
        method: 'GET',
      })
      console.log(cameralist)
      console.log(cameralist.data)
      console.log(cameralist.data.data)
      setcameradata(cameralist.data.data)
      console.log(cameradata,'cameradata');
    })
  }
  useEffect(() => {
    getalarmCountList()
  }, [])

  return (
    <div id="round-left-header">
      <p className="round-left-totality"></p>
      <p className="round-left-title">
        <p className="round-title">监控设备总数</p>
        <p className="rounf-leftTitle-quantity">111</p>
        <p className="title-Statistics">
          <p className="Statistics-online">
            <p className="online-img"></p>
            <p className="online-text">在线</p>
            <p className="online-people">111</p>
          </p>
          <p className="Statistics-Offline">
            <p className="Offline-img"></p>
            <p className="Offline-text"> 离线</p>
            <p className="Offline-people">111</p>
          </p>
        </p>
      </p>
    </div>
  )
}
export default Shebei


// const handleClickimg = () => {
//   console.log('aaaaaa')
//   setShowCancelIcon({
//     ...showCancelIcon,
//     [key]: !showCancelIcon[key]
//   })
//   console.log('sssss')
// }