var express = require('express');
var router = express.Router();
const { Mezzo } = require('../../db/middleware');

router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.post('/post', async (req, res) => {
    console.log(req.body);
    try {
        Mezzo.create(req.body)
            .then(mezzo => res.json({status: 'ok' }))
            .catch(error => {
                console.log(error);
                res.json({status: 'ko'});
            });
    } catch(error) {
        console.log(error);
        res.json( { status: 'ko' } );
    }
})

module.exports = router;