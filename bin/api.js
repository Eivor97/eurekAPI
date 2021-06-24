const express = require('express');
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

const apiRouter = require('../routes/api');

const db = require('../db/middleware');
db.init();

app.use(express.json());
app.use(bodyParser.json())

app.use('/api', apiRouter);


app.set("view engine","jade");

app.get('/', function(req, res, next) {
    res.render('help', {});
});

app.listen(port, () => console.log(`App avviata sulla porta ${port}!`));