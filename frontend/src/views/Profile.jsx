import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Header from "../components/Home/Header";
import PostsProfile from "../components/profile/PostsProfile";
import SidebarProfile from "../components/profile/SidebarProfile";
import UserAvatar from "../components/profile/UserAvatar";

const Profile = () => {
  const { id } = useParams();
  const token = useSelector((store) => store.user.user.token);
  const [user, setUser] = useState({});
  function getUser() {
    let config = {
      headers: {
        token: token,
      },
      params: {
        userId: id,
      },
    };
    axios
      .get("/user", config)
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <div className="h-screen bg-gray-100 ">
      <Header />
      <div className="container mx-auto flex justify-center w-full overflow-x-hidden">
        <div>
          <UserAvatar user={user} />
          <div className="lg:flex justify-center mt-10">
            {/* <SidebarProfile />
            <PostsProfile /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
