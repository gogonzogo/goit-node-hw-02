const router = require('express').Router();
const { contacts: ctrl } = require('../../controllers');
const { ctrlWrapper } = require('../../middlewares');

router.route('/').get(ctrlWrapper(ctrl.getAllContacts)).post(ctrlWrapper(ctrl.addContact));
router.route('/:id')
.get(ctrlWrapper(ctrl.getContactById))
.delete(ctrlWrapper(ctrl.removeContact))
.patch(ctrlWrapper(ctrl.updateContact))

module.exports = router
