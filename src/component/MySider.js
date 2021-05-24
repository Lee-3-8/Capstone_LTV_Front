import React,{useState} from 'react';
import { Layout, Menu, Breadcrumb} from 'antd';
import { DesktopOutlined, StarOutlined, StarFilled, StarTwoTone, FileOutlined} from '@ant-design/icons';
const {Sider} = Layout;
const { SubMenu } = Menu;
  
  const MySider = ()=>{
    const [collapsed, onCollapse] = useState(false);
    return (
      <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      // theme = {'dark'}
    >
      <div className="App-logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <StarOutlined />
          <span>Main</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={<span><StarFilled /><span>Analysis</span></span>}
        >
          <Menu.Item key="2">OS</Menu.Item>
          <Menu.Item key="3">Device</Menu.Item>
          <Menu.Item key="4">WeekDay</Menu.Item>
          <Menu.Item key="5">Geo</Menu.Item>
          <Menu.Item key="6">FirstPlay</Menu.Item>

        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><StarTwoTone /><span>Others</span></span>}
        >
          <Menu.Item key="7">Settings</Menu.Item>
          <Menu.Item key="8">Dev-Info</Menu.Item>
        </SubMenu>
        <Menu.Item key="9">
          <FileOutlined />
          <span>File</span>
        </Menu.Item>
      </Menu>
    </Sider>
    )
  }
  export default MySider;