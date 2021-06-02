import React from 'react';
import { Statistic } from 'antd';
import { Progress } from '@ant-design/charts';

const Mybullets = ({ title, value }) => {
  const formatter = v => {
    const config = {
      height: 50,
      width: 300,
      autoFit: false,
      percent: v,
      color: ['#5B8FF9', '#E8EDF3'],
    };
    return <Progress {...config} />;
  };
  return <Statistic title={title} value={value} formatter={formatter} />;
};

export default Mybullets;
