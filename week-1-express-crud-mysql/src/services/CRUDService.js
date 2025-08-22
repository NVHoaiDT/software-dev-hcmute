const { User } = require('../models');

const createNewUser = async (data) => {
  const { firstName, lastName, email, address, gender } = data;
  return await User.create({ firstName, lastName, email, address, gender });
};

const getAllUsers = async () => {
  return await User.findAll({ order: [['id', 'DESC']] });
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

const updateUserData = async (data) => {
  const user = await User.findByPk(data.id);
  if (!user) return null;
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.email = data.email;
  user.address = data.address;
  user.gender = data.gender || user.gender;
  await user.save();
  return user;
};

const deleteUserById = async (id) => {
  return await User.destroy({ where: { id } });
};

module.exports = {
  createNewUser,
  getAllUsers,
  getUserById,
  updateUserData,
  deleteUserById
};
