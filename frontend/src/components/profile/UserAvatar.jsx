import React from "react";
import UserNav from "./UserNav";

const UserAvatar = ({ user }) => {
  return (
    <div className=" top-0 w-screen bg-white">
      <div className="flex justify-center border-b ">
        <div className="mt-28 ">
          <img src={user.profilePhoto} alt="" className="h-52 w-52 rounded-full" />
          <div className="flex justify-center mt-5">
            <h3 className="font-semibold text-3xl">{user.name} {user.lastName}</h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <UserNav />
      </div>
    </div>
  );
};

export default UserAvatar;
