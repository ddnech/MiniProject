import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileGrid1 from '../components/ProfilePageGrid/Grid1';
import ProfileGrid3 from '../components/ProfilePageGrid/Grid3';

const Password = () => {
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
    <div className="w-full h-fit flex justify-center py-11">
      <div className="p-4 flex flex-col justify-center items-center">
        {userData ? (
          <div>
            <ProfileGrid3/>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
      </div>
    </div>
  );
};

export default Password;