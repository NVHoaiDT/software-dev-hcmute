import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let hashPasswordFromBcrypt = await hashUserPassword(
            data.password
         );
         await db.User.create({
            email: data.email,
            password: hashPasswordFromBcrypt,
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            phoneNumber: data.phoneNumber,
            gender: data.gender,
            roleId: data.roleId,
         });

         resolve('Create a new user succeed!');
      } catch (error) {
         console.log(error);
      }
   });
};

const hashUserPassword = (password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let hashPassword = await bcrypt.hashSync('B4c0//', salt);
         resolve(hashPassword);
      } catch (error) {
         reject(error);
      }
   });
};

const getAllUsers = () => {
   return new Promise(async (resolve, reject) => {
      try {
         let users = await db.User.findAll({
            raw: true,
         });
         resolve(users);
      } catch (error) {
         reject(error);
      }
   });
};

const getUserById = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: userId },
            raw: true,
         });
         if (user) {
            resolve(user);
         } else {
            resolve({});
         }
      } catch (error) {
         reject(error);
      }
   });
};

const updateUserById = (data) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: data.id },
         });
         if (user) {
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.address = data.address;
            await user.save();
            let allUsers = await db.User.findAll();
            resolve(allUsers);
         } else {
            resolve();
         }
      } catch (error) {
         reject(error);
      }
   });
};

const deleteUserById = (userId) => {
   return new Promise(async (resolve, reject) => {
      try {
         let user = await db.User.findOne({
            where: { id: userId },
         });
         if (user) {
            await user.destroy();
         }
         resolve();
      } catch (error) {
         reject(error);
      }
   });
};

module.exports = {
   createNewUser: createNewUser,
   getAllUsers: getAllUsers,
   getUserById: getUserById,
   updateUserById: updateUserById,
   deleteUserById: deleteUserById,
};
