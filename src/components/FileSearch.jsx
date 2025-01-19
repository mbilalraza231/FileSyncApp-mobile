// components/FileSearch.jsx
import React from 'react';
import styles from './FileSearch.module.css';

const FileSearch = ({ onFileSelect }) => {
  return (
    <div className={styles.fileSearch}>
      <label htmlFor="file-upload" className={styles.fileLabel}>
        Choose files
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        onChange={onFileSelect}
        accept="image/*,application/pdf,.doc,.docx,.txt"
      />
    </div>
  );
};

export default FileSearch;
