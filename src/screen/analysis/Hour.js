import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import { Line } from '@ant-design/charts';
import axios from 'axios';
import { ScreenBase, IntegerStep } from '../../component';

const Hour = () => {
  const [data, getData] = useState({
    data: [],
    loading: true,
  });
  const fetchHour = async per => {
    let res = [];
    try {
      res = await axios.get('/ltv/api/time/analysis', {
        params: { percentile: per / 100 },
      });
    } catch (error) {
      console.log(error);
    }
    getData({
      data: res.data,
      loading: false,
    });
  };

  useEffect(() => {
    fetchHour(100);
    return () => {};
  }, []);
  const Gridmain = () => {
    const lineConfig = {
      data: data.data,
      xField: 'hour',
      yField: 'count',
      label: {},
      point: {
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#5B8FF9',
          lineWidth: 2,
        },
      },
      tooltip: { showMarkers: false },
      state: {
        active: {
          style: {
            shadowColor: 'yellow',
            shadowBlur: 4,
            stroke: 'transparent',
            fill: 'red',
          },
        },
      },
      theme: {
        geometries: {
          point: {
            diamond: {
              active: {
                style: {
                  shadowColor: '#FCEBB9',
                  shadowBlur: 2,
                  stroke: '#F6BD16',
                },
              },
            },
          },
        },
      },
      interactions: [{ type: 'marker-active' }],
    };
    return (
      <Card title="Top">
        <div>
          <IntegerStep getData={fetchHour} />
          <Line {...lineConfig} />
        </div>
      </Card>
    );
  };
  return <ScreenBase title="Analysis" sub="Hour" contents={Gridmain()} />;
};

export default Hour;
