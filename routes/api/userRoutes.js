const userRouter = require('./contactsRoutes');
const { user: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authorizeUser } = require('../../middlewares');
const { joiUserSchema, subscriptionSchema } = require('../../models/user')

userRouter.route('/users/signup').post(validation(joiUserSchema), ctrlWrapper(ctrl.userSignup));
userRouter.route('/users/login').post(ctrlWrapper(ctrl.userLogin))
userRouter.route('/users/logout').post(authorizeUser, ctrlWrapper(ctrl.userLogout))
userRouter.route('/users/current').post(authorizeUser, ctrlWrapper(ctrl.userCurrent))
userRouter.route('/users/subscription')
  .patch(authorizeUser, validation(subscriptionSchema), ctrlWrapper(ctrl.userSubscriptionUpdate));

module.exports = userRouter;
