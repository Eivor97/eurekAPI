var express = require('express');
var router = express.Router();
const db = require('../../db/middleware');

router.get('/get', async (req, res) => {

    try {
        const users = await db.Utente.findAll();
        res.json( {users} );
    } catch(error) {
        console.error(error);
    }
})

router.get('/get/:userId', async (req, res) => {

    const userId = req.params.userId;

    try {
        const user = await db.Utente.findOne({
            where: {    
                id: userId
            }
        });
        res.json( { user } );
    } catch(error) {
        console.error(error);
    }
})

module.exports = router;
