const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const cookieParser = require('cookie-parser');

// to use session and passport for authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport');

// set-up cookie parser
app.use(cookieParser());
// below two lines is to tell server that we are using 
// layouts to render pages using express-ejs-layouts library
const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);

// middleware use to get the form data in req.body as an object
app.use(express.urlencoded());

// telling server that we are using static file and all are in assets folder
app.use(express.static('./assets'));
// to attach assets to individual redered file.
app.set('layout extractStyles' , true);
app.set('layout extractScripts' , true);



// setting up my view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name : 'codeial',
    secret : 'anythingForNow',
    cookie:{
        maxAge : (1000 * 30)
    },
    resave: false,
    saveUninitialized :false
}));

app.use(passport.initialize());
app.use(passport.session());

// we are using separate route folder to handle browser requets (url) hence imported it.
const route = require('./routes/index');
// Using middleware to sent browser request to route folder to handle it
app.use('/', route); // we can directly use "app.use('/', require('./routes/index'));"


app.listen(port, function (err) {
    if (err) {
        console.log(`Error while starting the server : ${err}`);
    }

    console.log(`Server is running on port : ${port}`);
})