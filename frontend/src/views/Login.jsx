import axios from "axios";
import React, { useState } from "react";
import ModalRegister from "../components/ModalRegister";
import Notification from "../components/Notification";
import EventEmitter from "../utils/EventEmitter";
import verifUser from "../utils/verifUser";
import {withRouter} from 'react-router-dom'

const Login = (props) => {
  const [register, setRegister] = useState(false);
  const [viewNotif, setViewNotif] = useState(false);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dataNotif, setDataNorif] = useState({})
  
  function reciveData(data) {
    setDataNorif(data)
    setViewNotif(true)
    setTimeout(() => {
      setViewNotif(false)
    }, 2000)
  }

  function login(e){
    e.preventDefault()
    let toSend = {
      email: email,
      password: password
    }
    axios.post("/login", toSend)
    .then(res => {
      if (res.data.status === 'success') {
        const toSend = {
          userData: res.data.data.userData,
          token: res.data.data.token
        }
        const notif = {
          Alert: 'Success',
          message: "Login Successfully..!"
        }
        reciveData(notif)
        localStorage.setItem('auth', JSON.stringify(toSend))
        setTimeout(() => {
          window.location.reload()
        }, 2000)
      }
    })
    .catch(err => {
      console.log(err.response);
    })
  }

  React.useEffect(() => {
    const verif = verifUser()
    console.log(verif);
    if (verif === true) {
      props.history.push('/')
    }
    const listener = EventEmitter.addListener("register", (...args) => {
      let message = args
      reciveData(message[0])

    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <div className="static">
      <div className="absolute right-0 top-0">
        {viewNotif && <Notification title={dataNotif.Alert} message={dataNotif.message} />}
      </div>
      <div className="min-h-screen flex items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex">
          <div className="max-w-md">
            <img
              src="https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg"
              width={300}
              className="-ml-7"
            />
            <p className="text-2xl">
              Facebook te ayuda a comunicarte y compartir con las personas que
              forman parte de tu vida.
            </p>
          </div>
          <div>
            <div className="max-h-screen rounded-lg bg-white py-5 px-4 sm:px-6 lg:px-20 border border-gray-300">
              <div className="min-w-md w-full space-y-8">
                <form onSubmit={login} className="space-y-6">
                  <div className="rounded-md shadow-sm -space-y-px">
                    <input
                      type="email"
                      placeholder="Email Address"
                      onChange={e => setEmail(e.target.value)}
                      className="appearance-none rounded-lg relative block w-full px-5 py-3 mb-5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                    <input
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Email Address"
                      className="appearance-none rounded-lg relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    />
                  </div>
                  <div className="border-b border-gray-300">
                    <button
                      type="submit"
                      className="group relative w-full p-3 bg-blue-500 font-bold text-white rounded-xl mb-5 focus:outline-none"
                    >
                      Log In
                    </button>
                    <a
                      href="#"
                      className="text-blue-500 font- flex items-center justify-center hover:underline"
                    >
                      Forget your password?
                    </a>
                  </div>
                </form>
                <div className="">
                  <button
                    className="bg-lime-500 p-3 w-full rounded-lg group font-bold text-white focus:outline-none"
                    onClick={() => setRegister(!register)}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {register && <ModalRegister />}
      </div>
    </div>
  );
};

export default withRouter(Login);
