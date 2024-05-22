'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Profile() {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('user'));
  const router = useRouter();

  useEffect(() => {
    if (!jwt) router.replace('/');
  }, []);
  return (
    <div className='w-full px-10 py-5 min-h-screen flex flex-col gap-3 md:gap-5'>
      <h2 className='font-bold text-3xl text-green-700'>Profile</h2>
      <div className='w-full'>
        <h3 className='font-bold text-3xl text-primary'>{user.username}</h3>
      </div>
    </div>
  );
}

export default Profile;

