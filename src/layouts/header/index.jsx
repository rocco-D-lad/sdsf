import React, { useState } from 'react';

const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleItemClick = (item) => {
    // 处理点击下拉列表项的逻辑
    console.log(`Clicked on ${item}`);
    // 这里可以根据需要进行其他操作
  };

  return (
    <div>
      <img
        src="path/to/your/image.jpg"
        alt="Dropdown Trigger"
        style={{ cursor: 'pointer',transform: showDropdown ? 'rotate(90deg)' : 'rotate(0deg)'  }}
        onClick={toggleDropdown}
      />

      {showDropdown && (
        <div style={{ position: 'absolute', top: '50px', left: '0', border: '1px solid #ccc' }}>
          <ul style={{position:'absolute',top:'100px'}}>
            <li onClick={() => handleItemClick('Item 1')}>Item 1</li>
            <li onClick={() => handleItemClick('Item 2')}>Item 2</li>
            <li onClick={() => handleItemClick('Item 3')}>Item 3</li>
            {/* Add more items as needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div>
      <h1>React Dropdown Example</h1>
      <Dropdown />
    </div>
  );
};

export default App;