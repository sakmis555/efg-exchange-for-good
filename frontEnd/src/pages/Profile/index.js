import { Tabs } from "antd";
import React from "react";
import Products from "./Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";

function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key={"1"}>
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key={"2"}>
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key={"3"}>
          <div className="flex flex-col w-1/3 gap-3 m-5">
            <span className="text-gray-400 flex text-2xl justify-between">
              Name: <span className="text-black text-2xl">{user.name}</span>
            </span>
            <span className="text-gray-400 flex text-2xl justify-between">
              Email: <span className="text-black text-2xl">{user.email}</span>
            </span>
            <span className="text-gray-400 flex text-2xl justify-between">
              Created At: <span className="text-black text-2xl">{moment(user.createdAt).format("MMMM D, YYYY  hh:MM A")}</span>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
