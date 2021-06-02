import React,{ useRef, useState } from 'react'
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";

const InputBox = ({profilePhoto, name, lastName}) => {
  const inputRef = useRef(null);
  const inputFileRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);

  function addImage(e) {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
  }

  const removeImage = () => {
    setImageToPost(null);
  };
    return (
        <div className="bg-white p-4 rounded-2xl shadow-md text-gray-500 font-medium">
            <div className="flex space-x-4 pd-4 items-center mb-5">
                <img src={profilePhoto} className="rounded-full cursor-pointer h-10 w-10 mr-2" />
                <form className="flex flex-1">
                    <input type="text" ref={inputRef} className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none" placeholder={`What's on your mind, ${name} ${lastName}`} />
                    <button hidden type='submit'>
                        Submit
                    </button>
                </form>
                {
                    imageToPost && (
                        <div onClick={removeImage} className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer">
                            <img src={imageToPost} alt="" className="h-10 object-contain" />
                            <p className="text-xs text-red-500 text-center">Remove</p>
                        </div>
                    )
                }
            </div>
            <div className="flex justify-evenly p-2 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live video</p>
                </div>
                <div className="inputIcon" onClick={() => inputFileRef.current.click()}>
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input type="file" hidden ref={inputFileRef} onChange={addImage} />
                </div>
                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    )
}

export default InputBox
