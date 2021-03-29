const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const xss = require('xss-clean');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const rateLimit = require("express-rate-limit");

mongoose.connect('mongodb+srv://Magali-Valladier:Sopekocko@projet6.1xja1.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
// limit body size
app.use(express.json({limit: "10kb" }));

app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

//input sanitization against XXS attacks(helmet also does the same in this package)
app.use(xss());

//Set HTTP headers with helmet
app.use(helmet());

//sanatization against NoSql injections
app.use(mongoSanitize());

//limit several sessions in a shortime to avoid force's attacks
app.use(rateLimit());

module.exports = app;