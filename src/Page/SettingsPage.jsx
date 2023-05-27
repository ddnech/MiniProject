import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileGrid1 from '../components/ProfilePageGrid/Grid1';
import ProfileGrid2 from '../components/ProfilePageGrid/Grid2';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('https://minpro-blog.purwadhikabootcamp.com/api/auth/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            const userData = response.data;
            setUserData(userData);
          } else {
            throw new Error('Failed to fetch user data');
          }
        } else {
          throw new Error('Token not found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="w-full h-screen flex justify-center">
      <div className="p-4 flex flex-col justify-center items-center">
        {userData ? (
          <div className="grid grid-cols-2 gap-8">
            <ProfileGrid1 userData={userData} />
            <ProfileGrid2 userData={userData} />
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default UserProfile;