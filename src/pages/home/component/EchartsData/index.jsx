import * as echarts from 'echarts'
import React, { useEffect } from 'react'
import alarmImage from '../../../../assets/styles/images/img_1_3.png'

function BaojingPie() {
  const color = [
    'rgb(79,173,175)',
    'rgb(78,170,248)',
    'rgb(238,143,83)',
    'rgb(237,113,75)'
  ]
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
    { name: '测速报警', value: 123 },
    { name: '人员报警', value: 123 },
    { name: '车辆报警', value: 123 },
    { name: '安防报警', value: 123 }
  ]
  useEffect(() => {
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
            height: 132,
          }
        }
      ]
    }

    //对实例对象配置
    myChart.setOption(option)
  }, [])
  return (
    <div id="main" style={{ width: '463px', height: '130px'}}>
      {' '}
    </div>
  )
}

export default BaojingPie
