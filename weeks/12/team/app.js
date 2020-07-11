const express  = require('express');
const app      = express();
const url      = require('url');
var session    = require('express-session');
const bcrypt   = require('bcrypt');
const { Pool } = require("pg");
var FileStore  = require('session-file-store')(session);

require('dotenv').config();

/**
 * Setup the session store
 */
app.use(session({
  name: 'server-session-cookie-id',
  secret: 'SDfimf3409masdc0923imasdfmp',
  saveUninitialized: true,
  resave: true,
  store: new FileStore()
}));

/**
 * Create a logger middleware
 */

var logRequest = function (req, res, next) {
    console.log("Received a request for: " + req.url);
    next();
}
app.use(logRequest);

var verifyLogin = function (req, res, next) {
    if(req.session && req.session.username) {
        console.log("Session exists, continue.");
        next();
    } else {
        res.status(401);
        res.json({ success: false, message: 'unauthorized'});
    }    
}

const port = process.env.PORT || '8005';
app.set("port", port);

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

/**
 * Parse the passed POST parameters
 */
app.use(express.urlencoded({
    extended: true
}));

/**
 * Setup the Pool
 */
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

/**
 * GET /
 */
app.get('/', function(req, res) {
    res.render("index");
});

/**
 * Login
 */
app.post('/login', async function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    let status = false;

    const users = [
        { userId: 1, username: 'admin1', password: await bcrypt.hash( 'password1', 4 ) },
        { userId: 2, username: 'admin2', password: await bcrypt.hash( 'password2', 4 ) },
        { userId: 3, username: 'admin3', password: await bcrypt.hash( 'password3', 4 ) },
        { userId: 4, username: 'admin4', password: await bcrypt.hash( 'password4', 4 ) } 
    ];

    let user = users.find(function( user ) {
        return (user.username === username && bcrypt.compare(password, user.password));
    });

    if (user) {
        req.session.username = username;
        status = true;
    }

    res.json({ success: status });

});

/**
 * logout
 */
app.post('/logout', function(req, res) {
    if (req.session && req.session.username) {
        delete req.session.username;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

/**
 * getServerTime
 */
app.get('/getServerTime', verifyLogin, function(req, res) {
    var time = new Date();
    res.json({ success: true, time });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));