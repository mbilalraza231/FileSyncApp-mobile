import React, { useState } from 'react';
import styles from './FilePicker.module.css'; // Create a CSS file for styling

const FilePicker = ({ onFileSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    onFileSelect(selectedFiles);
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.filePicker}>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={styles.fileInput}
      />
      <input
        type="text"
        placeholder="Search files..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <ul className={styles.fileList}>
        {filteredFiles.map((file, index) => (
          <li key={index} className={styles.fileItem}>
            {file.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilePicker; 