import React, { useState, useEffect } from 'react';
import { Divider } from 'antd';
import { Line } from '@ant-design/charts';
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
    const lineConfig = {
      data: data.data,
      height: 400,
      xField: 'region',
      yField: 'count',
      point: {
        size: 5,
        shape: 'diamond',
      },
    };
    return (
      <div>
        <Divider orientation="left">Overview</Divider>
        <div>
          <IntegerStep getData={fetchGeo}/>
          <Line {...lineConfig} />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Geo" contents={Gridmain()} />;
};

export default Geo;
