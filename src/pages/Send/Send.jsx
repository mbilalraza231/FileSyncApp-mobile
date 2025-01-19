// pages/Send/Send.jsx
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../../components/Button';
import CustomFilePicker from '../../components/CustomFilePicker';
import './Send.module.css';

const Send = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = (files) => {
    setSelectedFiles(files);
    setErrorMessage('');
  };

  const handleSendFiles = async () => {
    if (selectedFiles.length === 0) {
      setErrorMessage('Please select files to send.');
      return;
    }

    try {
      // Your file sending logic here
      console.log('Ready to send files:', selectedFiles);
    } catch (error) {
      console.error('Send error:', error);
      setErrorMessage('Error preparing files for sending. Please try again.');
    }
  };

  return (
    <div className="send-container">
      <h1>Send Files</h1>
      <div className="icon-container">
        <FaPaperPlane size={50} />
      </div>
      <CustomFilePicker onFileSelect={handleFileSelect} />
      <Button onClick={handleSendFiles} className="send-button">
        Send Files
      </Button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Send;
