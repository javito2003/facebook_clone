import React from "react";
import Options from "./Options";
import { PlusCircleIcon, PencilIcon } from "@heroicons/react/solid";

const UserNav = () => {
  return (
    <div className="ml-5 my-2 flex justify-center md:justify-between items-center">
      <div className="hidden md:flex">
        <Options active name="Posts" />
        <Options name="About" />
        <Options name="Friends" />
      </div>
      <div className="flex items-center">
        <button className="mx-1 bg-blue-500 p-2 px-3 flex items-center text-white font-bold rounded-md">
          <PlusCircleIcon className="h-5 mr-1" />
          Add Story
        </button>

        <button className="flex items-center mx-1 bg-gray-200 p-2 px-3 rounded-md font-bold hover:bg-gray-300"><PencilIcon className="h-5 mr-1" />Edit Profile</button>

        <button className="flex items-center mx-1 bg-gray-200 p-2 px-3 rounded-md font-bold hover:bg-gray-300">...</button>
      </div>
    </div>
  );
};

export default UserNav;
