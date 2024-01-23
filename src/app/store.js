import { configureStore } from '@reduxjs/toolkit'
import appSlice from './appSlice'
import { atom } from 'jotai'

// export const store = configureStore({
//   reducer: {
//     // global slice
//     app: appSlice,

//     // example slice
//     example: exampleSlice

//     // set other slice
//   }
// })

const facepropsshow = atom(false)
const ZhuaPaipropsshow = atom(false)
const XunGengpropsshow = atom(false)
const facesousuoshow = atom(false)
const RongHepropshow = atom(false)
/*上图 */
const cameraCode = atom(null)
const canmeraList = atom(null)

export {
  facepropsshow,
  ZhuaPaipropsshow,
  XunGengpropsshow,
  facesousuoshow,
  RongHepropshow,
  cameraCode,
  canmeraList
}


