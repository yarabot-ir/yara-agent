import React, { useEffect, useRef } from 'react';

const Thinking: React.FC = () => {
  const elements = ['line1', 'line2', 'path1', 'path2'];
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const prefString = localStorage.getItem('preferences');
  const preferences = prefString ? JSON.parse(prefString) : null;
  const color = preferences?.header_color || '#3AC0A0';

  const resetOpacity = () => {
    elements.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.style.opacity = '0';
      }
    });
  };

  const animateElements = () => {
    resetOpacity();
    elements.forEach((id, index) => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.style.opacity = '1';
        }
      }, index * 300);
    });
  };

  useEffect(() => {
    animateElements();
    intervalRef.current = setInterval(animateElements, 1200);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <svg
        id="loadingContainer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 51 51"
        width="40"
        //   height="30"
      >
        <style>
          {`.st0 { fill: none; stroke: ${color}; stroke-width: 4; stroke-linecap: round; stroke-miterlimit: 10; }`}
        </style>
        <line
          id="line1"
          className="st0"
          x1="21"
          y1="25.5"
          x2="21.2"
          y2="25.5"
          opacity="0"
        />
        <line
          id="line2"
          className="st0"
          x1="29"
          y1="25.5"
          x2="29.2"
          y2="25.5"
          opacity="0"
        />
        <path
          id="path1"
          className="st0"
          d="M31.9,15.8c0,0,7.4,2.5,7.4,9.7s-7.4,9.8-7.4,9.8"
          opacity="0"
        />
        <path
          id="path2"
          className="st0"
          d="M36.4,9.9C39.9,11.7,47,16.4,47,25.6c0,9.2-7.1,14-10.6,15.9"
          opacity="0"
        />
      </svg>
    </div>
  );
};

export default Thinking;
