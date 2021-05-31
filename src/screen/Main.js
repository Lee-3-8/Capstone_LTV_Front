import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { Bar, Area, Pie } from '@ant-design/charts';
import axios from 'axios';
import ScreenBase from '../component/ScreenBase';
import IntegerStep from '../component/MySlider';
import mainData from '../api/main';
import Mystatistic from '../component/Mystatistic';
import MyDate from '../component/MyDate';

const Main = () => {
  const [start, setStart] = useState('2021-03-01');
  const [end, setEnd] = useState('2021-05-18');
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(0);
  const [avg, setAvg] = useState(0);
  const [data, getData] = useState({
    data: [],
    loading: true,
  });

  const convertData = data => {
    const result = Object.keys(data).map(key => ({
      week: key,
      '$(USD)': data[key].toFixed(2) * 1,
    }));
    console.log(result);
    return result;
  };

  const fetchMain = async per => {
    let res = [];
    try {
      res = await axios.get('/ltv/api/prediction', {
        params: { from: start, to: end, percentile: per / 100 },
      });
    } catch (error) {
      console.log(error);
    }
    setTotal(res.data.total.toFixed(3));
    setUser(res.data.user);
    setAvg(res.data.avg.toFixed(3));
    getData({
      data: convertData(res.data.data),
      loading: false,
    });
  };
  useEffect(() => {
    fetchMain(100);
    return () => {};
  }, data);
  const Gridmain = () => {
    const AreaConfig = v => ({
      data: v,
      height: 400,
      xField: 'week',
      yField: '$(USD)',
      // color: '#fa43a7',
      meta: {
        '$(USD)': { max: 150, min: 120 },
      },
    });
    const BarConfig = v => ({
      data: v,
      height: 400,
      xField: 'week',
      yField: 'value',
      // color: '#fa43a7',
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
    });
    const pieConfig = (v, title) => ({
      appendPadding: 10,
      data: v,
      angleField: 'value',
      colorField: 'type',
      radius: 1,
      innerRadius: 0.64,
      meta: {
        value: {
          // eslint-disable-next-Area consistent-return
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
            <Row justify="space-around" align="middle" gutter={24}>
              <Col>
                <Mystatistic
                  title="Predicted income"
                  value={total}
                  suffix="$"
                />
              </Col>
              <Col>
                <Mystatistic
                  title="Number of Users"
                  value={user}
                  decimals={0}
                />
              </Col>
              <Col>
                <Mystatistic title="User AVG income" value={avg} suffix="$" />
              </Col>
              <Col>
                <MyDate
                  start={start}
                  setStart={setStart}
                  end={end}
                  setEnd={setEnd}
                />
              </Col>
            </Row>
          </div>
          <Divider orientation="left">Top</Divider>
          <IntegerStep getData={fetchMain} />
          <Row justify="space-around" align="middle" gutter={24}>
            <Col span={18}>
              <Area {...AreaConfig(data.data)} />
            </Col>
            <Col span={6}>
              <Divider orientation="left">Percent</Divider>
              <Bar {...BarConfig(data.data)} />
            </Col>
          </Row>
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
