const express  = require('express');
const app      = express();
const url      = require('url');
const { Pool } = require("pg");

const port = process.env.PORT || '8001';
app.set("port", port);

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");

const connectionString = process.env.DATABASE_URL || "postgres://pnypfzkiufxryf:ddc168edc6ac0d12c920821ef579765779177a2bbfb1c2dc6545607783260802@ec2-52-0-155-79.compute-1.amazonaws.com:5432/d4vs8506c8a7t1";
const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

/**
 * GET /
 */
app.get('/', (req, res) => res.render("relationships") );

/**
 * GET getPerson
 */
app.get('/getPerson', function(req, res) {

    /*
    res.send([{
        'id': 1,
        'first_name': 'John',
        'last_name': 'Smith',
        'birthdate': '2000-01-01'
    }]);
    res.end();
    */
   
   const id = req.query.id;

   console.log("Getting person from DB with id: " + id);

   const sql = 'SELECT * FROM person WHERE id = $1::int';

   const params = [id];

    pool.query(sql, params, function(err, result) {
		
		if (err) {
			console.log("Error in query: ")
			console.log(err);
        }
        
        console.log("Found result: " + JSON.stringify(result.rows));

        res.send(result.rows);
        
    });
    
});

/**
 * GET getParents
 */
app.get('/getParents', function(req, res) { 

    const id = req.query.id;
    /*
    res.send([
        {
            'id': 1,
            'first_name': 'John',
            'last_name': 'Smith',
            'birthdate': '2000-01-01'
        },
        {
            'id': 2,
            'first_name': 'Jane',
            'last_name': 'Smith',
            'birthdate': '2000-01-01'
        }
    ]);
    res.end();
    */
    console.log("Getting parents from DB with child id: " + id);
    const sql = 'SELECT * FROM person p INNER JOIN relationship r ON (p.id = r.parent_id AND r.child_id = $1::int)';

    const params = [id];

    pool.query(sql, params, function(err, result) {
		
		if (err) {
			console.log("Error in query: ")
			console.log(err);
        }
        
        console.log("Found result: " + JSON.stringify(result.rows));
        
        res.send(result.rows);
        
    });
    
    
});

/**
 * GET getChildren
 */
app.get('/getChildren', function(req, res) { 

    const id = req.query.id;
    /*
    res.send([
        {
            'id': 1,
            'first_name': 'Jenny',
            'last_name': 'Smith',
            'birthdate': '2000-01-01'
        },
        {
            'id': 2,
            'first_name': 'Jim',
            'last_name': 'Smith',
            'birthdate': '2000-01-01'
        }
    ]);
    res.end();
    */
    console.log("Getting children from DB for parent id: " + id);
    const sql = 'SELECT * FROM person p INNER JOIN relationship r ON (p.id = r.child_id AND r.parent_id = $1::int)';

    const params = [id];

    pool.query(sql, params, function(err, result) {
		
		if (err) {
			console.log("Error in query: ")
			console.log(err);
        }
        
        console.log("Found result: " + JSON.stringify(result.rows));

        res.send(result.rows);
        
    });
    
});

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));