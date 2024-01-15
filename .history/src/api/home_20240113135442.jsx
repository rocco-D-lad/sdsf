import request from './request'

//获取巡更路线接口
export const XunGeng = () => request.post('/api/patrol/GetPatrolList')
// 获取报警列表
export const BaoJing = () =>
  request.post('api/event/eventList', {
    pageNum: '1', //页码
    pageSize: '10', //页尺
    start_time: '2024-01-10 00:00:59', //开始时间
    end_time: '2024-01-10 23:59:59', //结束时间
    alarm_Type: '' //报警类型 传空字符是查询所有
  })

export const QuShi = () =>
  request.post('api/event/AlarmRecordCount', { type: '' })
export const QuShiDay = () =>
  request.post('api/event/AlarmRecord', { type: 'day' })
export const Qitian = () =>
  request.post('api/event/AlarmRecordCount', {
    type: '' //传空是7天趋势
  })

export const Yitian = () =>
  request.post('api/event/AlarmRecord', {
    type: 'day' //类型 day是当天
  })
export const datass = (data) => request.post('api/event/AlarmRecordCount', data)
// export const Qitian =()=>request.post('api/event/AlarmRecordCount')

// export const GetstateList = (params) =>
//   request.get('/api/device/building/vrflist', { params })

// export const AddshareField = data=>request.post("/api/fields",data)

// export const DelshareField = id =>request.delete("/api/fields/"+id)
datass({ type: 'day' }).then()

export const Renlianzp = () =>
  request.post('/api/face/lib', {
    name: '',
    pageNum: 1,
    pageSize: 20,
    start_time: '2024-01-06T02:23:32.192Z',
    end_time: '2024-01-13T02:23:32.193Z',
    total: 0
  })
