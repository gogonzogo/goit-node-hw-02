const router = require('express').Router();
const { contacts: ctrl } = require('../../controllers');
const { validation, ctrlWrapper } = require('../../middlewares');
const { joiSchema } = require('../../models/contacts')

router.route('/')
  .get(ctrlWrapper(ctrl.getAllContacts))
  .post(validation(joiSchema), ctrlWrapper(ctrl.addContact));
router.route('/:id')
  .get(ctrlWrapper(ctrl.getContactById))
  .delete(ctrlWrapper(ctrl.removeContact))
  .patch(ctrlWrapper(ctrl.updateContact))

module.exports = router
