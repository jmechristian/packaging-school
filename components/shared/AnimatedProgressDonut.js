import React from 'react';

const AnimatedProgressDonut = ({
  size = 64,
  strokeWidth = 6,
  progress = 0,
}) => {
  // These values are based on the example SVG (viewBox 0 0 100 101)
  const center = 50;
  const radius = 45; // (100 - strokeWidth) / 2, but 45 is a good fit for 6px stroke
  const arcLength = 60; // degrees for the colored arc segment

  // Helper to describe an arc path (for the colored segment)
  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M',
      start.x,
      start.y,
      'A',
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(' ');
  };

  function polarToCartesian(cx, cy, r, angle) {
    const rad = ((angle - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  }

  // Arc from 0 to arcLength degrees (e.g., 0 to 60)
  const arcPath = describeArc(center, center, radius, 0, arcLength);

  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 100 101'
      className='progress-donut'
      style={{ display: 'block', position: 'relative' }}
    >
      {/* Background ring */}
      <circle
        cx='50'
        cy='50.5'
        r='45'
        fill='none'
        stroke='#e5e7eb' // Tailwind gray-200
        strokeWidth={strokeWidth}
      />
      {/* Spinning colored arc segment */}
      <g className='infinite-spin'>
        <path
          d={arcPath}
          fill='none'
          stroke='#ff9800'
          strokeWidth={strokeWidth}
          strokeLinecap='round'
        />
      </g>
      {/* Centered progress text (stationary) */}
      <text
        x='50%'
        y='50%'
        textAnchor='middle'
        dy='.3em'
        fontSize={size * 0.28}
        fill='#ff9800'
        fontWeight='bold'
        pointerEvents='none'
      >
        {Math.round(progress)}%
      </text>
    </svg>
  );
};

export default AnimatedProgressDonut;
