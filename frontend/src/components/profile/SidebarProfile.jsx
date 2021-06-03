import React from "react";
import { BriefcaseIcon, AcademicCapIcon, HomeIcon, LocationMarkerIcon } from '@heroicons/react/solid'
import { Link } from "react-router-dom";

const SidebarProfile = ({user}) => {
  return (
    <div className="">
      <div className=" bg-white lg:pr-10 rounded-md md:pt-5 md:pb-10 md:pl-4 mb-10">
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

      <div className="bg-white lg:pr-10 rounded-md md:p-5 md:pb-10 md:pl-4 mb-10">
        <div className="flex justify-between items-center">
          <h1 className="font-medium text-xl">Friends</h1>
          <p className="font-semibold px-1 py-2 rounded-md text-blue-500 hover:bg-gray-200 cursor-pointer">See all friends</p>
        </div>
        <div className="flex flex-wrap">
          {
            user.friendsId !== undefined ? 
            <>
              {
                user.friendsId.map((item, index) => (
                  <div onClick={() => window.location.href = `/profile/${item._id}`} key={index} className="mx-2 flex justify-center cursor-pointer hover:bg-gray-200 p-2 rounded-md">
                    <div>
                      <img src={item.profilePhoto} alt="" className="h-24 w-24" />
                      <p>{item.name} </p>
                    </div>
                  </div>
                ))
              }
            </>
            :
            ""
          }
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
