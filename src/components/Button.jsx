import React from 'react';
import './Button.module.css'; // Assuming you have styles in this file

const Button = ({ label = "Click me", onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
