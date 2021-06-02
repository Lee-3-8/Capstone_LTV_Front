import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card } from 'antd';
import { Column } from '@ant-design/charts';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';

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
      seriesField: 'device_os',
      slider: {
        start: 0,
        end: 100,
      },
    });
    return (
      <Card title="Top">
        <div>
          <IntegerStep getData={fetchOs} />
          <Column {...ColumnConfig(data)} />
        </div>
      </Card>
    );
  };
  return <ScreenBase title="Analysis" sub="Os" contents={Gridmain()} />;
};

export default Os;
