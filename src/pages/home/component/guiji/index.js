// import React, { useState } from 'react'
// import { DatePicker,Modal } from 'antd'
// import ModalData from '../caputre/modaldata'
// import './index.scss'
// import Details from '../details'

// const Guiji = () => {
//   const [similarity, setSimilarity] = useState(0)
//   const [startdata, setStartData] = useState('')
//   const [enddata, setEndData] = useState('')
//   const [face, setFace] = useState(true)
//   const [caputre, setCaputre] = useState(false)
//   const handleSimilarityChange = (event) => {
//     const value = event.target.value
//     setSimilarity(value)
//   }
//   const timeStart = (data) => {
//     setStartData(data)
//   }
//   const timeEnd = (data) => {
//     setEndData(data)
//   }

//   const onCapture = (event) => {
//     setCaputre(true)
//   }
//   const onBack = () => {
//     setCaputre(false)
//   }
//   const onofce = () => {
//     setFace(true)
//   }
//   const onCancel = () => {
//     setFace(false)
//   }

//   return (
//     <div className='ku-right'>
//       <div id='zhuapai-ku'>
//         {caputre && <ModalData caputre={caputre} onback={onBack}></ModalData>}
//       </div>
//       <div id="renlian-ku">
//         {face && <Details face={face} onback={onCancel}></Details>}
//       </div>
//       <div className="one">
//         <div className="round-left-top">
//           <p className="round-left-img"></p>
//           <p className="round-left-font">人脸轨迹</p>
//         </div>
//         <div className="round-left-header">
//           <p className="hunt-down"></p>
//           <div className="down-input">
//             <div className="data-span-right">
//               <div style={{ color: 'white' }}>相似度:</div>
//               <div className="similarity-percent">
//                 <input
//                   className="similarity-percent1"
//                   type="range"
//                   min="0"
//                   max="100"
//                   // step="1"
//                   value={similarity}
//                   onChange={handleSimilarityChange}
//                   style={{ width: '80%' }}
//                 />
//               </div>
//               <span className="c-percent" style={{ color: 'white' }}>
//                 {similarity}%
//               </span>
//             </div>
//             <div>
//               <div className="calendar">
//                 <div className="calender-time">
//                   <div className="initiate">开始时间</div>
//                   <DatePicker
//                     className="datepicker-left"
//                     placeholder="开始时间"
//                     value={startdata}
//                     onChange={timeStart}
//                     // suffixIcon={<CaretDownOutlined/>}
//                   />
//                 </div>
//                 <div className="calender-end">
//                   <h3 className="initiate">结束时间</h3>
//                   <DatePicker
//                     className="datepicker-right"
//                     placeholder="结束时间"
//                     value={enddata}
//                     onChange={timeEnd}
//                     // disabledDate={disableData}
//                   />
//                 </div>
//               </div>
//             </div>
//             <div className="Capture-photograph">
//               <div className="Capture-library">
//                 <div className="Capture-library-left" onClick={onCapture}>
//                   抓拍库
//                 </div>
//                 <div
//                   className="Capture-library-right"
//                   onClick={() => {
//                     onofce()
//                   }}
//                 >
//                   人脸库
//                 </div>
//               </div>
//               <div className="Capture-search">
//                 <div className="Capture-search-img"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//     </div>
//   )
// }
// export default Guiji
