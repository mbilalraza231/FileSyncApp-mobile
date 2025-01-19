import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this import is present for Link
import styles from './Home.module.css'; // Make sure the path is correct
import { FaFileUpload, FaFileDownload } from 'react-icons/fa'; // Import icons

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.appName}>Welcome to FileSyncApp</h1>
      <p className={styles.description}>Easily transfer files between your devices.</p>
      <div className={styles.navigationLinks}>
        <Link to="/send" className={styles.link}>
          <FaFileUpload size={20} /> Send Files
        </Link>
        <Link to="/receive" className={styles.link}>
          <FaFileDownload size={20} /> Receive Files
        </Link>
      </div>
    </div>
  );
};

export default Home; // Default export is correct here
