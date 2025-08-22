require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./src/models');
const webRoutes = require('./src/route/web');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', webRoutes);

async function start() {
   try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
      app.listen(PORT, () => {
         console.log(`Server is running at http://localhost:${PORT}`);
      });
   } catch (err) {
      console.error('Unable to connect to the database:', err);
      process.exit(1);
   }
}

start();
