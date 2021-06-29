var express = require('express');
var router = express.Router();

var utenteRouter = require('./api/utente');
var mezzoRouter = require('./api/mezzo');
router.use('/utente', utenteRouter);
router.use('/mezzo', mezzoRouter);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;