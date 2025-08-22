import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
   'database_development',
   'root',
   '1234',
   {
      host: 'localhost',
      dialect: 'mysql',
      logging: false,
   }
);

const dbConnection = async () => {
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
   } catch (error) {
      console.error('Unable to connect to the database:', error);
   }
};

export default dbConnection;
