const { contacts: service } = require('../../services');

const updateContactFavorite = async (req, res) => {
  const result = await service.updateContactFavorite(req);
  if (result === 'no favorite') {
    res.status(400).json({
      status: 'Bad Request',
      code: 400,
      data: {
        message: `Favorite missing from body.`,
        result,
      },
    });
    return;
  }
  if (result === null) {
    res.status(404).json({
      status: 'Not Found',
      code: 404,
      data: {
        message: `Contact ${req.params.id} does not exist in your contacts.`,
      },
    });
    return;
  }
  res.status(200).json({
    status: 'Success',
    code: 200,
    data: {
      message: `Contact ${req.params.id} updated!`,
      result,
    },
  });
};

module.exports = updateContactFavorite;

