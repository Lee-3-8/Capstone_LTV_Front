import { Slider, InputNumber, Row, Col } from 'antd';
import React, { useState } from 'react';

const IntegerStep = () => {
  const [inputValue, onChange] = useState(1);
  const marks = {
    0: '',
    10: '10%',
    25: '25%',
    80: '80%',
    100: '',
  };
  return (
    <div style={{ marginBottom: '4%' }}>
      <Row gutter={24} justify="center">
        <Col span={18}>
          <Slider
            min={0}
            max={100}
            marks={marks}
            defaultValue={25}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={3}>
          <InputNumber
            min={0}
            max={100}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
    </div>
  );
};

export default IntegerStep;
