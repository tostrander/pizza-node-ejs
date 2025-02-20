//Import Express

import express from 'express';

// npm install mariadb
// Import MariaDB
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'pizza'
});

async function connect() {
    try {
        const conn = await pool.getConnection();
        console.log('Connected to the database');
        return conn;
    } catch (err) {
        console.log('Error connecting to the database: ' + err)
    }
}

//Instantiate an Express application
const app = express();

//Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

//Set the view engine for our application
app.set('view engine', 'ejs');

//Serve static files from the 'public' directory
app.use(express.static('public'));

//Define a port number for our server to listen on
const PORT = 3000;

//Define a "default" route for our home page
app.get('/', (req, res) => {

    // Send our home page as a response to the client
    res.render('home');
});

//Define an admin route
app.get('/admin', async (req, res) => {
    const conn = await connect();

    const orders = await conn.query('SELECT * FROM orders;');

    console.log(orders);

    res.render('order-summary', { orders });
});

//Define a "thank you" route
app.post('/thankyou', async (req, res) => {

    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        method: req.body.method,
        toppings: req.body.toppings,
        size: req.body.size
    };

    const conn = await connect();

    conn.query(`
        INSERT INTO orders (
            firstName,
            lastName,
            email,
            method,
            size
        ) VALUES (
            '${order.fname}',
            '${order.lname}',
            '${order.email}',
            '${order.method}',
            '${order.size}'
        );
    `);

    // Send our thank you page
    res.render('thankyou', { order });
});

//Tell the server to listen on our specified port
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

