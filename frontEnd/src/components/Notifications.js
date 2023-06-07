import { Modal, notification } from "antd";
import React from "react";
import Divider from "../components/Divider"
function Notifications({
  notifications = [],
  reloadNotifictions,
  showNotifications,
  setShowNotifications,
}) {
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={600}
    >
        <div className="flex flex-col gap-2">
            {notifications.map((notification) => {
                <div className="flex gap-2 items-center border-solid p-2 flex-col">
                    <h1>
                        {notification.title}
                    </h1>
                    <Divider />
                    <span>
                        {notification.message}
                    </span>
                </div>
            })}
        </div>
    </Modal>
  );
}

export default Notifications;
