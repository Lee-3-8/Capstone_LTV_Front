import React from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';
import MySider from './component/MySider';
import Myheader from './component/Myheader';
import Main from './screen/Main';
import { Device, Hour, Geo, Os, Weekday, Setting } from './screen/analysis';

const { Header, Footer } = Layout;
const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    <MySider />
    <Layout>
      <Header style={{ padding: 0, height: '46px', backgroundColor: 'white' }}>
        <Myheader />
      </Header>
      <Route path={['/', '/main']} exact component={Main} />
      <Route path="/device" component={Device} />
      <Route path="/hour" component={Hour} />
      <Route path="/geo" component={Geo} />
      <Route path="/os" component={Os} />
      <Route path="/weekday" component={Weekday} />
      <Route path="/setting" component={Setting} />
      <Footer style={{ textAlign: 'center' }}>
        Sejong Univ CE Capstone Project LTV Predict WEB
      </Footer>
    </Layout>
  </Layout>
);

export default App;
