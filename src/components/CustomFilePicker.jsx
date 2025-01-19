import React, { useState, useEffect } from 'react';
import { Filesystem } from '@capacitor/filesystem'; // Import Filesystem
import styles from './CustomFilePicker.module.css'; // Create a CSS file for styling

const CustomFilePicker = ({ onFileSelect }) => {
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const requestPermissions = async () => {
      const result = await Filesystem.requestPermissions();
      if (result.publicStorage === 'granted') {
        fetchFiles(); // Fetch files only if permission is granted
      } else {
        console.log('Permission denied');
      }
    };

    const fetchFiles = async () => {
      try {
        const result = await Filesystem.readdir({
          path: 'your-directory-path', // Specify the directory path
          directory: 'Documents', // Use string literals instead of FilesystemDirectory
        });
        setFiles(result.files);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    requestPermissions(); // Request permissions when the component mounts
  }, []);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.filePicker}>
      <input
        type="text"
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.fileList}>
        {filteredFiles.map((file, index) => (
          <li key={index} className={styles.fileItem} onClick={() => onFileSelect(file)}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomFilePicker;
