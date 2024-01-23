import * as echarts from 'echarts'
import React, { useEffect, useState } from 'react'
import alarmImage from '../../../../assets/styles/images/img_1_3.png'
import axios from 'axios'
// import { getApi } from '../../../../pages/home'
// import api from '../../../../api/config'
import { getApi } from '../../../../pages/home'
import moment from 'moment'
// import { api } from '../../api/config';

// 报警管理 接口：http://localhost:9000/api/event/alarmCount
// 参数：{
//   "start_time":"2024-01-19 00:00:00", //开始时间
//   "end_time":"2024-01-19 23:00:00" //结束时间
// }
// 返回值：{
//   "code": "0",
//   "msg": "success",
//   "total": 1,
//   "data": {
//     "cartotalnum": "162", //车辆报警数量
//     "poptotalnum": "0", //人员报警数量
//     "videototalnum": "0" //视频报警
//   }
// }

function BaojingPie() {
  const api = getApi()

  const [cameradata, setcameradata] = useState()
  const color = [
    'rgb(79,173,175)',
    'rgb(78,170,248)',
    'rgb(238,143,83)',
    'rgb(237,113,75)'
  ]

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

  const getalarmCountList =async ()=>{
    console.log(api,"fhewiuhfwiuehfiwehfiuwehf");
    axios({
      url:`${api.dis.baseURL}/api/Token/GetToken`,
      method: 'POST',
      data: {
        appkey: '20170301'
      }
    
    }).then(async(res)=>{
    const cameralist = await axios({
      url:`${api.dis.baseURL}/api/event/alarmCount`,
      headers:{auth: res.data.token },
      method:'POST',
      data:{
        start_time: newDate(new Date(new Date().toLocaleDateString())), //
        end_time: newDate(
          new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
        ),
        
      }
    })
    console.log(cameralist,'cameralist');
    console.log(cameralist.data.data,'datattattatattat');
    setcameradata(cameralist.data.data)
    console.log(setcameradata,cameradata,'cameradata');
  })
}
  // // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位位置
  const color1 = [
    {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0.8,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(79,173,175, 0.4)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(79,173,175, 0.5)' // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0.8,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(78,170,248, 0.4)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(78,170,248, 0.5)' // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0.8,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(238,143,83, 0.4)' // 0% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(238,143,83, 0.4)' // 100% 处的颜色
        }
      ],
      global: false // 缺省为 false
    },
    {
      type: 'linear',
      x: 1,
      y: 0,
      x2: 0,
      y2: 0.8,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(237,113,75, 0.4)' // 100% 处的颜色
        },
        {
          offset: 1,
          color: 'rgba(237,113,75, 0.4)' // 0% 处的颜色
        }
      ],
      global: false // 缺省为 false
    }
  ]
  const datas = [
    { name: '车辆报警', value: 123 },
    { name: '人员报警', value: 123 },
    { name: '视频报警', value: 123 }
    // { name: '安防报警', value: 123 }
  ]
  useEffect(() => {
    console.log(1111111)
    getalarmCountList()
    console.log(1111111)

    var myChart = echarts.init(document.getElementById('main'))
    //指定图标配置
    var option = {
      tooltip: {
        show: true
      },
      legend: {
        right: '40%',
        top: 'center',
        orient: 'vertical',
        itemGap: 20,
        itemWidth: 10,
        itemHeight: 10,
        icon: 'rect',
        data: datas,
        textStyle: {
          fontSize: 14,
          fontWeight: 'lighter',
          color: '#FFFFFF',
          fontFamily: 'Microsoft YaHei, Microsoft'
        }
      },

      series: [
        {
          type: 'pie',
          radius: ['70%', '90%'],
          center: ['20%', '50%'],
          hoverAnimation: true,
          z: 9,
          itemStyle: {
            borderWidth: 5,
            borderColor: 'rgb(16,48,52)',
            color: function (params) {
              return color[params.dataIndex]
            }
          },
          label: {
            show: false
          },
          data: datas,
          labelLine: {
            show: false
          }
        },
        {
          type: 'pie',
          radius: ['50%', '76%'],
          center: ['20%', '50%'],
          hoverAnimation: true,
          z: 10,
          itemStyle: {
            normal: {
              borderWidth: 4,
              borderColor: 'rgb(16,48,52)',
              color: function (params) {
                return color1[params.dataIndex]
              }
            }
          },
          label: {
            show: false
          },
          data: datas,
          labelLine: {
            show: false
          }
        }
      ],
      graphic: [
        {
          type: 'image',
          id: 'logo',
          left: '6%',
          top: '-2%',
          z: 20,
          bounding: 'raw',
          style: {
            image: `${alarmImage}`, // 设置图片的 URL，环形图中心空白，引用图片
            width: 132,
            height: 132
          }
        }
      ]
    }

    //对实例对象配置
    myChart.setOption(option)
  }, [])
  return <div id="main" style={{ width: '463px', height: '130px' }}></div>
}

export default BaojingPie
