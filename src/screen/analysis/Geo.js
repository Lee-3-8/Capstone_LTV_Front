import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { Bar } from '@ant-design/charts';
import axios from 'axios';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';

const Geo = () => {
  const [data, getData] = useState({
    data: [],
    loading: true,
  });
  const fetchGeo = async per => {
    let res = [];
    try {
      res = await axios.get('/ltv/api/region/analysis', {
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
    fetchGeo(100);
    return () => {};
  }, []);
  const Gridmain = () => {
    const BarConfig = {
      data: data.data,
      xField: 'count',
      yField: 'region',
      // conversionTag: {},
      seriesField: 'count',
      legend: { position: 'bottom-left' },
    };
    return (
      <div>
        <Divider orientation="left">Top</Divider>
        <div>
          <IntegerStep getData={fetchGeo} />
          <Bar {...BarConfig} />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Geo" contents={Gridmain()} />;
};

export default Geo;
