import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import { DesktopOutlined, StarOutlined, StarFilled, StarTwoTone, FileOutlined} from '@ant-design/icons';
import MySider from './component/MySider'
import Main from './screen/Main';
const { Header, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MySider/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Main/>
          <Footer style={{ textAlign: 'center' }}>
            Sejong Univ CS Capstone Project LTV Predict WEB 
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;