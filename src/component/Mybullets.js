import React from 'react';
import { Progress } from '@ant-design/charts';

const Mybullets = ({ title, value }) => {
  const config = {
    percent: value,
    height: '100%',
    width: '100%',
    color: ['#5B8FF9', '#E8EDF3'],
    tooltip: {
      customContent: data => data,
    },
  };
  return (
    <div>
      <span className="ant-statistic-title">{title}</span>
      <Progress {...config} />
    </div>
  );
};

export default Mybullets;
