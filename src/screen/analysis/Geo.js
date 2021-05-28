import React from 'react';
import { Statistic, Row, Col, Divider } from 'antd';
import { Line } from '@ant-design/charts';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';
import GeoData from '../../api/Geo';

const Geo = () => {
  const Gridmain = () => {
    const lineConfig = {
      data: GeoData.line,
      height: 400,
      xField: 'week',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
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
          <Line {...lineConfig} />
          <IntegerStep />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Geo" contents={Gridmain()} />;
};

export default Geo;
