import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { Bar } from '@ant-design/charts';
import axios from 'axios';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';

const Device = () => {
  const [data, getData] = useState({
    data: [],
    loading: true,
  });
  const fetchDevice = async per => {
    let res = [];
    try {
      res = await axios.get('/ltv/api/device-name/analysis', {
        params: { percentile: per / 100 },
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(res.data);
    getData({
      data: res.data,
      loading: false,
    });
  };

  useEffect(() => {
    fetchDevice(100);
    return () => {};
  }, []);

  const Gridmain = () => {
    const BarConfig = {
      data: data.data,
      xField: 'count',
      yField: 'device_name',
      seriesField: 'count',
      legend: { position: 'bottom-left' },
    };
    return (
      <div>
        <Divider orientation="left">Top</Divider>
        <div>
          <IntegerStep getData={fetchDevice} />
          <Bar {...BarConfig} />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Device" contents={Gridmain()} />;
};

export default Device;
