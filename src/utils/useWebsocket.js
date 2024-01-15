import {useState, useRef, useEffect} from 'react'

const useWebsocket = ({ url }) => {
    const ws = useRef(null)
    // socket 数据
    const [wsData, setMessage] = useState({})
    //  socket 状态
    const [readyState, setReadyState] = useState({ key: 0, value: '正在连接中' })
    const creatWebSocket = () => {
      const stateArr = [
        {key: 0, value: '正在连接中'},
        {key: 1, value: '已经连接并且可以通讯'},
        {key: 2, value: '连接正在关闭'},
        {key: 3, value: '连接已关闭或者没有连接成功'},
      ]
      try {
        ws.current = new WebSocket(url)
        ws.current.onopen = () => {
          // ws.current.send('subscribe')
          setReadyState(stateArr[ws.current?.readyState ?? 0])
        }
        ws.current.onclose = () => {
          setReadyState(stateArr[ws.current?.readyState ?? 0])
        }
        ws.current.onerror = () => {
          setReadyState(stateArr[ws.current?.readyState ?? 0])
        }
        ws.current.onmessage = (e) => {
          if(e.data.length > 10){
            setMessage({...JSON.parse(e.data)})
          }else{
            console.log('报警初始化推送：', e.data)
          }
        }

      } catch (error) {
        console.log(error)
      }
    }

    const webSocketInit = () => {
      if (!ws.current || ws.current.readyState === 3) {
        creatWebSocket()
      }
    }

    //  关闭 WebSocket
    const closeWebSocket = () => {
      ws.current?.close()
    }

    // 发送数据
    const sendMessage = (str) => {
      ws.current?.send(str)
    }

    //重连
    const reconnect = () => {
      try {
        closeWebSocket()
        ws.current = null
        creatWebSocket()
      } catch (e) {
        console.log(e)
      }
    }

    useEffect(() => {
      webSocketInit()
      return () => {
        ws.current?.close()
      }
    }, [ws])

    return {
      wsData,
      readyState,
      closeWebSocket,
      reconnect,
      sendMessage
    }
}

export default useWebsocket;
