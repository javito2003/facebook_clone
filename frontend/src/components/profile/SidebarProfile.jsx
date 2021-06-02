import React from "react";
import { BriefcaseIcon, AcademicCapIcon, HomeIcon, LocationMarkerIcon } from '@heroicons/react/solid'

const SidebarProfile = () => {
  return (
    <div className="bg-white rounded-md ">
      <div className="pr-10 pt-5 pb-10 pl-4">
        <h1 className="font-medium text-xl">Details</h1>
        <div className="flex items-center mt-4">
          <BriefcaseIcon className="h-6 text-gray-400" /> Work in Facebook
        </div>
        <div className="flex items-center mt-4">
          <AcademicCapIcon className="h-6 text-gray-400" /> Studied in Smo Rosario
        </div>
        <div className="flex items-center mt-4">
          <HomeIcon className="h-6 text-gray-400" /> Lives in Santa Rosa
        </div>
        <div className="flex items-center mt-4">
          <LocationMarkerIcon className="h-6 text-gray-400" /> Cordoba
        </div>
        <button className="mt-5 group relative w-full p-2 bg-gray-200 font-bold rounded-md focus:outline-none hover:bg-gray-300">
          Edit Details
        </button>
        <button className="mt-5 group relative w-full p-2 bg-gray-200 font-bold rounded-md focus:outline-none hover:bg-gray-300">
          Add hobbits
        </button>
        <button className="mt-5 group relative w-full p-2 bg-gray-200 font-bold rounded-md focus:outline-none hover:bg-gray-300">
          Add outstanding
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;
