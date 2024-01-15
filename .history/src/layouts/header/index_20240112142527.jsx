
// import React, { useState, useEffect } from 'react'
// import './XunGengprops.scss'
// import { useAtom } from 'jotai'
// import { XunGengpropsshow } from '../../../app/store'
// import { XunGeng } from '../../../api/home'

// function XunGengprops() {
//   const [XunGengpropshow, setXunGengpropshow] = useAtom(XunGengpropsshow)
//   const [xunGengListshow, setXunGengListshow] = useState(false)
//   const [xunGeng, setXunGeng] = useState([])
//   const [xunGengList, setXunGengList] = useState([])
//   const [num, serNum] = useState(0)
//   function Switch(str) {
//     setXunGengListshow((str) => !str)
//   }
//   //巡更路线
//   function getXunGeng() {
//     XunGeng().then((res) => {
//       // console.log(res.data.data)
//       setXunGeng(res.data.data)
//     })
//   }
//   function getXunGengList(index) {
//     XunGeng().then((res) => {
//       setXunGengList(res.data.data[index].positions)
//     })
//   }
//   useEffect(() => {
//     getXunGeng()
//   }, [])
//   return (
//     <div>
//           </div>
//             <div className="tbody">
//               {xunGeng.map((item, index) => (
//                 <ul key={index}>
//                   <li>{item.routeName}</li>
//                   <li>{item.positionRouteStr}</li>
//                   <li
//                     onClick={() => {
//                       Switch(xunGengListshow)
//                       getXunGengList(index)
//                     }}
//                   >
//                     查看
//                   </li>
//                 </ul>
//               ))}
//             </div>
//           </div>
//           <div className="xungeng-footer"></div>



// const [selectedRow, setSelectedRow] = useState(null);  
// const [isRed, setIsRed] = useState(false);  

// const handleButtonClick = (liId) => {  
//   setSelectedRow(liId);  
//   setIsRed(true);  
// };  

// return (  
//   <div>  
//     <ul style={{ backgroundColor: isRed ? "red" : "initial" }}>  
//       {[1, 2, 3, 4].map((item, index) => (  
//         <li key={index} style={{ backgroundColor: isRed ? "red" : "initial" }}>  
//           <button onClick={() => handleButtonClick(index)}>Item {item}</button>  
//         </li>  
//       ))}  
//     </ul>  
//   </div>  
// );  
// };  