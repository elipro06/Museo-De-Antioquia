import React from 'react';
import styles from './LayoutContainer.module.css';

const LayoutContainer = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default LayoutContainer;
