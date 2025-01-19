// pages/Send/Send.jsx
import React, { useState } from 'react';
import { Filesystem } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';
import { Directory } from '@capacitor/filesystem';
import { FaPaperPlane } from 'react-icons/fa';
import Button from '../../components/Button';
import './Send.module.css';

const Send = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileSelect = async () => {
    try {
      // First ensure we have permissions
      await Filesystem.requestPermissions();
      
      // Then try to pick files
      const result = await Filesystem.pickFiles({
        multiple: true,
        readData: true,
        directory: Directory.Documents
      });

      if (result && result.files && result.files.length > 0) {
        console.log('Files selected:', result.files);
        setSelectedFiles(result.files);
        setErrorMessage('');
      } else {
        console.log('No files selected');
        setErrorMessage('No files selected. Please try again.');
      }
    } catch (error) {
      console.error('Error in file selection:', error);
      
      if (error.message.includes('permission')) {
        setErrorMessage('Please grant storage permission to access files');
      } else {
        setErrorMessage('Error selecting files. Please try again.');
      }
    }
  };

  const handleSendFiles = async () => {
    if (selectedFiles.length === 0) {
      await handleFileSelect();
    } else {
      try {
        // Example: Read the first file
        if (selectedFiles[0].path) {
          const fileContents = await Filesystem.readFile({
            path: selectedFiles[0].path,
            directory: Directory.Documents
          });
          console.log('File contents:', fileContents);
        }
        
        // Your file sending logic here
        console.log('Ready to send files:', selectedFiles);
      } catch (error) {
        console.error('Send error:', error);
        setErrorMessage('Error preparing files for sending. Please try again.');
      }
    }
  };

  return (
    <div className="send-container">
      <h1>Send Files</h1>
      <div className="icon-container">
        <FaPaperPlane size={50} />
      </div>
      
      <Button 
        onClick={handleSendFiles} 
        className="send-button"
      >
        {selectedFiles.length === 0 ? 'Select Files' : 'Send Files'}
      </Button>

      {selectedFiles.length > 0 && (
        <div className="selected-files">
          <h3>Selected Files:</h3>
          <ul>
            {selectedFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
          <Button 
            onClick={() => {
              setSelectedFiles([]);
              setErrorMessage('');
            }}
            className="clear-button"
          >
            Clear Selection
          </Button>
        </div>
      )}
      
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Send;
