const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const Notificaion = require("../models/notificationsModel");

// add a notification
router.post("/notify", authMiddleware, async (req, res) => {
  try {
    const newNotification = new Notificaion(req.body);
    await newNotification.save();
    res.send({
      success: true,
      message: "Notification added successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// get all notificaions by user
router.get("/get-all-notifications", authMiddleware, async (req, res) => {
  try {
    const notification = await Notificaion.find({
      user: req.body.userId,
    }).sort({ createdAt: -1 });
    res.send({
      success: true,
      data: notification,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// deleter a notificaion
router.delete("/delete-notificaion/:id", authMiddleware, async (req, res) => {
  try {
    await Notificaion.findByIdAndDelete(req.params.id);
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
    await Notificaion.updateMany(
      { user: req.body.userId, read: false },
      { $set: { read: true } }
    );
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});
module.exports = router;
