const { Schema, model } = require('mongoose');

const Group = require('../models/group');
const User = require('../models/user');

const GroupUserSchema = new Schema({
  createdAt: { type: Date, default: new Date() },
  groupId: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
  updatedAt: { type: Date, default: new Date() },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
});

module.exports = model('GroupUser', GroupUserSchema);