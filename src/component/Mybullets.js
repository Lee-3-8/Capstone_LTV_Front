import React from 'react';
import { Progress } from '@ant-design/charts';

const Mybullets = ({ title, value }) => {
  // const formatter = v => {
  //   const config = {
  //     height: '10%',
  //     width: '80%',
  //     autoFit: false,
  //     percent: v,
  //     color: ['#5B8FF9', '#E8EDF3'],
  //   };
  //   return <Progress {...config} />;
  // };
  // return <Statistic title={title} value={value} formatter={formatter} />;
  const config = {
    percent: value,
    height: '100%',
    width: '100%',
    color: ['#5B8FF9', '#E8EDF3'],
  };
  return (
    <div>
      <span className="ant-statistic-title">{title}</span>
      <Progress {...config} />
    </div>
  );
};

export default Mybullets;
