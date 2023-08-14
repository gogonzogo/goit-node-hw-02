const { User } = require('../../models');

const userSubscriptionUpdate = async (req) => {
  try {
    const user = req.session.userId;
    const updatedSubscription = await User.findOneAndUpdate(
      { _id: user },
      { $set: req.body },
      { new: true }
    )
      .select('-password -createdAt -updatedAt -_id');
    return updatedSubscription;
  } catch (error) {
    console.log(error);
  };
};

module.exports = userSubscriptionUpdate;