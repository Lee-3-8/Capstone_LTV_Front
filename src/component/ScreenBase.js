import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const ScreenBase = ({ title, sub = false, contents = () => '' }) => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
      {sub && <Breadcrumb.Item>{sub}</Breadcrumb.Item>}
    </Breadcrumb>
    {contents}
  </Content>
);

export default ScreenBase;
