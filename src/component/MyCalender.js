import React from 'react';
import { Calendar } from 'antd';

const MyCalenar = ({ setDate }) => {
  const getDate = v => setDate(v.format('YYYY-MM-DD'));
  const style = {
    width: '300px',
    border: '1px solid #f0f0f0',
    borderRadius: '2px',
  };
  return (
    <div style={style}>
      <Calendar onPanelChange={getDate} fullscreen={false} onSelect={getDate} />
    </div>
  );
};
export default MyCalenar;
