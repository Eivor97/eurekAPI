const express = require('express');
var cors = require('cors');

const app = express();
const port = 3000;

const apiRouter = require('../routes/api');

const db = require('../db/middleware');
db.init();

app.use(cors({
    exposedHeaders: ['authorization']
}));
app.use(express.json());
app.use('/api', apiRouter);


app.set("view engine","jade");

app.get('/', function(req, res, next) {
    res.render('help', {});
});

app.listen(port, () => console.log(`App avviata sulla porta ${port}!`));