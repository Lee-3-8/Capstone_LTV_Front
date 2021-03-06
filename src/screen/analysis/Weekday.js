import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { Pie } from '@ant-design/charts';
import axios from 'axios';
import { ScreenBase, IntegerStep } from '../../component';

const Weekday = () => {
  const [data, getData] = useState({
    data: [],
    loading: true,
  });
  const fetchWeekday = async per => {
    let res = [];
    try {
      res = await axios.get('/ltv/api/weekday/analysis', {
        params: { percentile: per / 100 },
      });
    } catch (error) {
      console.log(error);
    }
    console.log(res.data);
    getData({
      data: res.data,
      loading: false,
    });
  };

  useEffect(() => {
    fetchWeekday(100);
    return () => {};
  }, []);

  const Gridmain = () => {
    const pieConfig = (data, title) => ({
      appendPadding: 10,
      data,
      angleField: 'count',
      colorField: 'weekday',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          // eslint-disable-next-line consistent-return
          formatter: v => {
            if (v[0] !== 'D') return ''.concat(v, '%');
          },
        },
      },
      label: {
        type: 'inner',
        offset: '-50%',
        style: { textAlign: 'center' },
        autoRotate: false,
        content: '{value}',
      },
      interactions: [
        { type: 'element-selected' },
        { type: 'element-active' },
        { type: 'pie-statistic-active' },
      ],
      statistic: {
        title: false,
        content: {
          style: {
            whiteSpace: 'pre-wrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          formatter: function formatter(v) {
            console.log(data,v)
            if (v === undefined) {
              return title;
            }

            return `${v.weekday}\n${`${v.percentile}%`}`;
          },
        },
      },
    });
    return (
      <Card title="Top">
        <div>
          <IntegerStep />
          <Pie {...pieConfig(data.data, 'DAY')} />
        </div>
      </Card>
    );
  };
  return <ScreenBase title="Analysis" sub="Weekday" contents={Gridmain()} />;
};

export default Weekday;
