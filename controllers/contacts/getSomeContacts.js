const { contacts: service } = require('../../services');

const getSomeContacts = async (req, res) => {
  const result = await service.getSomeContacts(req);
  if (result === 'no contacts') {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      data: {
        message: 'No contacts found, please add contacts.',
      }
    })
    return;
  }
  if (result === 'exceeded') {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      data: {
        message: 'Page query exceeds the possible number of pages.',
      }
    })
    return;
  }
  res.status(200).json({
    status: "Success",
    code: 200,
    page: {
      number: result.page,
      limit: result.limit,
      totalContacts: result.totalContacts,
    },
    data: {
      contacts: result.contacts,
    }
  });
}

module.exports = getSomeContacts;