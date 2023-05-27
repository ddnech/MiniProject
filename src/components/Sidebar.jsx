import React from 'react';
import { AiOutlineUser, AiOutlineFileAdd, AiOutlineUnorderedList, AiOutlineLock, AiOutlineLogout, AiOutlineEdit } from 'react-icons/ai';

const Sidebar = ({ children }) => {
  return (
    <div className="flex">
      <div className="fixed w-50 h-screen p-4 bg-white border-r-[1px] flex flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="bg-gray-300 p-3 rounded-lg inline-block">
            <AiOutlineUser size={20} />
          </div>
          <span className="border-b-[1px] border-gray-200 w-full p-2"></span>
          <div className="bg-gray-300 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <AiOutlineFileAdd size={20} />
          </div>
          <div className="bg-gray-300 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <AiOutlineUnorderedList size={20} />
          </div>
          <div className="bg-gray-300 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <AiOutlineEdit size={20} />
          </div>
          <div className="bg-gray-300 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <AiOutlineLock size={20} />
          </div>
          <div className="bg-gray-300 hover:bg-gray-200 cursor-pointer my-4 p-3 rounded-lg inline-block">
            <AiOutlineLogout size={20} />
          </div>
        </div>
      </div>
      <main className="ml-20 w-full">{children}</main>
    </div>
  );
};

export default Sidebar;
