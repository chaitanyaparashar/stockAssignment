import React from 'react';

interface PriceChartProps {
  data: number[];
  isPositive: boolean;
}

const PriceChart: React.FC<PriceChartProps> = ({ data, isPositive }) => {
  if (!data || data.length === 0) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  const width = 200;
  const height = 60;

  const points = data.map((price, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((price - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`gradient-${isPositive ? 'up' : 'down'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0.3" />
          <stop offset="100%" stopColor={isPositive ? '#10b981' : '#ef4444'} stopOpacity="0" />
        </linearGradient>
      </defs>

      <polyline
        fill="none"
        stroke={isPositive ? '#10b981' : '#ef4444'}
        strokeWidth="2"
        points={points}
      />

      <polygon
        fill={`url(#gradient-${isPositive ? 'up' : 'down'})`}
        points={`0,${height} ${points} ${width},${height}`}
      />
    </svg>
  );
};

export default PriceChart;
