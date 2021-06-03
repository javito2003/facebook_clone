import React from 'react'
import InputBox from './InputBox'
import Posts from './Posts'

const Feed = ({user}) => {
    return (
        <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
                {/* <Stories /> */}
                <InputBox profilePhoto={user.profilePhoto} name={user.name} lastName={user.lastName} />
                <Posts  />
            </div>
        </div>
    )
}

export default Feed
