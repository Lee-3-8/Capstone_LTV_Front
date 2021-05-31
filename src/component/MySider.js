import React, { useState } from 'react';
import { Image, Layout, Menu } from 'antd';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
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
      <Image width={200} src="../logo.png" preview={false} />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <StarOutlined />
          <Link to="/main">Main</Link>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <StarFilled />
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
            <Link to="/Hour">Hour</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <StarTwoTone />
              <span>Others</span>
            </span>
          }
        >
          <Menu.Item key="7">Settings</Menu.Item>
          <Menu.Item key="8">Dev-Info</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};
export default MySider;
