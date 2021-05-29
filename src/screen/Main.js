import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { Column, Pie } from '@ant-design/charts';
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
      value: data[key].toFixed(2) * 1,
    }));
    console.log(result);
    return result;
  };

  const fetchMain = async per => {
    const res = await axios.get('ltv/api/prediction', {
      params: { from: start, to: end, percentile: per / 100 },
    });
    // const res = mainData.line;
    // alert(`fetch main ${start} ${end} ${per}`);
    setTotal(res.total.toFixed(2));
    setUser(res.user.toFixed(2));
    setAvg(res.avg.toFixed(2));
    getData({
      data: convertData(res.data),
      loading: false,
    });
  };
  useEffect(() => {
    fetchMain(100);
    return () => {};
  }, []);
  const Gridmain = () => {
    const ColumnConfig = v => ({
      data: v,
      height: 400,
      xField: 'week',
      yField: 'value',
      xAxis: { label: { autoRotate: false } },
      slider: {
        start: 0,
        end: 100,
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
            <Row justify="space-around" align="middle" gutter={24}>
              <Col>
                <Mystatistic
                  title="Predicted income"
                  value={total}
                  suffix="$"
                />
              </Col>
              <Col>
                <Mystatistic title="Number of Users" value={user} />
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
          <Column {...ColumnConfig(data.data)} />
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
