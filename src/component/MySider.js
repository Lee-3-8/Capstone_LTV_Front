import React, { useState } from 'react';
import { Image, Layout, Menu } from 'antd';
import {
  HomeOutlined,
  SettingFilled,
  BarChartOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;
const { SubMenu } = Menu;

const MySider = () => {
  const [collapsed, onCollapse] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      // theme = {'dark'}
    >
      <Image
        width={200}
        src="https://user-images.githubusercontent.com/57481424/120642582-0b6e5380-c4b0-11eb-84e3-d67ac1ae36a3.png"
        preview={false}
      />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <HomeOutlined />
          <Link to="/main">Main</Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <BarChartOutlined />
              <span>Analysis</span>
            </span>
          }
        >
          <Menu.Item key="2">
            <Link to="/os">OS</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/device">Device</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/weekday">WeekDay</Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link to="/geo">Geo</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link to="/hour">Hour</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="7">
          <SettingFilled />
          <Link to="/setting">Settings</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
export default MySider;
