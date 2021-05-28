import React from 'react';
import { Calendar } from 'antd';

const MyCalenar = () => {
  function onSelect(value) {
    alert(value);
  }
  const style = {
    width: '300px',
    border: '1px solid #f0f0f0',
    borderRadius: '2px',
  };
  return (
    <div style={style}>
      <Calendar fullscreen={false} onSelect={onSelect} />
    </div>
  );
};
export default MyCalenar;
