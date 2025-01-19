import { useState, useEffect } from 'react';
import { Filesystem } from '@capacitor/filesystem';
import { Directory } from '@capacitor/filesystem';

const useFilePicker = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const requestPermissions = async () => {
    const result = await Filesystem.requestPermissions();
    return result.publicStorage === 'granted';
  };

  const fetchFiles = async () => {
    try {
      const result = await Filesystem.readdir({
        path: 'your-directory-path', // Specify the directory path
        directory: 'Documents',
      });
      setFiles(result.files);
    } catch (error) {
      console.error('Error fetching files:', error);
      setErrorMessage('Error fetching files. Please try again.');
    }
  };

  const handleFileSelect = async () => {
    if (await requestPermissions()) {
      await fetchFiles();
    } else {
      setErrorMessage('Permission denied. Please grant storage permission.');
    }
  };

  return { files, errorMessage, handleFileSelect };
};

export default useFilePicker; 