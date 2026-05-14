import React from "react";
import "./LayoutWrapper.css";

const LayoutWrapper = ({ children, className = "" }) => (
  <div className={`layout-wrapper ${className}`.trim()}>{children}</div>
);

export default LayoutWrapper;
