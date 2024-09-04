import React from 'react';
import './ColumnLayout.css';

const ColumnLayout = ({ children }) => {
  return <div className="column-container">{children}</div>;
};

export default ColumnLayout;
