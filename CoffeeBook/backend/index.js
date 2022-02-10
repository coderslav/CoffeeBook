const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');

const app = express();

// Specifier le répertoire pour les fichiers static : .css, .js, .jpg, ...
app.use(express.static('public'));

// ajouter les middleware pour la lecture des cookies et du corps des requetes post
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('secret'));

// use router files 
app.use("/", indexRouter);

// start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`CoffeeBook running on ${process.env.PORT || 3000}`)
});
    

