import { FiCloudLightning } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ShimmerCard = ({
  background,
  headline,
  subheadline,
  clickFn,
  isHovering = false,
  textColor = 'text-slate-50',
}) => {
  return (
    <div
      className={`group relative mx-auto w-full max-w-sm overflow-hidden  ${background} p-0.5 transition-all duration-500 ${
        clickFn ? 'cursor-pointer' : ''
      } ${isHovering ? `scale-[1.01] ${background}/50` : ''}`}
    >
      <div
        className={`relative z-10 flex flex-col items-center justify-center overflow-hidden  bg-neutral-800 p-6 transition-colors duration-500 ${
          isHovering ? 'bg-sky-800' : ''
        }`}
        onClick={clickFn ? clickFn : null}
      >
        {/* <FiCloudLightning className='relative z-10 mb-10 mt-2 rounded-full border-2 border-indigo-500 bg-slate-900 p-4 text-7xl text-indigo-500' /> */}

        <h4
          className={`relative z-10 mb-4 w-full text-3xl font-bold ${textColor}`}
        >
          {headline}
        </h4>
        <p className={`relative z-10 ${textColor}`}>{subheadline}</p>
      </div>

      <motion.div
        initial={{ rotate: '0deg' }}
        animate={{ rotate: '360deg' }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'linear',
        }}
        className={`absolute inset-0 z-0 bg-gradient-to-br from-indigo-200 via-indigo-200/0 to-indigo-200 transition-opacity duration-500 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          scale: 1.75,
        }}
      />
    </div>
  );
};

export default ShimmerCard;
