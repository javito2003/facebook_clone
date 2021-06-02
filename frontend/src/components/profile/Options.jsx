import React from 'react'

const Options = ({active, name}) => {
    return (
        <>
        {
            active ? 
            <div className="cursor-pointer py-2 px-6 border-b-4 border-blue-500">
                <h4 className="text-md font-semibold text-blue-500">{name}</h4>
            </div>
            : 
            <div className="cursor-pointer rounded-md py-3 px-6 hover:bg-gray-200">
                <h4 className="text-sm font-semibold text-gray-400">{name}</h4>
            </div>
        }
        </>
        
    )
}

export default Options
