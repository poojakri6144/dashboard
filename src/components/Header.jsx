// Header.js
import React from 'react';
import { Breadcrumb, Button, Input, Avatar, Badge, Space } from 'antd';
import { BellOutlined, MailOutlined, UserOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <Breadcrumb className="breadcrumb">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      <div className="header-content">
        <h1 className="header-title">Dashboard</h1>
        
        <div className="header-actions">
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined />}
            style={{ width: 200 }}
            className="search-input"
          />
          
          <Space size="middle" className="header-icons">
            <Badge count={1} offset={[0, 0]}>
              <BellOutlined style={{ fontSize: 20 }} />
            </Badge>
            <Badge count={0}>
              <MailOutlined style={{ fontSize: 20 }} />
            </Badge>
            <Avatar icon={<UserOutlined />} src="https://i.pravatar.cc/100" />
            <span className="username">User</span>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Header;
