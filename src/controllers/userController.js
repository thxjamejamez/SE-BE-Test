var { Parser } = require('json2csv');

const userService = require('../services/userService');
const userTransform = require('../transforms/userTransform');

exports.update = async (req, res) => {
  await userService.updateUsernameFirstLetterToUpperCase();

  res.status(200).json('User updated.')
}

exports.exportToCsv = async (req, res) => {
  const users = await userService.getAll();
  const userTransformed = users.map((user) => {
    return userTransform.transformForExportToCsv(user);
  });

  const fields = [{
    label: 'Group Name',
    value: 'groupName'
  }, {
    label: 'Username',
    value: 'username'
  }, {
    label: 'Email',
    value: 'email'
  }];

  const json2csv = new Parser({ fields: fields })

  try {
    const csv = json2csv.parse(userTransformed)
    res.attachment('users.csv')
    res.status(200).send(csv)
  } catch (error) {
    console.log('error:', error.message)
    res.status(500).send(error.message)
  }
};