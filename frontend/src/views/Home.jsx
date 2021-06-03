import React from "react";
import { useSelector } from "react-redux";
import Feed from "../components/Feed/Feed";
import Sidebar from "../components/Sidebar/Sidebar";
import Widgets from "../components/Widgets/Widgets";
import Header from '../components/Home/Header'

const Home = () => {
  const user = useSelector((store) => store.user.user.userData);
  const userDB = useSelector(store => store.userDB.userDB)
  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
        <Header />
      <div className="flex">
        <Sidebar src={user.profilePhoto} name={user.name} />
        <Feed user={user} />
        <Widgets userDB={userDB} />
      </div>
    </div>
  );
};

export default Home;
