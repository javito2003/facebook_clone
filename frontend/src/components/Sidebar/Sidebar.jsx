import React from 'react'
import { ChevronDownIcon, ShoppingBagIcon, UserGroupIcon } from "@heroicons/react/outline";
import { CalendarIcon, ClockIcon, DesktopComputerIcon, UsersIcon } from "@heroicons/react/solid";
import SidebarRow from './SidebarRow'
import { NavLink } from 'react-router-dom';

const Sidebar = ({src}) => {
    return (
        <div className="p-2 mt-5 max-w-[600px] xl:min-w-[300px]">
            <SidebarRow src={src} title="Javier Moreno" />
            <NavLink to="/friends">
                <SidebarRow Icon={UsersIcon} title="Friends" />
            </NavLink>
            <SidebarRow Icon={UserGroupIcon} title="Groups" />
            <SidebarRow Icon={ShoppingBagIcon} title="Marketplace" />
            <SidebarRow Icon={DesktopComputerIcon} title="Watch" />
            <SidebarRow Icon={CalendarIcon} title="Events" />
            <SidebarRow Icon={ClockIcon} title="Memories" />
            <SidebarRow Icon={ChevronDownIcon} title="See more" />
        </div>
    )
}

export default Sidebar
