// Sidebar.js
import React from 'react';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  BarChartOutlined,
  MessageOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Zaptric</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          { label: 'Dashboard', key: '1', icon: <DashboardOutlined /> },
          { label: 'Messages', key: '4', icon: <MessageOutlined /> },
          { label: 'Settings', key: '5', icon: <SettingOutlined /> },
          { label: 'Help Centre', key: '6', icon: <QuestionCircleOutlined /> },
        ]}
      />

      {/* Logout Button */}
      <div className="logout">
        <Menu theme="dark" mode="inline">
          <Menu.Item key="logout" icon={<LogoutOutlined size={40} />}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default Sidebar;
