const CRUDService = require('../services/CRUDService');

const getHomePage = async (req, res) => {
   return res.render('crud');
};

const postCRUD = async (req, res) => {
   try {
      await CRUDService.createNewUser(req.body);
      return res.redirect('/get-crud');
   } catch (e) {
      console.error(e);
      return res
         .status(400)
         .send('Create user failure: ' + e.message);
   }
};

const displayGetCRUD = async (req, res) => {
   const data = await CRUDService.getAllUsers();
   return res.render('users/findAllUser', { data });
};

const getEditCRUD = async (req, res) => {
   const userId = req.query.id;
   const user = await CRUDService.getUserById(userId);
   if (!user) return res.status(404).send('User not found');
   return res.render('users/updateUser', { user });
};

const putCRUD = async (req, res) => {
   try {
      await CRUDService.updateUserData(req.body);
      return res.redirect('/get-crud');
   } catch (e) {
      console.error(e);
      return res
         .status(400)
         .send('Update user failure: ' + e.message);
   }
};

const deleteCRUD = async (req, res) => {
   const id = req.query.id;
   await CRUDService.deleteUserById(id);
   return res.redirect('/get-crud');
};

module.exports = {
   getHomePage,
   postCRUD,
   displayGetCRUD,
   getEditCRUD,
   putCRUD,
   deleteCRUD,
};
