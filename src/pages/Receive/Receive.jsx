// pages/Receive/Receive.jsx
import React, { useState } from 'react';
import { initializeConnection, handleOffer } from '../../services/wifiService'; // Import the Wi-Fi service
import Button from '../../components/Button';
import { FaDownload } from 'react-icons/fa'; // Import an icon from react-icons
import './Receive.module.css'; // Import the CSS file for styling

const Receive = () => {
  const [offer, setOffer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize WebRTC connection when the component mounts
  React.useEffect(() => {
    initializeConnection((fileData) => {
      // Handle the received file data (e.g., save it or display it)
      console.log('File received:', fileData);
    });
  }, []);

  const handleReceiveOffer = async () => {
    try {
      await handleOffer(offer);
      console.log('Offer handled successfully');
    } catch (error) {
      setErrorMessage('Error handling offer. Please try again.');
    }
  };

  return (
    <div className="receive-container">
      <h1>Receive File</h1>
      <div className="icon-container">
        <FaDownload size={50} />
      </div>
      <input
        type="text"
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        placeholder="Enter offer here"
        className="offer-input"
      />
      <Button onClick={handleReceiveOffer} className="receive-button">
        Receive File
      </Button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default Receive;
