import React from 'react';
import { Statistic, Row, Col, Divider } from 'antd';
import { Pie } from '@ant-design/charts';
import ScreenBase from '../../component/ScreenBase';
import IntegerStep from '../../component/MySlider';
import WeekdayData from '../../api/Weekday';

const Weekday = () => {
  const Gridmain = () => {
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
          <Pie {...pieConfig(WeekdayData.pie, 'Week')} />
          <IntegerStep />
        </div>
      </div>
    );
  };
  return <ScreenBase title="Analysis" sub="Weekday" contents={Gridmain()} />;
};

export default Weekday;
