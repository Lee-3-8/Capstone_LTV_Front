import React, { useState, useEffect } from 'react';
import { Row, Col, Divider, Card } from 'antd';
import { Area, Pie } from '@ant-design/charts';
import axios from 'axios';
import ScreenBase from '../component/ScreenBase';
import IntegerStep from '../component/MySlider';
import mainData from '../api/main';
import Mystatistic from '../component/Mystatistic';
import MyDate from '../component/MyDate';
import Mybullets from '../component/Mybullets';

const Main = () => {
  const [start, setStart] = useState('2021-02-18');
  const [end, setEnd] = useState('2021-05-11');
  const [total, setTotal] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [user, setUser] = useState(0);
  const [avg, setAvg] = useState(0);
  const [ratio, setRatio] = useState([]);
  const [data, getData] = useState({
    data: [],
    loading: true,
  });

  const convertData = data => {
    const result = Object.keys(data).map(key => ({
      week: key,
      '$(USD)': data[key].toFixed(2) * 1,
    }));
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
    setMin(res.data.min.toFixed() * 1);
    setMax(res.data.max.toFixed() * 1);
    getData({
      data: convertData(res.data.data),
      loading: false,
    });
    console.log(data.data.sort());
    setRatio(
      Object.keys(res.data.ads_ratio).map(key => ({
        type: key,
        value: (res.data.ads_ratio[key] / res.data.total).toFixed(2) * 1,
      })),
    );
  };
  useEffect(() => {
    fetchMain(100);
    return () => {};
  }, []);
  const Gridmain = () => {
    const AreaConfig = v => ({
      data: v.sort((a, b) => Number(a.week.slice(4)) - Number(b.week.slice(4))),
      height: 400,
      xField: 'week',
      yField: '$(USD)',
      // color: '#fa43a7',
      meta: {
        '$(USD)': { max, min },
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
            return `${v.type}\n${`${(100 * v.value).toFixed()}%`}`;
          },
        },
      },
    });
    return (
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Overview">
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
            <Divider orientation="left">Top</Divider>
            <IntegerStep getData={fetchMain} />
            <Row justify="center" align="bottom" gutter={[16, 16]}>
              <Col span={18}>
                <Area {...AreaConfig(data.data.slice())} />
              </Col>
              <Col span={4}>
                <Divider orientation="left">Percent</Divider>
                <Row>
                  {data.data.slice(0, 9).map(value => (
                    <Col span={24}>
                      <Mybullets
                        title={value.week}
                        value={value['$(USD)'] / total}
                      />
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Options">
            <Row gutter={24}>
              <Col span={12}>
                <Pie {...pieConfig(mainData.pie1, 'DAY')} />
              </Col>
              <Col span={12}>
                <Pie {...pieConfig(ratio, 'AD')} />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  };
  return <ScreenBase title="Main" contents={Gridmain()} />;
};

export default Main;
