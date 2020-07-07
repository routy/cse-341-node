const express  = require('express');
const app      = express();
const url      = require('url');
const axios    = require('axios').default;

require('dotenv').config();

const port = process.env.PORT || '8001';
app.set("port", port);

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

// OMDB API URL
const api_url = '';

/**
 * GET /
 */
app.get('/', function(req, res) {
    res.render("index");
});

/**
 * GET /search?s={searchTerm}
 */
app.get('/search', function(req, res) {

    const searchTerm = req.query.s;

    if (!searchTerm) {
        res.json({ status: 'error', message: 'You must provide a string to search for.'});
    }

    axios.get(api_url + '...').then(function (response) {

        let data = [];

        if (response.data) {
            data = response.data
        }

        res.json({ status: 'success', data: data });
    });
});

/**
 * GET /details?id={id}
 */
app.get('/details', function(req, res) {

    const id = req.query.id;

    if (!id) {
        res.json({ status: 'error', message: 'You must provide an ID to search on.'});
    }

    axios.get(api_url + '...').then(function (response) {

        let data = [];

        if (response.data) {
            data = response.data
        }

        res.json({ status: 'success', data: data });
    });
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));