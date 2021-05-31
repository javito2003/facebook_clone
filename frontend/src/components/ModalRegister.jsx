import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from 'axios'
import EventEmitter from "../utils/EventEmitter";

export default function ModalRegister() {
  const [open, setOpen] = useState(true);
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [gender, setGender] = useState('')

  const cancelButtonRef = useRef(null);

  function login(e){
    e.preventDefault()
    const toCreate = {
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      gender: gender
    }
    
    axios.post("/register", toCreate)
    .then(res => {
      if (res.data.status === 'success') {
        setName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setGender('')
        setOpen(false)
        const toSend = {Alert: "Success", message: "Now you can login..."}
        EventEmitter.emit("register", toSend )
      }
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div></div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="border-b">
                      <Dialog.Title
                        as="h3"
                        className="text-3xl leading-6 font-medium text-gray-900"
                      >
                        Register now
                      </Dialog.Title>
                      <p className="text-gray-600 mt-2 mb-2">
                        Fast and simple{" "}
                      </p>
                    </div>

                    <div className="mt-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 grid-rows-1 sm:grid-rows-2 gap-2">
                        <input
                          type="name"
                          className="border border-gray-300 p-1 pl-2 rounded-md bg-gray-100 focus:outline-none"
                          placeholder="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          type="name"
                          className="border border-gray-300 p-1 pl-2 rounded-md bg-gray-100 focus:outline-none"
                          placeholder="Last name"
                          onChange={e => setLastName(e.target.value)}
                        />
                        <input
                          type="email"
                          className="border border-gray-300 p-1 pl-2 rounded-md bg-gray-100 focus:outline-none col-span-1 sm:col-span-2"
                          placeholder="Email Address"
                          onChange={e => setEmail(e.target.value)}
                        />
                        <input
                          type="password"
                          className="border border-gray-300 p-1 pl-2 rounded-md bg-gray-100 focus:outline-none col-span-1 sm:col-span-2"
                          placeholder="Password"
                          onChange={e => setPassword(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-3 grid-rows-1 sm:grid-rows-1 mt-5 gap-2" onChange={e => setGender(e.target.value)}>
                        <div className="flex items-center border p-2">
                          <label
                            className="ml-3 block text-sm font-medium text-gray-700 mr-2"
                          >
                            Male
                          </label>
                          <input value="Male" type="radio" name="Male" checked={gender === 'Male'}/>
                        </div>
                        <div className="flex items-center border">
                          <label
                            className="ml-3 block text-sm font-medium text-gray-700 mr-2"
                            
                          >
                            Female
                          </label>
                          <input type="radio" value="Female" name="Female" checked={gender === 'Female'} />
                        </div>
                        <div className="flex items-center border">
                          <label htmlFor="Alien" className="ml-3 block text-sm font-medium text-gray-700 mr-2">
                            Alien
                          </label>
                          <input
                            type="radio"
                            className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
                            value="Alien"
                            checked={gender === "Alien"}
                            name="Alien"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:justify-center sm:items-center">
                <button onClick={login} className="py-2 bg-lime-500 px-5 text-white font-semibold rounded-md w-full">
                  Register
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
