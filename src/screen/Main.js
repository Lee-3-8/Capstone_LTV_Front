import React from 'react';
import { Statistic, Row, Col, Divider } from 'antd';
import { Line, Pie } from '@ant-design/charts';
import ScreenBase from '../component/ScreenBase';
import IntegerStep from '../component/MySlider';
import mainData from '../api/main';
import Mystatistic from '../component/Mystatistic';

const Main = () => {
  const Gridmain = () => {
    const lineConfig = {
      data: mainData.line,
      height: 400,
      xField: 'week',
      yField: 'value',
      point: {
        size: 5,
        shape: 'diamond',
      },
    };
    const pieConfig = (data, title) => ({
      appendPadding: 10,
      data,
      angleField: 'value',
      colorField: 'type',
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
            if (v === undefined) {
              return title;
            }

            return `${v.type}\n${`${v.value}%`}`;
          },
        },
      },
    });
    return (
      <div>
        <Divider orientation="left">Overview</Divider>
        <div>
          <div style={{ margin: '4% 10% 4% 10%' }}>
            <Row justify="space-around" gutter={24}>
              <Col span={6}>
                <Mystatistic
                  title="Predicted income"
                  value={99912399}
                  suffix="$"
                />
              </Col>
              <Col span={6}>
                <Mystatistic title="Number of Users" value={453} />
              </Col>
              <Col span={6}>
                <Mystatistic title="User AVG income" value={45123} suffix="$" />
              </Col>
            </Row>
          </div>
          <Line {...lineConfig} />
          <IntegerStep />
          <Divider style={{ margin: '4% 0 4% 0' }} orientation="left">
            Options
          </Divider>
          <div>
            <Row gutter={24}>
              <Col span={12}>
                <Pie {...pieConfig(mainData.pie1, 'DAY')} />
              </Col>
              <Col span={12}>
                <Pie {...pieConfig(mainData.pie2, 'AD')} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  };
  return <ScreenBase title="Main" contents={Gridmain()} />;
};

export default Main;
