const contactsRouter = require('express').Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper, authorizeUser } = require('../../middlewares');
const { joiSchema } = require('../../models/contacts')

contactsRouter.route('/contacts')
  .get(authorizeUser, (req, res, next) => {
    const { page, limit, favorite } = req.query;
    if (favorite) {
      return ctrlWrapper(ctrl.getFavoriteContacts)(req, res, next);
    } else if (page && limit) {
      return ctrlWrapper(ctrl.getSomeContacts)(req, res, next);
    } else {
      return ctrlWrapper(ctrl.getAllContacts)(req, res, next);
    }
  })
  .post(authorizeUser, validation(joiSchema), ctrlWrapper(ctrl.addContact));
contactsRouter.route('/contacts/:id')
  .get(authorizeUser, ctrlWrapper(ctrl.getContactById))
  .delete(authorizeUser, ctrlWrapper(ctrl.removeContact))
  .put(authorizeUser, validation(joiSchema), ctrlWrapper(ctrl.updateContact));
contactsRouter.route('/contacts/:id/favorite')
  .patch(authorizeUser, ctrlWrapper(ctrl.updateContactFavorite));

module.exports = contactsRouter;
