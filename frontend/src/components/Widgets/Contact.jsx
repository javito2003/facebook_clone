import React from 'react'

const Contact = ({name, src, lastName, active}) => {
    return (
        <div className="flex items-center space-x-2 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
            <img className="rounded-full inline-block h-10 w-10 ring-2 ring-white" src={src} width={50} height={50}  />
            <p>{name} {lastName}</p>
            <div className={`absolute bottom-2 left-7 ${active ? 'bg-green-700 animate-bounce' : 'bg-gray-500' }  h-3 w-3 rounded-full `}></div>
        </div>
    )
}

export default Contact
