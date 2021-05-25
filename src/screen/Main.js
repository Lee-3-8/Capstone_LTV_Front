import React from 'react';
import { Row, Col,Divider } from 'antd';
import ScreenBase from '../component/ScreenBase';
import IntegerStep from '../component/MySlider';

const Main = () => {
  const Gridmain = () => {
    const style = { background: '#0092ff', padding: '8px 0' };
    return (
    <div>
      <Divider orientation="left">Responsive</Divider>
      <Row justify="space-around" gutter={{ xs: 8, sm: 16, md: 40, lg: 64 }}>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col className="gutter-row" span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
      <IntegerStep/>
    </div>
    )
  }
  return (
    <ScreenBase title = "Main" contents = {Gridmain()}/>
  )
};

export default Main;