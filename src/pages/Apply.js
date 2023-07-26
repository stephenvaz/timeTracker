import React, { useState } from 'react';
import { Button, DatePicker, Input, Radio, Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './Apply.css';

const { Dragger } = Upload;

const Apply = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [emailLink, setEmailLink] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleEmailChange = (e) => {
    setEmailLink(e.target.value);
  };

  const handleSubmit = () => {
    // Perform your form submission logic here
    if (selectedOption && selectedDate && emailLink) {
      // Example: You can send the form data to the server or perform any other action
      console.log('Selected Option:', selectedOption);
      console.log('Selected Date:', selectedDate.format('YYYY-MM-DD'));
      console.log('Email Link:', emailLink);

      // Show success message
      message.success('Form submitted successfully!');
    } else {
      // Show error message if any field is missing
      message.error('Please fill in all the required fields.');
    }
  };

  return (
    <div className="apply-page">
      <h2>Apply</h2>
      <Radio.Group onChange={handleOptionChange} value={selectedOption}>
        <Radio value="leave">Apply for Leave</Radio>
        <Radio value="overtime">Apply for Overtime</Radio>
        <Radio value="half-day">Apply for Half-Day</Radio>
      </Radio.Group>

      {selectedOption && (
        <>
          <DatePicker
            value={selectedDate}
            onChange={handleDateChange}
            style={{ marginTop: '10px' }}
          />

          <Input
            value={emailLink}
            onChange={handleEmailChange}
            placeholder="Enter Email Link"
            style={{ marginTop: '10px' }}
          />

          <Dragger
            name="attachment"
            multiple={false}
            action="/upload"
            onChange={(info) => {
              const { status } = info.file;
              if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
              }
            }}
            style={{ marginTop: '10px' }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single upload.</p>
          </Dragger>

          <Button type="primary" onClick={handleSubmit} style={{ marginTop: '10px' }}>
            Submit
          </Button>
        </>
      )}
    </div>
  );
};

export default Apply;
