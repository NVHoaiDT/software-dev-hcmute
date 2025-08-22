import express from 'express';
import homeController from '../controller/homeController';

let router = express.Router();

let initWebRoutes = (app) => {
   router.get('/', (req, res) => {
      return res.send('Hello Express');
   });

   router.get('/home', homeController.getHomePage);
   router.get('/about', homeController.getAboutPage);
   router.get('/crud', homeController.getCRUD);
   router.get('/post-crud', homeController.postCRUD);
   router.get('/find-crud', homeController.getFindAllCRUD);
   router.get('/edit-crud', homeController.getEditCRUD);
   router.get('/delete-crud', homeController.getDeleteCRUD);
   router.get('/put-crud', homeController.getPutCRUD);

   return app.use('/', router);
};

module.exports = initWebRoutes;
