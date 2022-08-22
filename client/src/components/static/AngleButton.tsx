import React from 'react';

function AngleButton({ inverted }: { inverted: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      version="1.1"
      viewBox="0 -256 1792 1792"
      className={`angle-icon ${inverted ? 'inverted' : ''}`}
    >
      <g transform="matrix(1 0 0 -1 288.542 1255.05)">
        <path
          fill="currentColor"
          d="M1075 800q0-13-10-23L599 311q-10-10-23-10t-23 10L87 777q-10 10-10 23t10 23l50 50q10 10 23 10t23-10l393-393 393 393q10 10 23 10t23-10l50-50q10-10 10-23z"
        ></path>
      </g>
    </svg>
  );
}

export default AngleButton;