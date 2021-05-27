import React from 'react';
import { Layout, Breadcrumb } from 'antd';

const { Content } = Layout;

const ScreenBase = ({ title, sub = false, contents = () => '' }) => (
  <Content style={{ margin: '0 16px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{title}</Breadcrumb.Item>
      {sub && <Breadcrumb.Item>{sub}</Breadcrumb.Item>}
    </Breadcrumb>
    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
      {contents}
      This page is {title}
      {sub && `-${sub}`}
    </div>
  </Content>
);

export default ScreenBase;
