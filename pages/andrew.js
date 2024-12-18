import React from 'react';
import AndrewHero from '../components/andrew/AndrewHero';
import AndrewAbout from '../components/andrew/AndrewAbout';
import AndrewVideo from '../components/andrew/AndrewVideo';
import GradientCTA from '../components/GradientCTA';
import Meta from '../components/shared/Meta';

const Page = () => {
  return (
    <>
      <Meta
        title={'Meet Dr. Andrew Hurley.'}
        description={
          'Dr. Andrew Hurley is a Professor of Food, Nutrition and Packaging Science at Clemson University. Andrew chairs the curriculum committee, manages an internationally recognized consumer behavior research program, and has delivered over 100 presentations on package design globally.'
        }
      />
      <AndrewHero />
      <AndrewAbout />
      <AndrewVideo />
      <GradientCTA
        headline='Ready to Work Together?'
        subheadline="Let's Connect."
        buttonText='Reach out to Dr. Hurley'
      />
    </>
  );
};

export default Page;
