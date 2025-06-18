const express = require('express');
const app = express();
const path = require('path');
const config = require('./env.json');
const routes = require('./routes/route');
const { SendBirthdayWishesForAadharUsers } = require('./routes/cronServices');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);
SendBirthdayWishesForAadharUsers();

app.listen(config.PORT, () => {
  console.log(`Server running at http://localhost:${config.PORT}`);
});