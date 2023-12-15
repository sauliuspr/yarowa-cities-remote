import React from 'react';

interface StatusIndicatorProps {
  status?: 'healthy' | 'unhealthy' | string;
  color?: string;
  shape?: 'circle' | 'rectangle';
  size?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status = '', // Provide a default value for status
  color,
  shape = 'circle',
  size = '30px',
}) => {
  const determineColor = (status: string) => {
    switch(status) {
      case 'healthy':
        return 'green';
      case 'unhealthy':
        return 'red';
      default:
        return 'gray';
    }
  };

  const finalColor = color || determineColor(status);

  const svgStyle = {
    height: size,
    width: size,
  };

  const commonStyle = {
    fill: finalColor,
  };

  return (
    <svg style={svgStyle} viewBox="0 0 100 100">
      {shape === 'circle' && <circle cx="50" cy="50" r="40" style={commonStyle} />}
      {shape === 'rectangle' && <rect x="10" y="10" width="40" height="80" style={commonStyle} />}
    </svg>
  );
};

export default StatusIndicator;
