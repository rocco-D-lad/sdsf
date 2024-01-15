import { atom } from 'jotai'
const dataPanelShow_atom = atom(true) //数据面板状态
const weatherState_atom = atom({
  sunny:false,
  cloudy: true,
  rain: true,
  snow: true
});//天气状态

export {
  dataPanelShow_atom,
  weatherState_atom
}
