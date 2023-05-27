import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProfileGrid1 = ({ userData }) => {
  const [newPic, setNewPic] = useState(null);
  const token = useSelector((state) => state.tokenAuth.token);

  const handleSave = (e) => {
    e.preventDefault();
    if (newPic) {
      const formData = new FormData();
      formData.append("file", newPic);

      axios
        .post("https://minpro-blog.purwadhikabootcamp.com/api/profile/single-uploaded", formData, { headers: { Authorization: `Bearer ${token}` } })
        .then(() => {
          console.log("Profile picture updated successfully.");
          setNewPic(null);
          location.reload();
        })
        .catch((error) => {
          console.error("Error updating profile picture:", error);
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewPic(file);
  };

  return (
    <div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-center">Profile Image</h3>
        <div className="py-5 flex items-center justify-center">
          {userData.imgProfile ? (
            <img
              src={`https://minpro-blog.purwadhikabootcamp.com/${userData?.imgProfile}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
              }}
            />
          ) : (
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="Fallback Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex justify-center mt-2">
          <input type="file" onChange={handleFileChange} accept="image/*" />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSave}
          >
            Change Profile Image
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-col mb-2 justify-center text-center">
          <p className="text-lg font-semibold mb-2">Username: {userData.username}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-col mb-2 justify-center text-center">
          <p className="text-lg font-semibold mb-2">Email: {userData.email}</p>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-col mb-2 justify-center text-center">
          <p className="text-lg font-semibold mb-2">Phone: {userData.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileGrid1;
