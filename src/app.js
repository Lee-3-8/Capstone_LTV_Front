import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import { DesktopOutlined, StarOutlined, StarFilled, StarTwoTone, FileOutlined} from '@ant-design/icons';
import MySider from './component/MySider'
import Main from './screen/Main';
import {Device,FirstPlay,Geo,Os,Weekday} from './screen/analysis';
import { Route } from 'react-router-dom';
const { Header, Footer } = Layout;
class App extends Component {
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <MySider/>
        <Layout>
          <Header style={{ background: '#fff', padding: 0,height: '56px'}} />
          <Route path={["/","/main"]} exact={true} component = {Main}/>
          <Route path="/device" component = {Device}/>
          <Route path="/firstPlay" component = {FirstPlay}/>
          <Route path="/geo" component = {Geo}/>
          <Route path="/os" component = {Os}/>
          <Route path="/weekday" component = {Weekday}/>
          <Footer style={{ textAlign: 'center' }}>
            Sejong Univ CE Capstone Project LTV Predict WEB 
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;