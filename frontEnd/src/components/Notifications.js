import { message, Modal } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { DeleteNotification } from "../apicalls/notifications";
import { useDispatch } from "react-redux";
import { SetLoader } from "../redux/loadersSlice";
import Divider from "./Divider";

function Notifications({
  notifications = [],
  GetNotifcations,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        GetNotifcations();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={1000}
      closeIcon={<i class="ri-close-circle-fill text-black text-2xl mb-8"></i>}
      bodyStyle={{backgroundColor: "primary"}}
    >
      <div className="flex flex-col gap-2 bg-whiteLike rounded-2xl">
        <h1 className="text-secondary text-2xl m-4 mb-0">Notifications</h1>
        <Divider />
        {notifications.map((notification) => (
          <div
            className="m-2 flex flex-col p-3"
            key={notification._id}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
                className="cursor-pointer"
              >
                <h1 className="text-black py-1">{notification.title}</h1>
                <span className="text-gray-400 py-1">{notification.message}</span>
                <h1 className="text-gray-600 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </h1>
                <Divider />
              </div>
              <i
                className="ri-delete-bin-7-fill cursor-pointer mr-5"
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;