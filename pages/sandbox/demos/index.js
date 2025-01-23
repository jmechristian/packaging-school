import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { TextureLoader } from 'three';
import { updateCategoryMenu } from '../../../data/CategoryMenu';
import VideoPlayer from '../../../components/VideoPlayer';

const App = () => {
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
          position={[5, 2, 5]}
          rotation={[-Math.PI / 2, 0, 0]}
          angle={0.15}
          penumbra={0.5}
          intensity={100}
          castShadow
        />
      </>
    );
  };

  return (
    <div className='w-full flex flex-col gap-16 lg:gap-36 relative pb-16'>
      {/* INTRO */}
      <div className='w-full bg-gray-900 flex items-center justify-center relative'>
        <div className='w-full h-[750px]'>
          <Canvas className='w-full h-full' shadows>
            <PerspectiveCamera
              makeDefault
              position={[0, 0, 2.5]}
              rotation={[0, 0, 0]}
              fov={45}
            />
            <color attach='background' args={['black']} />
            <spotLight
              decay={0.2}
              position={[10, 20, 10]}
              angle={0.1}
              penumbra={1}
              intensity={1}
              castShadow
              shadow-mapSize={1024}
            />
            <spotLight
              decay={0}
              position={[1, 0, 1]}
              rotation={[0, 0, -180]}
              angle={0.5}
              penumbra={0.5}
              intensity={1}
              castShadow
              distance={0}
              shadow-mapSize={1024}
            />
            <pointLight
              distance={10}
              intensity={4}
              position={[0, 0.7, 0]}
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
        <div className='absolute right-1/4 translate-x-1/4 top-0 w-full lg:w-1/3 h-full flex flex-col justify-center gap-10'>
          <div className='w-full flex flex-col gap-4 max-w-lg'>
            <div className='w-full h-full text-white h2-base'>
              Your Packaging Career Starts Here.
            </div>
            <div className='w-full h-full text-white text-lg'>
              Create your account and start experiencing industry-leading
              courses and certifications designed by subject-matter experts.
            </div>
          </div>
          <div className='w-full flex flex-col gap-4 max-w-lg'>
            <div className='w-full'>
              <input type='text' placeholder='Email' className='w-full' />
            </div>
            <div className='w-full'>
              <input type='text' placeholder='Name' className='w-full' />
            </div>
            <div className='w-full'>
              <input type='text' placeholder='Company' className='w-full' />
            </div>
            <div className='w-full'>
              <button className='w-full bg-clemson text-white font-bold text-lg p-3'>
                Create Your Free Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className='w-full max-w-7xl mx-auto flex flex-col gap-16'>
        <div className='flex flex-col items-center justify-center gap-5'>
          <h3 className='h3-base'>No Barriers to Learning—Just Progress</h3>
          <p className='text-lg'>
            Follow these quick steps to unlock hands-on learning and
            certifications.
          </p>
        </div>
        <div className='grid lg:grid-cols-2 gap-10 w-full items-center'>
          <div className='w-full flex bg-black aspect-[16/9]'>
            <VideoPlayer
              videoEmbedLink='https://www.youtube.com/embed/Xz1nkZfD83c'
              light={true}
              playing={true}
            />
          </div>
          <div className='w-full flex flex-col gap-2'>
            <div className='flex w-full items-center gap-5 border border-gray-200 rounded-lg px-5 py-3'>
              <div>
                <div className='w-10 h-10 bg-clemson rounded-full text-white flex items-center justify-center text-lg font-bold'>
                  1
                </div>
              </div>
              <div className='flex flex-col gap-1 w-fit'>
                <h4 className='h4-base'>Create an Account</h4>
                <p className='text-gray-500'>Sign up in minutes.</p>
              </div>
            </div>
            <div className='flex w-full items-center gap-5 border border-gray-200 rounded-lg px-5 py-3'>
              <div>
                <div className='w-10 h-10 bg-clemson rounded-full text-white flex items-center justify-center text-lg font-bold'>
                  2
                </div>
              </div>
              <div className='flex flex-col gap-1 w-fit'>
                <h4 className='h4-base'>Choose a Course</h4>
                <p className='text-gray-500'>
                  Select from a wide range of packaging course categories.
                </p>
                <div className='w-full flex flex-wrap gap-2'>
                  {updateCategoryMenu.slice(1).map((category) => (
                    <div
                      key={category.id}
                      className='w-fit bg-gray-200 rounded-lg px-3 py-2 text-sm cursor-pointer hover:bg-clemson hover:text-white transition-all duration-300'
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex w-full items-center gap-5 border border-gray-200 rounded-lg px-5 py-3'>
              <div>
                <div className='w-10 h-10 bg-clemson rounded-full text-white flex items-center justify-center text-lg font-bold'>
                  3
                </div>
              </div>
              <div className='flex flex-col gap-1 w-fit'>
                <h4 className='h4-base'>Earn Your Certificate</h4>
                <p className='text-gray-500'>
                  Complete the course and earn a certificate of completion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* COURSES */}
      <div className='w-full bg-black flex flex-col gap-16'>
        <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 py-16'>
          <div className='flex flex-col items-center justify-center gap-1'>
            <h3 className='h3-base text-white'>Start Learning</h3>
            <p className='text-lg text-white'>
              Explore our wide range of packaging courses designed by industry
              experts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
