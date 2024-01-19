import axios from 'axios'

const request = axios.create({
  baseURL:
    'https://console-mock.apipost.cn/mock/6791ab0a-dff9-4576-8abb-df33be3b5ee7/',
     timeout: 5000,
})

  // baceURL:'http://192.168.0.61:8055/mapvision_5.5_qsyh/',


// http://192.168.0.61:8055/mapvision_5.5_qsyh/device/camera/list
export default request


