const express = require('express');
const url     = require('url');

const app  = express();
const port = process.env.PORT || '8000';

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

app.get('/', (req, res) => res.send('Hello Prove!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
