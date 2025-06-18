import React, { useState, useEffect } from 'react';
import { getPaths, createCredential } from '../../helpers/api';
import {
  GiFizzingFlask,
  GiForest,
  GiPalette,
  GiCarWheel,
  GiHoneycomb,
  GiBoxUnpacking,
  GiAstronautHelmet,
} from 'react-icons/gi';

const Sandbox = () => {
  const [loading, setLoading] = useState(true);
  const [paths, setPaths] = useState([]);
  const [credential, setCredential] = useState(null);
  useEffect(() => {
    getPaths().then((data) => {
      setPaths(data);
      setLoading(false);
    });
  }, []);

  const renderIcon = (icon) => {
    switch (icon) {
      case 'GiFizzingFlask':
        return <GiFizzingFlask size={300} className='text-white' />;
      case 'GiForest':
        return <GiForest size={300} className='text-white' />;
      case 'GiPalette':
        return <GiPalette size={300} className='text-white' />;
      case 'GiCarWheel':
        return <GiCarWheel size={300} className='text-white' />;
      case 'GiHoneycomb':
        return <GiHoneycomb size={300} className='text-white' />;
      case 'GiBoxUnpacking':
        return <GiBoxUnpacking size={300} className='text-white' />;
      case 'GiAstronautHelmet':
        return <GiAstronautHelmet size={300} className='text-white' />;
      default:
        return null;
    }
  };

  const handleCreateCredential = async () => {
    const credential = await createCredential(
      'Jamie Christian',
      'jmechristian@gmail.com',
      '717916'
    );
    setCredential(credential);
  };

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='text-4xl font-bold'>Sandbox</h1>
      {loading ? (
        <div className='flex items-center justify-center h-screen'>
          <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
        </div>
      ) : (
        <div className='flex  flex-wrap items-center justify-center h-screen gap-10'>
          {paths.map((path) => (
            <div
              key={path.id}
              className='w-96 h-96 bg-clemson flex justify-center items-center'
            >
              {renderIcon(path.icon)}
              <button
                className='absolute bottom-0 right-0'
                onClick={() => handleCreateCredential()}
              >
                Create Credential
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sandbox;
