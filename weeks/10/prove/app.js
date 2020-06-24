const express  = require('express');
const axios    = require('axios').default;
const url      = require('url');

const app  = express();
const port = process.env.PORT || '8001';
const api_url = "https://www.themealdb.com/api/json/v1/1/";

app.set("port", port);
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

/**
 * GET /
 */
app.get('/', function(req, res) {

    axios.get(api_url + 'categories.php').then(function (response) {

        let data = [];

        if (response.data) {
            data = response.data.categories.sort((a, b) => (a.strCategory > b.strCategory) ? 1 : -1);
        }

        res.render("home", { categories: data });
    });

});

/**
 * GET /recipe?id={id}
 */
app.get('/recipe', function(req, res) {

    const id = req.query.id;

    if (!id) {
        res.json(formatErrorResponse('You must provide a recipe ID.'));
    }

    if (id) {
        axios.get(api_url + 'lookup.php?i=' + id).then(function( response ) {
            res.json(response.data.meal);
        });
    }
        
});

/**
 * GET /search
 * @param keyword string
 * @param category string
 */
app.get('/search', function(req, res) {

    const keyword  = req.query.keyword;
    const category = req.query.category;

    if (!keyword && !category) {
        res.json(formatErrorResponse('You must provide either a keyword or category to filter recipes by.'));
    }

    let requestUrl = 'filter.php?c=' + category;

    if (keyword) {
        let requestUrl = 'search.php?s=' + keyword;
    }

    axios.get(api_url + requestUrl).then(function (response) {
        res.json(response.data.meals);
    })
    .catch(function (error) {
        res.json(formatErrorResponse('An error has occurred with your request.'));
    });
        
});

/**
 * returnError
 * Return an error as a response to a request.
 * 
 * @param {string} message 
 */
function formatErrorResponse(message) {
    return {
        status: 'error',
        message
    };
}

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));