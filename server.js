const express = require('express');
const db = require('./config/contactsConfig');
const routes = require('./routes/api/contactsRoutes');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api/contacts', routes);

db.once('open', () => {
  try {
    app.listen(PORT, () => {
      console.log("Database connection successful");
    });
  } catch (error) {
    console.log(error)
  }
});