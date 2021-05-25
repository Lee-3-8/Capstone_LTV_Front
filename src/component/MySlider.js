import { Slider, InputNumber, Row, Col } from 'antd';
import React,{useState} from 'react';

const IntegerStep = () => {
  const [inputValue, onChange] = useState(1)
  const marks = {
    0: '',
    10: '10%',
    25: '25%',
    80: '80%',
    100: '',
  };
  return (
      <Row justify="center">
        <Col span={14}>
          <Slider
            min={0}
            max={100}
            marks = {marks}
            defaultValue = {25}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={0}
            max={100}
            style={{ margin: '0 16px' }}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>
  );
}

export default IntegerStep