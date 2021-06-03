const express = require("express");
const { checkAuth } = require("../middlewares/authentication");
const { createNotif } = require("../utils/notification");
const router = express.Router();
const FriendRequest = require("../models/friendRequest");
const Notification = require("../models/notification");
const User = require("../models/user");

router.post("/friendRequest", checkAuth, async (req, res) => {
  try {
    const userApplicantId = req.userData._id;
    const userDestinationId = req.body.userDestinationId;
    
    const findExistFriendRequest = await FriendRequest.findOne({userApplicantId: userApplicantId, userDestinationId: userDestinationId})
    if (findExistFriendRequest) {
        return res.status(500).json({
            status: "Error"
        })
    }
    const findUser = await User.findOne({_id: userDestinationId})
    console.log(findUser.friendsId);
    console.log(userApplicantId);
    const searchUser = findUser.friendsId.find(friend => friend == userApplicantId)
    if (searchUser) {
        return res.status(500).json({
            status: "Error",
            message: "Alerady is your friend"
        })
    }


    const description = `${req.userData.name} send you friend request`;
    const notifId = await createNotif(
      userDestinationId,
      description,
      "FriendRequest"
    );

    const toCreate = {
      userApplicantId: userApplicantId,
      userDestinationId: userDestinationId,
      time: Date.now(),
      notifId: notifId,
    };

    const createFriendRequest = await FriendRequest.create(toCreate);
    if (createFriendRequest) {
      return res.json({
        status: "Success",
        message: "Friend Request sended",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

router.get("/friendRequests", checkAuth, async (req, res) => {
  try {
    const userId = req.userData._id;
    const findUsers = await FriendRequest.find({
      userDestinationId: userId,
    }).populate("userApplicantId");
    if (findUsers) {
      return res.json({
        status: "success",
        data: findUsers,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

//DELETE request - delete friend request
router.delete("/friendrequest", checkAuth, async (req, res) => {
  try {
    const requestId = req.query.requestId;
    const findNotifId = await FriendRequest.findOne({ _id: requestId });
    const deleteRequest = await FriendRequest.findOneAndDelete({
      _id: requestId,
    });
    const deleteNotif = await Notification.findOneAndDelete({
      _id: findNotifId.notifId,
    });
    if (deleteRequest) {
      return res.json({
        status: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

//POST request - accept friend request
router.post("/acceptfriendrequest", checkAuth, async (req, res) => {
  try {
    const requestId = req.body.requestId;
    const dataRequest = await FriendRequest.findOne({ _id: requestId });

    const updateDestinationUser = await User.findOneAndUpdate(
      { _id: dataRequest.userDestinationId },
      { $push: { friendsId: dataRequest.userApplicantId } },
      { new: true, runValidators: true }
    );
    const updateApplicantUser = await User.findOneAndUpdate(
      { _id: dataRequest.userApplicantId },
      { $push: { friendsId: dataRequest.userDestinationId } },
      { new: true, runValidators: true }
    );
    if (updateDestinationUser && updateApplicantUser) {
      const deleteNotif = await Notification.findOneAndDelete({
        _id: dataRequest.notifId,
      });
      const deleteRequest = await FriendRequest.findOneAndDelete({
        _id: requestId,
      });
      return res.json({
        status: "success",
      });
    }
  } catch (error) {
      console.log(error);
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
});

module.exports = router;