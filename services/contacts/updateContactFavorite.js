const { Contact } = require('../../models');

const updateContactFavorite = async (req) => {
  try {
    const { favorite } = req.body
    if (!favorite) {
      return 'no favorite'
    }
    const data = await Contact.findOneAndUpdate(
      { _id: req.params.id, owner: req.session.userId },
      { $set: req.body },
      { new: true }
    );
    return data;
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = updateContactFavorite;
