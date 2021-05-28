import React, { useState } from 'react';
import { Popover, Button } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import MyCalenar from './MyCalender';

const MyPopover = ({ value, setValue }) => {
  const [visible, setVisible] = useState(false);
  return (
    <Popover
      content={<MyCalenar setDate={setValue} />}
      title="Title"
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
    >
      <Button
        style={{
          fontSize: '20px',
        }}
        type="text"
        icon={<CalendarOutlined />}
      >
        {value}
      </Button>
    </Popover>
  );
};
export default MyPopover;
