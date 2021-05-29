import React from 'react';
import { Statistic } from 'antd';
import CountUp from 'react-countup';

const Mystatistic = ({ title, value, suffix = '', decimals = 2 }) => {
  const formatter = v => (
    <CountUp
      style={{
        fontSize: '24px',
      }}
      start={0}
      end={v}
      decimals={decimals}
      duration={2}
      separator=","
      suffix={suffix}
    />
  );
  return <Statistic title={title} value={value} formatter={formatter} />;
};

export default Mystatistic;
