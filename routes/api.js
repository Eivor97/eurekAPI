var express = require('express');
var router = express.Router();

var utenteRouter = require('./api/utente');
router.use('/utente', utenteRouter);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;