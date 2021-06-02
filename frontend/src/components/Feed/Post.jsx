import React from 'react'
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline'

const Post = ({ name, message, image, email, timestamp, postImage }) => {
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-md">
                <div className="flex items-center space-x-2">
                    <img src={image} className="rounded-full" width={30} height={30} alt=""/>
                    <div>
                        <p className="font-medium">{name}</p>
                        <p className="text-xs text-gray-400">
                            {timestamp}
                        </p>
                    </div>
                </div>
                <p className="pt-4">{message}</p>
            </div>
            {
                postImage && (
                    <div className="flex justify-center h-56 md:h-96 bg-white">
                        <img src={postImage} alt=""  className="mb-4" width={400}  />
                    </div>
                )
            }

            <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ThumbUpIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Like</p>
                </div>
                <div className="inputIcon rounded-none">
                    <ChatAltIcon className="h-4"/>
                    <p className="text-xs sm:text-base">Comment</p>
                </div>
                <div className="inputIcon rounded-none rounded-bl-2xl">
                    <ShareIcon className="h-4" />
                    <p className="text-xs sm:text-base">Share</p>
                </div>
            </div>
        </div>
    )
}

export default Post
