import axios from 'axios'

const request = axios.create({
  baseURL:
    'https://console-mock.apipost.cn/mock/6791ab0a-dff9-4576-8abb-df33be3b5ee7/',
     timeout: 5000
})

export default request
