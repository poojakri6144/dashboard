// App.js
import React, { useState } from 'react';
import { Modal, Button, Input, Select, DatePicker, Table, Space } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import moment from 'moment';
import './App.css';

const { Option } = Select;

function App() {
  const [drivers, setDrivers] = useState([
    { id: 1, name: 'Alyvia Kelley', status: 'Approved', email: 'a.kelley@gmail.com', dob: '1978-06-18' },
    { id: 2, name: 'Jaiden Nixon', status: 'Approved', email: 'jaiden.n@gmail.com', dob: '1963-09-30' },
    { id: 3, name: 'Ace Foley', status: 'Rejected', email: 'ace.fo@yahoo.com', dob: '1985-12-09' },
    { id: 4, name: 'abc xyz', status: 'Blocked', email: 'ace.fo@yahoo.com', dob: '1985-12-09' },

  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteConfirmVisible, setIsDeleteConfirmVisible] = useState(false);
  const [currentDriver, setCurrentDriver] = useState(null);
  const [deletingDriverId, setDeletingDriverId] = useState(null);

  const showModal = (driver = null) => {
    setCurrentDriver(driver ? { ...driver } : { id: null, name: '', status: 'Approved', email: '', dob: null });
    setIsModalOpen(true);
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    setCurrentDriver(null);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setCurrentDriver(null);
  };

  const handleSaveDriver = () => {
    if (currentDriver.id) {
      // Edit driver
      setDrivers(drivers.map(driver => driver.id === currentDriver.id ? currentDriver : driver));
    } else {
      // Add new driver
      const newDriver = { ...currentDriver, id: drivers.length + 1 };
      setDrivers([...drivers, newDriver]);
    }
    handleModalOk();
  };

  const handleDelete = () => {
    setDrivers(drivers.filter(driver => driver.id !== deletingDriverId));
    setIsDeleteConfirmVisible(false);
    setDeletingDriverId(null);
  };


  const columns = [
    { title: '#', dataIndex: 'id', key: 'id' },
    { title: 'Full Name', dataIndex: 'name', key: 'name' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Date of Birth', dataIndex: 'dob', key: 'dob' },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => showModal(record)}>
            Edit
          </Button>
          <Button
            icon={<CheckOutlined />}
            type="primary"
            onClick={() =>
              setDrivers(drivers.map(driver =>
                driver.id === record.id ? { ...driver, status: 'Approved' } : driver
              ))
            }
            disabled={record.status === 'Approved'}
          >
            Approve
          </Button>
          <Button
            icon={<CloseOutlined />}
            type="danger"
            onClick={() =>
              setDrivers(drivers.map(driver =>
                driver.id === record.id ? { ...driver, status: 'Rejected' } : driver
              ))
            }
            disabled={record.status === 'Rejected'}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];
  
  return (
    <div className="app">
      <Sidebar />
      <div className="content">
        <Header />
        <div className="dashboard">
          <Button type="primary" onClick={() => showModal()}>+ New Driver</Button>
          <Table columns={columns} dataSource={drivers} rowKey="id" style={{ marginTop: 20 }} />

          {/* Add/Edit Modal */}
          <Modal
            title={currentDriver && currentDriver.id ? "Edit Driver" : "New Driver"}
            visible={isModalOpen}
            onOk={handleSaveDriver}
            onCancel={handleModalCancel}
            okText={currentDriver ? "Save" : "Add"}
          >
            <Input
              placeholder="Full Name"
              value={currentDriver ? currentDriver.name : ''}
              onChange={(e) => setCurrentDriver({ ...currentDriver, name: e.target.value })}
              style={{ marginBottom: 10 }}
            />
            <Select
              value={currentDriver ? currentDriver.status : 'Approved'}
              onChange={(value) => setCurrentDriver({ ...currentDriver, status: value })}
              style={{ width: '100%', marginBottom: 10 }}
            >
              <Option value="Approved">Approved</Option>
              <Option value="Blocked">Blocked</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
            <Input
              placeholder="Email"
              value={currentDriver ? currentDriver.email : ''}
              onChange={(e) => setCurrentDriver({ ...currentDriver, email: e.target.value })}
              style={{ marginBottom: 10 }}
            />
            <DatePicker
              style={{ width: '100%' }}
              value={currentDriver && currentDriver.dob ? moment(currentDriver.dob, 'YYYY-MM-DD') : null}
              onChange={(date, dateString) => setCurrentDriver({ ...currentDriver, dob: dateString })}
            />
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            title="Confirm Delete"
            visible={isDeleteConfirmVisible}
            onOk={handleDelete}
            onCancel={() => setIsDeleteConfirmVisible(false)}
            okText="Delete"
            okButtonProps={{ danger: true }}
            cancelText="Cancel"
          >
            <p>Are you sure you want to delete this driver?</p>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default App;
