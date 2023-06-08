const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Notification = require("../models/notificationsModel");

// add a notification
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    // console.log("Before try execution")
    const newNotification = new Notification(req.body);
    // console.log(newNotification);
    await newNotification.save();
    
    res.send({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    // console.log("notification route catch block executed");
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all notifications by user
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// deleter a notificaion
router.delete("/delete-notification/:id", authMiddleware, async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id)
    res.send({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// read all notifications
router.put("/read-all-notifications", authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
    res.send({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
