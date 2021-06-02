import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const HeaderIcon = ({ Icon, active }) => {


  return (
        <div className="flex items-center rounded-xl cursor-pointer md:px-10 sm:h-14 md:hover:bg-gray-100  active:border-b-2 active:border-blue-500 group">
          <Icon
            className={`h-5 text-gray-500 text-center group-hover:text-blue-500 md:h-7 mx-auto ${
              active && "text-blue-500"
            }`}
          />
        </div>
  );
};

export default HeaderIcon;
