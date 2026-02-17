import React from 'react';
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from 'react-share';

const LessonShareButtons = ({ shareUrl, lesson, size = 40 }) => {
  return (
    <>
      <FacebookShareButton
        url={shareUrl}
        quote={lesson?.subhead}
        data-click-target='social_share'
        data-click-name='Facebook'
      >
        <FacebookIcon round size={size} />
      </FacebookShareButton>
      <LinkedinShareButton
        url={shareUrl}
        title={lesson?.title}
        source='PackagingSchool.com'
        summary={lesson?.subhead}
        data-click-target='social_share'
        data-click-name='LinkedIn'
      >
        <LinkedinIcon round size={size} />
      </LinkedinShareButton>
    </>
  );
};

export default LessonShareButtons;
