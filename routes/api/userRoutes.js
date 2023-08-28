const userRouter = require('./contactsRoutes');
const { user: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authorizeUser, upload } = require('../../middlewares');
const { joiUserSchema, subscriptionSchema } = require('../../models')

userRouter.route('/users/signup').post(validation(joiUserSchema), ctrlWrapper(ctrl.userSignup));
userRouter.route('/users/login').post(ctrlWrapper(ctrl.userLogin));
userRouter.route('/users/logout').post(authorizeUser, ctrlWrapper(ctrl.userLogout));
userRouter.route('/users/current').get(authorizeUser, ctrlWrapper(ctrl.userCurrent));
userRouter.route('/users')
  .patch(authorizeUser, validation(subscriptionSchema), ctrlWrapper(ctrl.userSubscriptionUpdate));
userRouter.route('/users/avatars')
  .patch(authorizeUser, upload.single("avatar"), ctrlWrapper(ctrl.userAvatarUpdate));
userRouter.route('/users/verify/:verificationToken').get(ctrlWrapper(ctrl.userEmailVerified));
userRouter.route('/users/verify').post(ctrlWrapper(ctrl.userVerify));

module.exports = userRouter;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         