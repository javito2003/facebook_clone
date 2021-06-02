import React from 'react'

const SidebarRowSearch = ({src, Icon, title, active}) => {
    return (
        <div className="flex  items-center space-x-2 p-5 hover:bg-gray-200 rounded-xl cursor-pointer">
            {
                Icon && <Icon className={`h-6 w-6 ${active ? 'text-blue-500' : 'text-black'}`} />
            }
            <p className="hidden sm:inline-flex font-medium">{title}</p>
        </div>
    )
}

export default SidebarRowSearch
