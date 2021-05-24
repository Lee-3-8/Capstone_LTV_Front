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
    >
      <div className="App-logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <StarOutlined />
          <span>Main</span>
        </Menu.Item>
        <Menu.Item key="2">
          <DesktopOutlined />
          <span>Analysis</span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={<span><StarFilled /><span>User</span></span>}
        >
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={<span><StarTwoTone /><span>Team</span></span>}
        >
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
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