import React from 'react';
import { Card } from 'antd';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';

const Setting = () => {
  const Gridmain = () => {
    const a = 1;
    return (
      <Card title="Settings">
        <div>settings</div>
      </Card>
    );
  };
  return <ScreenBase title="Settings" sub="Setting" contents={Gridmain()} />;
};

export default Setting;
