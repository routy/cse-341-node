const express = require('express');
const url     = require('url');

const app  = express();
const port = process.env.PORT || '8000';

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.get('/', (req, res) => res.send('Hello Team!'));

app.get('/equate', (req, res) => {

    const parts = url.parse(req.url, true);
    const query = parts.query;
    let params = {};

    if ( query.method && ['add', 'subtract', 'multiply', 'divide'].includes(query.method) && !isNaN(parseFloat(query.num1)) && !isNaN(parseFloat(query.num2)) ) {
        if (query.method == 'add') {
            params.equation = parseFloat(query.num1) + ' + ' + parseFloat(query.num2) + ' = ' ;
            params.result   = parseFloat(query.num1) + parseFloat(query.num2);
        } else if (query.method == 'subtract') {
            params.equation = parseFloat(query.num1) + ' - ' + parseFloat(query.num2) + ' = ' ;
            params.result   = parseFloat(query.num1) - parseFloat(query.num2);
        } else if (query.method == 'multiply') {
            params.equation = parseFloat(query.num1) + ' * ' + parseFloat(query.num2) + ' = ' ;
            params.result   = parseFloat(query.num1) * parseFloat(query.num2);
        } else if (query.method == 'divide') {
            params.equation = parseFloat(query.num1) + ' / ' + parseFloat(query.num2) + ' = ' ;
            params.result   = parseFloat(query.num1) / parseFloat(query.num2);
        }
    }

    if(query.format && query.format === 'json') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(params));
    } else {
        res.setHeader('Content-Type', 'text/html');
        res.render("equation", params);
    }

    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
