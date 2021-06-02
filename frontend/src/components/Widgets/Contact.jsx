import React from 'react'

const Contact = ({name, src}) => {
    return (
        <div className="flex items-center space-x-2 mb-2 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl">
            <img className="rounded-full inline-block h-10 w-10 ring-2 ring-white" src={src} width={50} height={50}  />
            <p>{name}</p>
            <div className="absolute bottom-2 left-7 bg-green-700 h-3 w-3 rounded-full animate-bounce"></div>
        </div>
    )
}

export default Contact
