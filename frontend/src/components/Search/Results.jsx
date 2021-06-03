import React, { useState } from "react";
import { ChatIcon, UserAddIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import axios from "axios";
import socket from "../../utils/ws";

const Results = ({ query, userDB }) => {
  const token = useSelector((store) => store.user.user.token);
  const user = useSelector((store) => store.user.user.userData);
  const [users, setUsers] = useState([]);
  function getData() {
    let config = {
      headers: {
        token: token,
      },
      params: {
        name: query,
      },
    };
    axios
      .post("/search", null, config)
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
  function sendFriendRequest(_id) {
    let config = {
      headers: {
        token: token,
      },
    };
    axios
      .post("/friendRequest", { userDestinationId: _id }, config)
      .then((res) => {
        console.log(res.data);
        const toSend = {
          _id: _id,
          name: user.name,
        };
        socket.emit("request", toSend);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  React.useEffect(() => {
    if (query) {
      getData();
    }
  }, []);
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
      <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
        <div className="bg-white p-2 rounded-xl shadow-md">
          <h1 className="text-2xl font-semibold">Results</h1>
          <div className="mt-5">
            {users.length > 0 &&
              users.map((user) => (
                <div
                  className="mx-2 flex justify-between items-center mb-5"
                  key={user.objectID}
                >
                  <div className="flex items-center">
                    <img
                      src={user.profilePhoto}
                      alt=""
                      className="w-20 h-20 rounded-full "
                    />
                    <div className="mx-2 ">
                      <h3>
                        {user.name} {user.lastName}
                      </h3>
                      <p className="text-sm text-gray-500 m">Amigos en comun</p>
                    </div>
                  </div>
                  <div>
                    {
                      <>
                        {userDB !== null &&
                          userDB.friendsId.find(
                            (item) => item._id === user.objectID
                          ) ? (
                            <ChatIcon className="p-2 h-10 w-10 bg-gray-200 rounded-full text-gray-700 cursor-pointer hover:bg-gray-300" />
                          ) : (
                            <UserAddIcon
                              onClick={() => sendFriendRequest(user.objectID)}
                              className="p-2 h-10 w-10 bg-gray-200 rounded-full text-gray-700 cursor-pointer hover:bg-gray-300"
                            />
                        )}
                      </>
                    }
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
