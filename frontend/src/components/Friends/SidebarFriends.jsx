import React from 'react'

const SidebarFriends = ({requests, deleteRequest, acceptFriendRequest}) => {
    function reject(id){
        deleteRequest(id)
    }
    return (
        <div className="bg-white py-5 pl-4 pr-0 md:pr-14 shadow-md h-screen overflow-y-auto">
            <div>
                <h1 className="flex sm:flex-nowrap text-2xl font-medium mb-2">Friends</h1>
            </div>
            <div className="mt-5">
                <h3 className="flex justify-start font-semibold">{requests.length} friend request</h3>
                {
                    requests.map(request => (
                        <div className="flex  mt-5">
                            <img src={request.userApplicantId.profilePhoto} alt="" className="h-12 w-12 rounded-full" />
                            <div className="ml-2">
                                <h4 className="font-semibold text-base">{request.userApplicantId.name} {request.userApplicantId.lastName}</h4>
                                <p className="font-normal text-gray-500 text-sm">Friend in common</p>
                                <div className="flex items-center">
                                    <button className="mt-2 group relative w-full py-1 px-3 mx-2 bg-blue-500 text-white font-bold rounded-md focus:outline-none" onClick={() => acceptFriendRequest(request._id, request.userApplicantId)}>Accept</button>
                                    <button className="mt-2 group relative w-full p-1 px-3 bg-gray-200 font-bold rounded-md focus:outline-none hover:bg-gray-300" onClick={() => reject(request._id)}>Reject</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default SidebarFriends
