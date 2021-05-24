import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import { DesktopOutlined, StarOutlined, StarFilled, StarTwoTone, FileOutlined} from '@ant-design/icons';
import MySider from './component/MySider'
const { Header, Content, Sider, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MySider/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Sejong Univ CS Capstone Project LTV Predict WEB 
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;