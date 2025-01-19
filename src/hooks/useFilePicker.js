import { useState, useEffect } from 'react';
import { Filesystem } from '@capacitor/filesystem';
import { Directory } from '@capacitor/filesystem';
import { handleError } from '../utils/errorHandler';
import { requestFilePermissions, fetchFilesFromDirectory } from '../services/fileService';

const useFilePicker = () => {
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchFiles = async () => {
    if (await requestFilePermissions()) {
      const files = await fetchFilesFromDirectory('your-directory-path');
      setFiles(files);
    } else {
      setErrorMessage('Permission denied. Please grant storage permission.');
    }
  };

  const handleFileSelect = async () => {
    await fetchFiles();
  };

  return { files, errorMessage, handleFileSelect };
};

export default useFilePicker; 