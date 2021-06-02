import React from 'react'
import SidebarRowSearch from './SidebarRowSearch'
import { NewspaperIcon, AnnotationIcon, UsersIcon, PhotographIcon, VideoCameraIcon, ShoppingCartIcon, FlagIcon, LocationMarkerIcon, UserGroupIcon, CalendarIcon} from '@heroicons/react/solid'

const Sidebar = () => {
    return (
        <div className="bg-white py-5 pl-4 pr-0 md:pr-20 shadow-md h-screen overflow-y-auto">
            <div className="border-b">
                <h1 className="flex flex-wrap sm:flex-nowrap text-3xl font-medium mb-2 ">Results</h1>
            </div>
            <div className="mt-5">
                <h3 className="flex justify-start">Filters</h3>
                <div className="p-2 mt-3 max-w-[600px] xl:min-w-[300px]">
                    <SidebarRowSearch active Icon={NewspaperIcon} title="All" />
                    <SidebarRowSearch Icon={AnnotationIcon} title="Posts"/>
                    <SidebarRowSearch Icon={UsersIcon} title="Users" />
                    <SidebarRowSearch Icon={PhotographIcon} title="Photos" />
                    <SidebarRowSearch Icon={VideoCameraIcon} title="Videos" />
                    <SidebarRowSearch Icon={ShoppingCartIcon} title="Marketplace" />
                    <SidebarRowSearch Icon={FlagIcon} title="Pages" />
                    <SidebarRowSearch Icon={LocationMarkerIcon} title="Places" />
                    <SidebarRowSearch Icon={UserGroupIcon} title="Groups"/>
                    <SidebarRowSearch Icon={CalendarIcon} title="Events" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
