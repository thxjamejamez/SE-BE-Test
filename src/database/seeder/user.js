const utils = require('../../helpers/utils');
const mongoDb = require('../mongo/index');
const GroupUser = require('../../models/groupUser');
const Group = require('../../models/group');
const User = require('../../models/user');
const groupUser = require('../../models/groupUser');

const groupsData = [
  {
    name: 'group 01',
    status: 'active',
    meta: {
      isPrivate: true
    }
  },
  {
    name: 'group 02',
    status: 'active'
  },
  {
    name: 'group 03',
    status: 'deleted'
  }
];

const usersData = [
  {
    username: 'user01',
    email: 'user01@mail.com'
  },
  {
    username: 'user02',
    email: 'user02@mail.com'
  },
  {
    username: 'user03',
    email: 'user03@mail.com'
  },
  {
    username: 'user04',
    email: 'user04@mail.com'
  },
  {
    username: 'user05',
    email: 'user05@mail.com'
  },
];

const seedDb = async () => {
  await mongoDb.connect();

  await GroupUser.deleteMany({});
  await Group.deleteMany({});
  await User.deleteMany({});

  const groups = await Group.insertMany(groupsData);
  const users = await User.insertMany(usersData);

  const groupIds = groups.map(group => group.id);
  const groupUsersData = users.map((user) => {
    return {
      userId: user.id,
      groupId: utils.sample(groupIds)
    }
  })

  await groupUser.insertMany(groupUsersData);
}

seedDb().then(() => {
  mongoDb.disconnect();
});



