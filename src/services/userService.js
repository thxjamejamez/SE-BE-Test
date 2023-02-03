const User = require('../models/user');

exports.getAll = async () => {
  return await User
    .aggregate()
    .lookup({
      from: 'groupusers',
      localField: '_id',
      foreignField: 'userId',
      as: 'groups'
    })
    .lookup({
      from: 'groups',
      localField: 'groups.groupId',
      foreignField: '_id',
      as: 'groups'
    })
    .sort({
      'groups.name': 1,
      'username': 1,
    });
}

exports.updateUsernameFirstLetterToUpperCase = async () => {
  const users = await User.find();

  await Promise.all(users.map(async (user) => {
    const username = user.username.charAt(0).toUpperCase() + user.username.slice(1);

    return await User.findByIdAndUpdate(user._id, {
      $set: {
        username: username
      }
    })
  }));
}