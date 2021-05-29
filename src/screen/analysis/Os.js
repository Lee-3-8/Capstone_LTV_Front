import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Divider } from 'antd';
import { Column } from '@ant-design/charts';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';
import OsData from '../../api/Os';

const Os = () => {
  const [data, getData] = useState({
    data: [],
    loading: true,
  });
  const convertData = v => v;
  const fetchOs = async per => {
    let res = [];
    try {
      res = await axios.get('/ltv/api/device-os/analysis', {
        params: { percentile: per / 100 },
      });
    } catch (error) {
      console.log(error);
    }
    // console.log(OsData.column, res.data);
    getData({
      data: convertData(res.data),
      loading: false,
    });
  };

  useEffect(() => {
    fetchOs(100);
    return () => {};
  }, []);

  const Gridmain = () => {
    const ColumnConfig = v => ({
      data: data.data,
      height: 400,
      xField: 'device_os',
      yField: 'count',
      xAxis: { label: { autoRotate: false } },
      slider: {
        start: 0,
        end: 100,
      },
    });
    return (
      <div>
        <Divider orientation="left">Top</Divider>
        <div>
          <IntegerStep getData={fetchOs} />
          <Column {...ColumnConfig(data)} />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Os" contents={Gridmain()} />;
};

export default Os;
