import React from 'react';
import { Button, Row, Tooltip, Badge, Avatar } from 'antd';
import {
  SearchOutlined,
  ContactsOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Myheader = () => {
  const style = { marginRight: '10px' };
  return (
    <Row
      style={{ width: '100%', height: '100%' }}
      justify="end"
      align="middle"
      gutter={[24, 40]}
    >
      {/* <Col span={[2, 2]}>
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
      </Col>
      <Col span={[2, 2]}>
        <Tooltip title="search">
          <Button type="primary" shape="circle" icon={<SearchOutlined />} />
        </Tooltip>
      </Col> */}
      <Tooltip title="search">
        <Button
          type="primary"
          shape="circle"
          icon={<SearchOutlined />}
          style={style}
        />
      </Tooltip>
      <Tooltip title="e-mail contact : leesinji8@gmail.com">
        <Button
          type="primary"
          shape="circle"
          icon={<ContactsOutlined />}
          style={style}
        />
      </Tooltip>
      <Badge dot>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </Row>
  );
};

export default Myheader;
