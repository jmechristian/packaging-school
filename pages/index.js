import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import {
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
} from '@react-three/drei';
import { TextureLoader } from 'three';
import { GiJourney, GiThreeFriends } from 'react-icons/gi';
import Meta from '../components/shared/Meta';
import { getCPSCourses } from '../helpers/api';
import SubscriptionWhat from '../components/home/SubscriptionWhat';
import LearningPath from '../components/home/LearningPath';
import CardFilter from '../components/home/CardFilter';
import WhyPschool from '../components/shared/WhyPschool';
import NewHomeTestimonials from '../components/home/NewHomeTestimonials';
import HomeCorporate from '../components/home/HomeCorporate';
const App = () => {
  const [courses, setCourses] = useState([]);
  const router = useRouter();
  const Scene = () => {
    const cardsGroup = useRef();
    const cardsRefs = useRef([]);
    const rotationAngle = useRef(0);

    // Load textures for the cards
    const textureUrls = [
      '/test-card.png',
      '/test-card-2.png',
      '/test-card-3.png',
      '/test-card-4.png',
      '/test-card-5.png',
      '/test-card-6.png',
      '/test-card-7.png',
      '/test-card-8.png',
      '/test-card-9.png',
      '/test-card.png',
      '/test-card-2.png',
      '/test-card-3.png',
    ];

    const textures = useLoader(TextureLoader, textureUrls);

    // Rotate the group of cards and each individual card
    useFrame((state) => {
      rotationAngle.current += 0.0012; // Shared rotation speed
      if (cardsGroup.current) {
        cardsGroup.current.rotation.y = rotationAngle.current;
      }
      // Make each card face the camera
      cardsRefs.current.forEach((card) => {
        if (card) {
          card.lookAt(state.camera.position);
        }
      });
    });

    const handleCardClick = (index) => {
      console.log(`Card ${index} clicked`);
      // Add your interaction logic here
    };

    const cards = Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2; // Calculate angle for each card
      const x = Math.cos(angle) * 4; // Closer X position in circle
      const z = Math.sin(angle) * 4; // Closer Z position in circle
      return (
        <mesh
          key={i}
          ref={(el) => (cardsRefs.current[i] = el)}
          position={[x, 0, z]}
          receiveShadow
          castShadow
          onClick={() => handleCardClick(i)}
        >
          <boxGeometry args={[1.35, 2.25, 0.015]} />
          <meshStandardMaterial map={textures[i]} />
        </mesh>
      );
    });

    return (
      <>
        <group ref={cardsGroup} position={[0, 0.2, -0.5]}>
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
          <meshStandardMaterial color='#1f97bf' />
        </mesh>
        {/* Walls */}
        <mesh position={[0, 0, -16]} receiveShadow castShadow>
          <planeGeometry args={[40, 25]} />
          <meshStandardMaterial color='black' />
        </mesh>
        <mesh
          rotation={[0, Math.PI / 2, 0]}
          position={[-10, -1, 0]}
          receiveShadow
          castShadow
        >
          <planeGeometry args={[25, 25]} />
          <meshStandardMaterial color='black' />
        </mesh>
        <mesh
          rotation={[0, -Math.PI / 2, 0]}
          position={[10, -1, -10]}
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
          position={[-5, 3.5, 5]}
          rotation={[-Math.PI / 2, 0, 0]}
          angle={0.6}
          penumbra={1}
          intensity={7}
          castShadow
        />
      </>
    );
  };

  return (
    <>
      <Meta
        title={'Packaging School'}
        description={
          'The Packaging School brings together the business, art, and science of packaging so you can lead projects, optimize supply chains, increase margins, and develop sustainable solutions.'
        }
        image={'https://packschool.s3.amazonaws.com/firework-box-3.webp'}
      />
      <div className='w-full flex flex-col gap-16 lg:gap-24 relative pb-16'>
        {/* INTRO */}
        <div className='w-full bg-slate-800 flex items-center justify-center relative'>
          <div className='w-full h-[700px]'>
            <Canvas className='w-full h-full' shadows>
              <PerspectiveCamera
                makeDefault
                position={[-0.5, 2.5, 1.5]}
                rotation={[0, 0, 0]}
                fov={35}
              />
              <color attach='background' args={['black']} />
              <ambientLight intensity={0.05} color='#1f97bf' />
              {/* <spotLight
                decay={0}
                position={[-2, 0, 1]}
                rotation={[0, 0, 0]}
                angle={0.5}
                penumbra={0.5}
                intensity={0.2}
                castShadow
                distance={-15}
                shadow-mapSize={1024}
              /> */}
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
          <div className='absolute right-1/2 translate-x-1/2 top-0 w-full h-full flex flex-col justify-center gap-10 mx-auto max-w-7xl items-center px-5'>
            <div className='w-full flex flex-col gap-8 max-w-5xl items-center text-center'>
              <div className='w-full h-full text-white h1-base '>
                One Powerful Catalog.{' '}
                <span className='text-clemson block'>Two Flexible Paths.</span>
              </div>
              <div className='w-full h-full text-white text-2xl max-w-5xl mx-auto'>
                Get full access to Packaging School’s expert-led course
                library—whichever path you choose. Learn with a group, guided by
                experts, while completing a project tailored to your current
                role or a position you’re targeting or go at your own pace with
                the same in-depth content, available anytime.
              </div>
              <div className='flex flex-col items-start gap-10 mt-7'>
                <p className='text-2xl font-light text-slate-400 font-oswald uppercase'>
                  Advance your career. Boost your resume. Keep learning.
                </p>
                {/* <div className='flex gap-3'>
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
                </div> */}
                <div className='grid lg:grid-cols-2 gap-4 w-full max-w-2xl mx-auto pb-5'>
                  <button className='w-full p-3 bg-base-brand text-white rounded flex items-center gap-2 hover:bg-base-brand/90 transition-colors justify-center font-bold text-lg'>
                    <div
                      className='flex items-center gap-2.5'
                      onClick={() => router.push('/cohort')}
                    >
                      <GiThreeFriends size={32} />
                      <div>Professor-Led Cohort</div>
                    </div>
                  </button>
                  <button className='w-full p-3 bg-clemson text-white rounded flex items-center gap-2 hover:opacity-90 transition-colors justify-center font-bold text-lg'>
                    <div className='flex items-center gap-2.5'>
                      <GiJourney size={32} />
                      <div>Self-Paced Access</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* HOW IT WORKS */}
        <SubscriptionWhat />
        {/* COURSES */}
        <CardFilter />
        <WhyPschool />
        <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
        <NewHomeTestimonials />
        <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
        <LearningPath />
        <div className='w-full h-px bg-clemson max-w-7xl mx-auto'></div>
        <HomeCorporate />
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
