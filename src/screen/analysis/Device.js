import React from 'react';
import { Statistic, Row, Col, Divider } from 'antd';
import { Bar } from '@ant-design/charts';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';
import deviceData from '../../api/Device';

const Device = () => {
  const Gridmain = () => {
    const BarConfig = {
      data: deviceData.bar,
      xField: 'count',
      yField: 'device',
      seriesField: 'count',
      legend: { position: 'top-left' },
    };
    return (
      <div>
        <Divider orientation="left">Overview</Divider>
        <div>
          <div style={{ margin: '4% 10% 4% 10%' }}>
            <Row justify="space-around" gutter={24}>
              <Col span={4}>
                <Statistic title="Predicted income" value={`${152.94}$`} />
              </Col>
              <Col span={4}>
                <Statistic title="Number of Users" value={453} />
              </Col>
              <Col span={4}>
                <Statistic title="User AVG income" value={45123} />
              </Col>
              <Col span={4}>
                <Statistic title="From" value="2021-02-19" />
              </Col>
              <Col span={4}>
                <Statistic title="To" value="2021-04-31" />
              </Col>
            </Row>
          </div>
          <Bar {...BarConfig} />
          <IntegerStep />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Device" contents={Gridmain()} />;
};

export default Device;
