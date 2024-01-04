import React from 'react';

const CircleIcon = ({ color }: {color: string | undefined}) => (
  <svg
    viewBox="0 0 24 24"
    width="28"
    height="28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill={color} />
  </svg>
);

export default CircleIcon;
