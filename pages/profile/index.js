import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import ProfileHead from '../../components/profile/ProfileHead';
import ProfileDetails from '../../components/profile/ProfileDetails';
import ProfileStats from '../../components/profile/ProfileStats';

export default withPageAuthRequired(function Page() {
  const currentUser = useSelector((state) => state.auth.user);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className='bg-slate-100 min-h-screen'>
      <div className='md:py-16'>
        <div className='mx-auto max-w-6xl shadow-xl my-16 rounded-lg flex flex-col'>
          {currentUser && (
            <>
              <ProfileHead
                user={currentUser}
                isEditing={isEditing}
                toggleEditing={() => toggleEditing()}
              />
              <ProfileDetails user={currentUser} isEditing={isEditing} />
              <ProfileStats user={currentUser} />
            </>
          )}
        </div>
      </div>
    </div>
  );
});
