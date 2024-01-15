
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



import React, { useState } from 'react';  
  
const MyComponent = () => {  
  const [inputValue, setInputValue] = useState('');  
  const [searchResult, setSearchResult] = useState([]);  
  const [divArray, setDivArray] = useState([  
    { id: 1, content: 'Div 1' },  
    { id: 2, content: 'Div 2' },  
    { id: 3, content: 'Div 3' },  
    { id: 4, content: 'Div 4' },  
    { id: 5, content: 'Div 5' },  
  ]);  
  const [isDivVisible, setIsDivVisible] = useState(true);  
  
  const handleInputChange = (event) => {  
    setInputValue(event.target.value);  
  };  
  
  const handleSearchClick = () => {  
    setSearchResult(divArray.filter((div) => div.content.includes(inputValue)));  
    setIsDivVisible(false); // 隐藏所有div  
  };  
  
  return (  
    <div>  
      <input type="text" value={inputValue} onChange={handleInputChange} />  
      <button onClick={handleSearchClick}>Search</button>  
      {searchResult.map((result) => (  
        <div key={result.id}>{result.content}</div>  
      ))}  
      {isDivVisible && divArray.map((div) => (  
        <div key={div.id}>{div.content}</div>  
      ))}  
    </div>  
  );  
};  
  
export default MyComponent;


// const getGenderName = (code) => {  
//     if (code === 0) {  
//       return '女';  
//     } else if (code === 1) {  
//       return '男';  
//     } else {  
//       return '未知';  
//     }  
//   };  
  
//   return (  
//     <div>  
//       <p>性别: {getGenderName(genderCode)}</p>  
//     </div>  
//   );  


// import React from 'react';  
  
// const GenderListComponent = ({ genderCodes }) => {  
//   return (  
//     <ul>  
//       {genderCodes.map((code, index) => (  
//         <li key={index}>  
//           {code === 0 ? '女' : code === 1 ? '男' : '未知'}  
//         </li>  
//       ))}  
//     </ul>  
//   );  
// };  
  
// export default GenderListComponent;