import React from 'react';
import { Table, Tag } from 'antd';
import './Status.css';

const Status = () => {
  // Sample data for the requests
  const data = [
    {
      id: 1,
      requestType: 'Leave',
      status: 'Accepted',
      date: '2023-07-20',
    },
    {
      id: 2,
      requestType: 'Half-Day',
      status: 'Rejected',
      date: '2023-07-21',
    },
    {
      id: 3,
      requestType: 'Overtime',
      status: 'Pending',
      date: '2023-07-22',
    },
  ];

  // Columns for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Request Type',
      dataIndex: 'requestType',
      key: 'requestType',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Accepted' ? 'green' : status === 'Rejected' ? 'red' : 'blue'}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="status-container">
      <h2>Request Status</h2>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default Status;
