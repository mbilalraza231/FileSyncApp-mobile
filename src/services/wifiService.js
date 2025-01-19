// services/wifiService.js

let localConnection;
let sendChannel;

// Function to initialize WebRTC connection
export const initializeConnection = (onReceiveFile) => {
  localConnection = new RTCPeerConnection();

  // Create a data channel for file transfer
  sendChannel = localConnection.createDataChannel('sendChannel');
  
  sendChannel.onopen = () => {
    console.log('Data channel is open');
  };

  sendChannel.onclose = () => {
    console.log('Data channel is closed');
  };

  // Handle incoming messages
  localConnection.ondatachannel = (event) => {
    const receiveChannel = event.channel;
    receiveChannel.onmessage = (event) => {
      console.log('Received file data:', event.data);
      onReceiveFile(event.data); // Call the callback to handle received file data
    };
  };
};

// Function to send files over WebRTC
export const sendFilesOverWiFi = async (files) => {
  if (!sendChannel) {
    console.error('Data channel is not initialized');
    return;
  }

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = (event) => {
      sendChannel.send(event.target.result); // Send file data
    };
    reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
  });
};

// Function to create an offer and set up the connection
export const createOffer = async () => {
  const offer = await localConnection.createOffer();
  await localConnection.setLocalDescription(offer);
  // Send the offer to the remote peer (implement your signaling here)
  console.log('Offer created:', offer);
};

// Function to handle incoming offer and create an answer
export const handleOffer = async (offer) => {
  await localConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await localConnection.createAnswer();
  await localConnection.setLocalDescription(answer);
  // Send the answer back to the remote peer (implement your signaling here)
  console.log('Answer created:', answer);
};

// Function to receive files (you will need to implement a server-side logic)
export const receiveFiles = async () => {
  // Implement your logic to receive files over Wi-Fi
}; 