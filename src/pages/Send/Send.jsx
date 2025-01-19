// pages/Send/Send.jsx
import React, { useState } from 'react';
import FileSearch from '../../components/FileSearch';
import Button from '../../components/Button';
import { initializeConnection, sendFilesOverWiFi, createOffer, handleOffer } from '../../services/wifiService'; // Import the Wi-Fi service
import { FaPaperPlane } from 'react-icons/fa'; // Import an icon for sending files
import './Send.module.css'; // Import the CSS file for styling

const Send = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize WebRTC connection when the component mounts
  React.useEffect(() => {
    initializeConnection((fileData) => {
      // Handle the received file data (e.g., save it or display it)
      console.log('File received:', fileData);
    });
  }, []);

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setErrorMessage(''); // Clear any previous error messages
  };

  const handleSendFiles = async () => {
    if (selectedFiles.length > 0) {
      try {
        await sendFilesOverWiFi(selectedFiles);
      } catch (error) {
        setErrorMessage('Error sending files. Please try again.');
      }
    } else {
      setErrorMessage('Please select files to send.');
    }
  };

  const handleCreateOffer = async () => {
    await createOffer();
    // Implement your signaling to send the offer to the remote peer
  };

  const handleReceiveOffer = async (offer) => {
    await handleOffer(offer);
    // Implement your signaling to send the answer back to the remote peer
  };

  return (
    <div className="send-container">
      <h1>Send Files</h1>
      <div className="icon-container">
        <FaPaperPlane size={50} />
      </div>
      <FileSearch onFileSelect={handleFileSelect} />
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <Button onClick={handleSendFiles} className="send-button">
        Send Files
      </Button>
      <Button onClick={handleCreateOffer}>
        Create Offer
      </Button>
      {/* Add a way to receive offers, e.g., through an input or alert */}
    </div>
  );
};

export default Send;
