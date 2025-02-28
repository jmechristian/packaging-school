import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { TextureLoader } from 'three';
import { SubscriptionCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import Meta from '../components/shared/Meta';
import { getCPSCourses } from '../helpers/api';
import SubscriptionWhat from '../components/home/SubscriptionWhat';
const App = () => {
  const [courses, setCourses] = useState([]);

  const Scene = () => {
    const cardsGroup = useRef();
    const cardsRefs = useRef([]);
    const rotationAngle = useRef(0);

    // Load textures for the cards
    const textureUrls = [
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
      '/test-card.png',
    ];

    const textures = useLoader(TextureLoader, textureUrls);

    // Rotate the group of cards and each individual card
    useFrame(() => {
      rotationAngle.current += 0.0015; // Shared rotation speed
      if (cardsGroup.current) {
        cardsGroup.current.rotation.y = rotationAngle.current;
      }
      cardsRefs.current.forEach((card) => {
        if (card) {
          card.rotation.y = rotationAngle.current + Math.PI / 2; // Consistent rotation for all cards
        }
      });
    });

    const handleCardClick = (index) => {
      console.log(`Card ${index} clicked`);
      // Add your interaction logic here
    };

    const cards = Array.from({ length: 9 }, (_, i) => {
      const angle = (i / 9) * Math.PI * 2; // Calculate angle for each card
      const x = Math.cos(angle) * 4; // Closer X position in circle
      const z = Math.sin(angle) * 4; // Closer Z position in circle
      return (
        <mesh
          key={i}
          ref={(el) => (cardsRefs.current[i] = el)}
          position={[x, 0, z]}
          rotation={[0, angle, 0]}
          receiveShadow
          castShadow
          onClick={() => handleCardClick(i)} // Add onClick event
        >
          <boxGeometry args={[1.5, 2.25, 0.025]} /> {/* Card dimensions */}
          <meshStandardMaterial map={textures[i]} />
        </mesh>
      );
    });

    return (
      <>
        <group ref={cardsGroup} position={[0, 0.2, 0]}>
          {cards}
        </group>
        {/* Floor */}
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          receiveShadow
          castShadow
        >
          <planeGeometry args={[20, 20]} /> {/* Floor dimensions */}
          <meshStandardMaterial color='white' />
        </mesh>
        {/* Walls */}
        <mesh position={[0, -1, -10]} receiveShadow castShadow>
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial color='black' />
        </mesh>
        <mesh
          rotation={[0, Math.PI / 2, 0]}
          position={[-10, -1, 0]}
          receiveShadow
          castShadow
        >
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial color='black' />
        </mesh>
        <mesh
          rotation={[0, -Math.PI / 2, 0]}
          position={[10, -1, 0]}
          receiveShadow
          castShadow
        >
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial color='black' />
        </mesh>
        <mesh
          rotation={[0, Math.PI, 0]}
          position={[0, -1, 10]}
          receiveShadow
          castShadow
        >
          <planeGeometry args={[15, 15]} />
          <meshStandardMaterial color='black' />
        </mesh>
        {/* Dramatic Lighting */}
        <spotLight
          position={[-5, 2, 5]}
          rotation={[-Math.PI / 2, 0, 0]}
          angle={0.15}
          penumbra={0.5}
          intensity={100}
          castShadow
        />
      </>
    );
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const courses = await getCPSCourses();
      setCourses(courses);
    };
    fetchCourses();
  }, []);

  return (
    <>
      <Meta
        title={'Packaging School'}
        description={
          'The Packaging School brings together the business, art, and science of packaging so you can lead projects, optimize supply chains, increase margins, and develop sustainable solutions.'
        }
        image={'https://packschool.s3.amazonaws.com/firework-box-3.webp'}
      />
      <div className='w-full flex flex-col gap-16 lg:gap-36 relative pb-16'>
        {/* INTRO */}
        <div className='w-full bg-gray-900 flex items-center justify-center relative'>
          <div className='w-full h-[750px]'>
            <Canvas className='w-full h-full' shadows>
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 2.5]}
                rotation={[0.5, 0, 0]}
                fov={45}
              />
              <color attach='background' args={['black']} />
              <spotLight
                decay={0.2}
                position={[-15, 10, 10]}
                angle={0.5}
                penumbra={1}
                intensity={0.25}
                castShadow
                shadow-mapSize={1024}
              />
              <spotLight
                decay={0}
                position={[-1, 0, 1]}
                rotation={[0, 0, 0]}
                angle={0.75}
                penumbra={0.5}
                intensity={1}
                castShadow
                distance={-15}
                shadow-mapSize={1024}
              />
              <pointLight
                distance={10}
                intensity={1}
                position={[2, 1, 0]}
                color='blue'
              />
              <OrbitControls
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                enableZoom={false}
              />
              <EffectComposer disableNormalPass>
                <Bloom
                  luminanceThreshold={0.0}
                  mipmapBlur
                  luminanceSmoothing={0.0}
                  intensity={1}
                />
              </EffectComposer>
              <Scene />
            </Canvas>
          </div>
          <div className='absolute right-1/2 translate-x-1/2 top-0 w-full h-full flex flex-col justify-center gap-10 mx-auto max-w-7xl items-start px-5'>
            <div className='w-full flex flex-col gap-4 max-w-2xl items-start'>
              <div className='w-full h-full text-white h1-base'>
                One subscription,{' '}
                <span className='text-clemson'>unlimited learning.</span>
              </div>
              <div className='w-full h-full text-white  lg:leading-normal text-xl lg:text-2xl'>
                Discover 3 paths to complete access to Packaging School&apos;s
                expert-led courses and a dynamic lesson library, with monthly
                updates keeping you ahead of the curve.
              </div>
              <div className='flex flex-col items-start gap-4 mt-7'>
                <p className='text-white text-2xl font-semibold'>
                  <span className='text-clemson'>Join for free&mdash;</span> get
                  started today.
                </p>
                <div className='flex gap-3'>
                  <button className='px-4 py-2 bg-white text-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-100 transition-colors'>
                    <img
                      src='/logos/google.svg'
                      alt='Google'
                      className='w-6 h-6'
                    />
                  </button>
                  <button className='px-4 py-2 bg-[#0A66C2] text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-colors'>
                    <img
                      src='/logos/linkedin.svg'
                      alt='LinkedIn'
                      className='w-6 h-6'
                    />
                  </button>
                  <button className='px-4 py-2 bg-[#1877F2] text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-colors'>
                    <img
                      src='/logos/facebook.svg'
                      alt='Facebook'
                      className='w-6 h-6'
                    />
                  </button>
                  <button className='px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:opacity-90 transition-colors border border-white'>
                    <img
                      src='/logos/apple.svg'
                      alt='Apple'
                      className='w-6 h-6'
                    />
                  </button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <SubscriptionWhat />
        {/* COURSES */}
      </div>
    </>
  );
};

export default App;

{
  /* <div className='w-full flex bg-black aspect-[16/9]'>
              <VideoPlayer
                videoEmbedLink='https://www.youtube.com/embed/Xz1nkZfD83c'
                light={true}
                playing={true}
              />
            </div> */
}
