import React, { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { TextureLoader } from 'three';
import { SubscriptionCard } from '@jmechristian/ps-component-library';
import '@jmechristian/ps-component-library/dist/style.css';
import Meta from '../components/shared/Meta';
import { getCPSCourses } from '../helpers/api';

const App = () => {
  const [courses, setCourses] = useState([]);
  const features = [
    {
      title: 'Full Course Catalog Access',
      description:
        'Gain unlimited access to our ever-growing library of expert-led courses and lessons, with new content added monthly.',
    },
    {
      title: 'Certificates of Completion',
      description:
        'Earn industry-recognized certificates as you progress through your learning journey, proving your expertise and boosting your credibility.',
    },
    {
      title: 'Learning Paths',
      description:
        'Follow structured learning paths designed to guide you through essential packaging topics, making it easier to master key skills.',
    },
    {
      title: 'Learn Anywhere',
      description:
        'Access your courses anytime, anywhere—on desktop, tablet, or mobile—so you can learn at your own pace, on your schedule.',
    },
    {
      title: 'Personalized Dashboard',
      description:
        'Track your progress, manage your courses, and see your achievements in one convenient, easy-to-use dashboard.',
    },
    {
      title: 'Full Lesson Library Access',
      description:
        'Gain unlimited access to our ever-growing library of expert-led courses and lessons, with new content added monthly.',
    },
  ];

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
        <div className='w-full max-w-7xl mx-auto flex flex-col gap-16'>
          <div className='flex flex-col items-center justify-center gap-5 mx-auto max-w-5xl'>
            <h3 className='h3-base'>
              Stop Scrolling, Start Learning—Unlock Full Access Today.
            </h3>
            <p className='text-lg'>
              With hundreds of lessons and courses, choosing can feel
              overwhelming. That’s why we’ve made it easy—get full access with a
              certificate or alumni subscription.
            </p>
          </div>
          <div className='grid lg:grid-cols-3 gap-10 w-full items-center'>
            <div className='w-full h-full flex flex-col gap-5 p-4 border rounded-lg shadow-lg'>
              <div className='w-full h-full text-2xl font-semibold'>
                Certificate of Mastery in Packaging Management
              </div>
              <div className='w-full h-full text-lg'>
                Earn a certificate of mastery in packaging management by
                completing all courses.
              </div>
              <div className='grid grid-cols-2 w-full gap-5'>
                <div className='w-full p-4 border flex flex-col gap-4'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    Monthly
                  </div>
                  <div className='w-full h-full text-2xl font-bold'>
                    $199<span className='text-gray-500 text-sm'>/month</span>
                  </div>
                  <div className='w-full h-full text-sm text-white bg-clemson rounded-lg px-4 py-2 mt-5 text-center'>
                    Start Learning
                  </div>
                </div>
                <div className='w-full p-4 border flex flex-col gap-4'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    Yearly
                  </div>
                  <div className='w-full h-full text-2xl font-bold'>
                    $169<span className='text-gray-500 text-sm'>/month</span>
                  </div>
                  <div className='w-full h-full text-sm text-white bg-clemson rounded-lg px-4 py-2 mt-5 text-center'>
                    Start Learning
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 divide-y divide-gray-500 divide-dashed'>
                <div className='w-full h-full py-1'>
                  Clemson University Certificate. 100% online.
                </div>
                <div className='w-full h-full py-1'>
                  Structured 12-week program with custom project related to your
                  goals.
                </div>
                <div className='w-full h-full py-1'>
                  12-month access to all courses and a dynamic lesson library.
                </div>
                <div className='w-full h-full py-1'>
                  Enjoy optional certificates in Sustainability and Autmotive
                  Packaging for free.
                </div>
              </div>
            </div>
            <div className='w-full h-full flex flex-col gap-5 p-4 border rounded-lg shadow-lg'>
              <div className='w-full h-full text-2xl font-semibold'>
                Certificate of Packaging Science
              </div>
              <div className='w-full h-full text-lg'>
                Earn a certificate of mastery in packaging management by
                completing all courses.
              </div>
              <div className='grid grid-cols-2 w-full gap-5'>
                <div className='w-full p-4 border flex flex-col gap-4'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    Monthly
                  </div>
                  <div className='w-full h-full text-2xl font-bold'>
                    $199<span className='text-gray-500 text-sm'>/month</span>
                  </div>
                  <div className='w-full h-full text-sm text-white bg-clemson rounded-lg px-4 py-2 mt-5 text-center'>
                    Start Learning
                  </div>
                </div>
                <div className='w-full p-4 border flex flex-col gap-4'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    Yearly
                  </div>
                  <div className='w-full h-full text-2xl font-bold'>
                    $169<span className='text-gray-500 text-sm'>/month</span>
                  </div>
                  <div className='w-full h-full text-sm text-white bg-clemson rounded-lg px-4 py-2 mt-5 text-center'>
                    Start Learning
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 divide-y divide-gray-500 divide-dashed'>
                <div className='w-full h-full py-1'>
                  Clemson University Certificate. 100% online.
                </div>
                <div className='w-full h-full py-1'>
                  Structured 12-week program with custom project related to your
                  goals.
                </div>
                <div className='w-full h-full py-1'>
                  12-month access to all courses and a dynamic lesson library.
                </div>
                <div className='w-full h-full py-1'>
                  Enjoy optional certificates in Sustainability and Autmotive
                  Packaging for free.
                </div>
              </div>
            </div>
            <div className='w-full h-full flex flex-col gap-5 p-4 border rounded-lg shadow-lg'>
              <div className='w-full h-full text-2xl font-semibold'>
                Alumni Library
              </div>
              <div className='w-full h-full text-lg'>
                Earn a certificate of mastery in packaging management by
                completing all courses.
              </div>
              <div className='grid grid-cols-2 w-full gap-5'>
                <div className='w-full p-4 border flex flex-col gap-4'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    Monthly
                  </div>
                  <div className='w-full h-full text-2xl font-bold'>
                    $199<span className='text-gray-500 text-sm'>/month</span>
                  </div>
                  <div className='w-full h-full text-sm text-white bg-clemson rounded-lg px-4 py-2 mt-5 text-center'>
                    Start Learning
                  </div>
                </div>
                <div className='w-full p-4 border flex flex-col gap-4'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    Yearly
                  </div>
                  <div className='w-full h-full text-2xl font-bold'>
                    $169<span className='text-gray-500 text-sm'>/month</span>
                  </div>
                  <div className='w-full h-full text-sm text-white bg-clemson rounded-lg px-4 py-2 mt-5 text-center'>
                    Start Learning
                  </div>
                </div>
              </div>
              <div className='flex flex-col gap-2 divide-y divide-gray-500 divide-dashed'>
                <div className='w-full h-full py-1'>
                  Clemson University Certificate. 100% online.
                </div>
                <div className='w-full h-full py-1'>
                  Structured 12-week program with custom project related to your
                  goals.
                </div>
                <div className='w-full h-full py-1'>
                  12-month access to all courses and a dynamic lesson library.
                </div>
                <div className='w-full h-full py-1'>
                  Enjoy optional certificates in Sustainability and Autmotive
                  Packaging for free.
                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-full text-center text-lg'>
            All plans include the option to have your manager complete the
            checkout process
          </div>
          <div className='w-full border-t border-clemson pt-16 flex flex-col gap-16'>
            <div className='text-center text-xl font-bold'>
              All Subscriptions Include:
            </div>
            <div className='w-full grid grid-cols-3 gap-10'>
              {features.map((feature, index) => (
                <div key={index} className='w-full  flex flex-col gap-2'>
                  <div className='w-full h-full text-2xl font-semibold'>
                    {feature.title}
                  </div>
                  <div className='w-full h-full text-lg'>
                    {feature.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* COURSES */}
        <div className='w-full flex flex-col gap-16'>
          <div className='w-full max-w-7xl mx-auto flex flex-col gap-10 py-16'>
            <div className='flex flex-col items-center justify-center gap-1'>
              <h3 className='h3-base text-white'>Start Learning</h3>
              <p className='text-lg text-white'>
                Explore our wide range of packaging courses designed by industry
                experts.
              </p>
            </div>
            {courses.length > 0 && (
              <div className='w-full grid grid-cols-4 gap-10'>
                <SubscriptionCard
                  course={courses[0]}
                  cardClickHandler={() => {}}
                  cardPurchaseHandler={() => {}}
                />
                <SubscriptionCard
                  course={courses[1]}
                  cardClickHandler={() => {}}
                  cardPurchaseHandler={() => {}}
                />
                <SubscriptionCard
                  course={courses[2]}
                  cardClickHandler={() => {}}
                  cardPurchaseHandler={() => {}}
                />
              </div>
            )}
          </div>
        </div>
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
