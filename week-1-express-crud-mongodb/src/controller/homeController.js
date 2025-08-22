import db from '../models/index';
import CRUDService from '../services/CRUDService';

const getHomePage = (req, res) => {
   try {
      const data = CRUDService.getAllUsers();
      console.log(
         '_______________________________________________________________'
      );
      console.log(data);
      console.log(
         '_______________________________________________________________'
      );

      return res.render('homepage.ejs', {
         data: JSON.stringify(data),
      });
   } catch (error) {
      console.log(error);
   }
};

const getAboutPage = (req, res) => {
   return res.render('test/about.ejs');
};

const getCRUD = (req, res) => {
   return res.render('crud.ejs');
};

const getFindAllCRUD = (req, res) => {
   let users = CRUDService.getAllUsers();

   return res.render('user/findAllUsers.ejs', { datalist: users });
};

const postCRUD = (req, res) => {
   let message = CRUDService.createNewUser(req.body);
   console.log(message);
   return res.send('Post crud from server');
};

const getEditCRUD = (req, res) => {
   let userId = req.query.id;
   if (userId) {
      let user = CRUDService.getUserById(userId);

      return res.render('user/edit.ejs', {
         data: user,
      });
   } else {
      return res.send('wrong id');
   }
};

const getPutCRUD = async (req, res) => {
   let data = req.body;
   let message = await CRUDService.updateUserById(data);
   return res.render('users/findAllUser.ejs', {
      datalist: message,
   });
};

const getDeleteCRUD = async (req, res) => {
   let id = req.query.id;
   if (id) {
      await CRUDService.deleteUserById(id);
      return res.render('deleted');
   } else {
      return res.send('wrong id');
   }
};

module.exports = {
   getHomePage: getHomePage,
   getAboutPage: getAboutPage,
   getCRUD: getCRUD,
   getFindAllCRUD: getFindAllCRUD,
   postCRUD: postCRUD,
   getEditCRUD: getEditCRUD,
   getPutCRUD: getPutCRUD,
   getDeleteCRUD: getDeleteCRUD,
};
