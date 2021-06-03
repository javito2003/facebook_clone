import React, { useState, Fragment } from "react";
import {
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  HomeIcon,
  UserGroupIcon,
  ViewGridIcon,
  AnnotationIcon,
  LogoutIcon,
  UserAddIcon,
} from "@heroicons/react/solid";
import {
  FlagIcon,
  PlayIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import HeaderIcon from "./HeaderIcon";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Transition } from "@headlessui/react";
import { Link, NavLink, useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import { getNotifications } from "../../redux/notifDucks";

const Header = (props) => {
  const token = useSelector((store) => store.user.user.token);
  const user = useSelector((store) => store.user.user.userData);
  const notifications = useSelector(
    (store) => store.notifications.notifications
  );
  const dispatch = useDispatch()
  const [search, setSearch] = useState("");

  function LogOut() {
    if (localStorage.getItem("auth")) {
      localStorage.removeItem("auth");
      window.location.reload();
    }
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function onSearch(e) {
    e.preventDefault();
    if (!search.trim()) {
      return;
    }
    props.history.push({
      pathname: "/search",
      search: `?name=${search}`,
    });
  }

  function readNotification(id, type) {
    let config = {
      headers: {
        token: token,
      },
      params: {
        notifId: id,
      },
    };
    axios.put("/readnotification", null, config)
    .then(res => {
      if (res.data.status === 'success') {
        dispatch(getNotifications())
        if (type === "FriendRequest") {
          props.history.push("/friends");
        }
      }
    })
    .catch(err => console.log(err.response))
    
  }

  const { pathname } = useLocation();

  return (
    <div className="sticky top-0 z-50 bg-white flex items-center  p-2 lg:px-5 shadow-md">
      {/*LEFT*/}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://links.papareact.com/5me"
            alt=""
            width={40}
            height={40}
          />
        </Link>
        <form
          onSubmit={onSearch}
          className="flex ml-2 items-center rounded-full bg-gray-100 p-2"
        >
          <SearchIcon className="h-6 text-gray-600" />
          <input
            type="text"
            className="hidden md:inline-flex flex-shrink ml-2 items-center bg-transparent outline-none placeholder-gray-500"
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Facebook"
          />
          <button hidden type="submit">
            Submit
          </button>
        </form>
      </div>
      {/*CENTER*/}
      <div className="flex justify-center flex-grow">
        <div className="flex lg:space-x-6 space-x-4">
          <NavLink to="/">
            {pathname === "/" ? (
              <HeaderIcon Icon={HomeIcon} active />
            ) : (
              <HeaderIcon Icon={HomeIcon} />
            )}
          </NavLink>
          <HeaderIcon Icon={FlagIcon} />
          <HeaderIcon Icon={PlayIcon} />
          <HeaderIcon Icon={ShoppingCartIcon} />
          <HeaderIcon Icon={UserGroupIcon} />
        </div>
      </div>

      {/*RIGHT*/}
      <div className="flex items-center sm:space-x-2 justify-end ">
        {pathname === `/profile/${user._id}` ? (
          <div className="flex items-center cursor-pointer bg-blue-100 p-1 rounded-full">
            <img
              className="rounded-full cursor-pointer h-8 w-8 mr-2"
              src={user.profilePhoto}
              alt=""
            />
            <p className="whitespace-nowrap font-semibold pr-3 hidden text-blue-500 md:inline-flex">
              {user.name}
            </p>
          </div>
        ) : (
          <Link
            to={`/profile/${user._id}`}
            className="flex items-center cursor-pointer hover:bg-gray-200 p-1 rounded-lg"
          >
            <img
              className="rounded-full cursor-pointer h-10 w-10 mr-2"
              src={user.profilePhoto}
              alt=""
            />
            <p className="whitespace-nowrap font-semibold pr-3 hidden md:inline-flex">
              {user.name}
            </p>
          </Link>
        )}

        <ViewGridIcon className="icon" />
        <ChatIcon className="icon" />
        <Menu as="div" className="relative inline-block">
          {({ open }) => (
            <>
              <div>
                <Menu.Button className="focus:outline-none">
                  <BellIcon className="icon fill-current" />
                  {notifications.length > 0 && (
                    <span class="absolute hidden lg:inline-flex top-0 right-0  items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {notifications.length}
                    </span>
                  )}
                </Menu.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {notifications.map((notif) => (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <div>
                                  <div
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "px-4 py-2 text-sm flex items-center cursor-pointer"
                                    )}
                                    onClick={() =>
                                      readNotification(notif._id, notif.type)
                                    }
                                    key={notif._id}
                                  >
                                    {notif.type === "FriendRequest" && (
                                      <UserAddIcon className="h-7" />
                                    )}
                                    <p>{notif.description}</p>
                                  </div>
                              </div>
                            )}
                          </Menu.Item>
                        </>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </>
          )}
        </Menu>
        <Menu as="div" className="relative inline-block">
          {({ open }) => (
            <>
              <div>
                <div>
                  <Menu.Button className="focus:outline-none">
                    <ChevronDownIcon className="icon" />
                  </Menu.Button>
                </div>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items
                    static
                    className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm border-b"
                            )}
                          >
                            <div className="flex items-center">
                              <img
                                src={user.profilePhoto}
                                className="h-10 w-10 rounded-full"
                                alt=""
                              />
                              <div className="ml-3">
                                <p className="font-bold">
                                  {user.name} {user.lastName}
                                </p>
                                <p className="font-normal text-gray-600">
                                  See profile
                                </p>
                              </div>
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            <div className="flex border-b">
                              <AnnotationIcon className="p-2 h-9 bg-gray-200 rounded-full" />
                              <div className="ml-3 mb-2">
                                <p className="font-semibold">Send Comments</p>
                                <p className="font-light text-xs">
                                  Help us to to get better the page
                                </p>
                              </div>
                            </div>
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={LogOut}
                            className={classNames(
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700",
                              "block w-full text-left px-4 py-2 text-sm"
                            )}
                          >
                            <div className="flex items-center">
                              <LogoutIcon className="p-2 h-8 bg-gray-200 rounded-full" />
                              <p className="font-semibold ml-3">LogOut</p>
                            </div>
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </>
          )}
        </Menu>
      </div>
    </div>
  );
};

export default withRouter(Header);
