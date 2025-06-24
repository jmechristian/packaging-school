const ProgressDonut = ({
  progress,
  size,
  color,
  strokeColor,
  textColor,
  textSize,
}) => {
  // console.log('progress', progress);
  return (
    <div className={`relative w-${size} h-${size}`}>
      <svg className='w-full h-full' viewBox='0 0 36 36'>
        <circle
          cx='18'
          cy='18'
          r='15.91549430918954'
          fill='none'
          stroke={color}
          strokeWidth='3'
        />
        <circle
          cx='18'
          cy='18'
          r='15.91549430918954'
          fill='none'
          stroke={strokeColor}
          strokeWidth='3'
          strokeDasharray={`${progress} 100`}
          strokeDashoffset='0'
          transform='rotate(-90 18 18)'
        />
        <text
          x='50%'
          y='50%'
          fontSize={textSize || '10'}
          fontWeight='500'
          letterSpacing='-0.05em'
          textAnchor='middle'
          dy='.3em'
          fill={textColor ? textColor : 'currentColor'}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
};

export default ProgressDonut;
