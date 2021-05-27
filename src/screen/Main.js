import React from 'react';
import { Statistic, Row, Col, Divider } from 'antd';
import { Line, Pie } from '@ant-design/charts';
import ScreenBase from '../component/ScreenBase';
import IntegerStep from '../component/MySlider';

const mockUpData = {
  line: [
    { week: 'week1', value: 3 },
    { week: 'week2', value: 4 },
    { week: 'week3', value: 3.5 },
    { week: 'week4', value: 5 },
    { week: 'week5', value: 4.9 },
    { week: 'week6', value: 6 },
    { week: 'week7', value: 7 },
    { week: 'week8', value: 9 },
    { week: 'week9', value: 13 },
  ],
  pie1: [
    {
      type: 'Day0',
      value: 27,
    },
    {
      type: 'Day1',
      value: 25,
    },
    {
      type: 'Day2',
      value: 18,
    },
    {
      type: 'Day3~6',
      value: 15,
    },
    {
      type: 'Day7',
      value: 15,
    },
  ],
  pie2: [
    {
      type: 'is',
      value: 27,
    },
    {
      type: 'ba',
      value: 35,
    },
    {
      type: 'rv',
      value: 38,
    },
  ],
};

const Main = () => {
  const Gridmain = () => {
    const lineConfig = {
      data: mockUpData.line,
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
          <IntegerStep />
          <Line {...lineConfig} />
          <Divider style={{ margin: '4% 0 4% 0' }} orientation="left">
            Options
          </Divider>
          <div>
            <Row gutter={24}>
              <Col span={12}>
                <Pie {...pieConfig(mockUpData.pie1, 'DAY')} />
              </Col>
              <Col span={12}>
                <Pie {...pieConfig(mockUpData.pie2, 'AD')} />
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
