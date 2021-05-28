import React from 'react';
import { Divider } from 'antd';
import { Column } from '@ant-design/charts';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';
import Mystatistic from '../../component/Mystatistic';
import OsData from '../../api/Os';

const Os = () => {
  const Gridmain = () => {
    const columnConfig = {
      data: OsData.column,
      xField: 'os',
      yField: 'count',
      label: {
        position: 'middle',
        style: {
          fill: '#FFFFFF',
          opacity: 0.6,
        },
      },
      meta: {
        os: { alias: '类别' },
        count: { alias: '销售额' },
      },
    };
    return (
      <div>
        <Divider orientation="left">Overview</Divider>
        <div>
          <Mystatistic value={34235} prefix="Amount" />
          <Column {...columnConfig} />
          <IntegerStep />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Os" contents={Gridmain()} />;
};

export default Os;
