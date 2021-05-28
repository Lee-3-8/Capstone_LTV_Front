import { Slider, InputNumber, Row, Col } from 'antd';
import React, { useState } from 'react';

const IntegerStep = () => {
  const [inputValue, onChange] = useState(25);
  const marks = {
    0: {
      style: {
        color: '#f50',
      },
      label: <strong>0%</strong>,
    },
    10: {
      style: {
        color: '#f50',
      },
      label: <strong>10%</strong>,
    },
    25: {
      style: {
        color: '#f50',
      },
      label: <strong>25%</strong>,
    },
    75: {
      style: {
        color: '#f50',
      },
      label: <strong>75%</strong>,
    },
  };
  return (
    <div style={{ marginBottom: '4%', marginTop: '4%' }}>
      <Row gutter={24} justify="center">
        <Col span={18}>
          <Slider
            min={0}
            max={100}
            marks={marks}
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
