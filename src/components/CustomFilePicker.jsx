import React, { useState } from 'react';
import useFilePicker from '../hooks/useFilePicker'; // Import the custom hook
import styles from './CustomFilePicker.module.css'; // Create a CSS file for styling

const CustomFilePicker = ({ onFileSelect }) => {
  const { files, errorMessage, handleFileSelect } = useFilePicker();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.filePicker}>
      <button onClick={handleFileSelect}>Select Files</button>
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
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default CustomFilePicker;
