import React from 'react';
import { Row, Col } from 'antd';
import MyPopover from './MyPopover';

const MyDate = ({ start, setStart, end, setEnd }) => (
  <Row>
    <Col>
      <MyPopover value={start} setValue={setStart} />
    </Col>
    <Col>
      <div style={{ margin: '0 10px 0 10px', fontSize: '24px' }}>-</div>
    </Col>
    <Col>
      <MyPopover value={end} setValue={setEnd} />
    </Col>
  </Row>
);
export default MyDate;
