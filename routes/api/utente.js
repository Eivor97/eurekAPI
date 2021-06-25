var express = require('express');
var router = express.Router();
const { Utente } = require('../../db/middleware');

router.use(express.urlencoded({extended: true}));
router.use(express.json())

router.get('/get', async (req, res) => {

    try {
        const users = await Utente.findAll();
        res.json( {users} );
    } catch(error) {
        console.error(error);
    }
})

router.get('/get/:userId', async (req, res) => {

    const userId = req.params.userId;

    try {
        const user = await Utente.findOne({
            where: {    
                id: userId
            }
        });
        res.json( { user } );
    } catch(error) {
        console.error(error);
    }   
})

router.get('/post', async (req, res) => {
    // TODO: migliorare
    res.json(Utente.rawAttributes);
})

router.post('/post', async (req, res) => {
    try {
        req.body['tipo'] = 'cliente';
        Utente.create(req.body)
            .then(utente => res.json({status: 'ok', id: utente.id}));
    } catch(error) {
        console.log(error);
        res.json( { status: 'ko', id: null } );
    }
})

router.post('/verificaUtente', async (req, res) => {
    try {
        const username = req.body.nomeutente;

        const user = await Utente.findOne({
            where: {
                nomeutente: username,
            }
        });
        console.log( { user } );
        if(user === null)
            res.json( { response: false } )
        else
            res.json( { response: true } )
    } catch(error) {
        res.json( { response : 'error' } )
        console.log(error);
    }
    
})


router.post('/verificaPassword', async (req, res) => {
    try {
        const username = req.body.nomeutente;
        const passwordsha256 = req.body.password;

        const user = await Utente.findOne({
            where: {
                nomeutente: username,
                password: passwordsha256,
            }
        });
        console.log( { user } );
        if(user === null)
            res.json( { response: false } )
        else
            res.json( { response: user.id } )
    } catch(error) {
        res.json( { response : 'error' } )
        console.log(error);
    }  
})

router.post('/login', async (req, res) => {
    try {
        const username = req.body.nomeutente;
        const passwordsha256 = req.body.password;

        const user = await Utente.findOne({
            attributes: ['id', 'tipo', 'email','datanascita', 'nome', 'cognome'],
            where: {
                nomeutente: username,
                password: passwordsha256,
            }
        });
        // console.log( { user } );
        if(user) // utente trovato
            res.json( { status: 'ok', user: user } )
        else
            res.json( { status: 'ko', user: null } )
    } catch(error) {
        res.json( { status: 'error' } )
        console.log(error);
    }  
})

module.exports = router;