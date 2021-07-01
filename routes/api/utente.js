var express = require('express');
var router = express.Router();
const { Utente } = require('../../db/middleware');
const sha256 = require('crypto-js/sha256');
const { Op } = require('sequelize');
const { generaToken, verificaToken } = require('../../middleware/auth.js')


router.use(express.urlencoded({extended: true}));
router.use(express.json());

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

    try
    {
        const user = await Utente.findOne({
            where: {    
                id: userId
            }
        })
        if(user)
            res.json({status: 'ok', user: user})
        else
            res.json({status: 'ko'})
    }
    catch(error)
    {
        console.log(error);
        res.json({status: 'error'});
    }
})

router.get('/post', async (req, res) => {
    // TODO: migliorare
    res.json(Utente.rawAttributes);
})

router.post('/post', async (req, res) => {
    try {
        console.log(`${req.body.nomeutente} sta provando ad effettuare la registrazione`);
        Utente.create(req.body)
            .then(utente => {
                console.log(`registrazione effettuata, id: ${utente.id}`);
                res.json({status: 'ok', id: utente.id})
            })
            .catch(error => {
                console.log(error);
                res.json({status: 'ko'});
            });
    } catch(error) {
        console.log(error);
        res.json( { status: 'ko' } );
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

        console.log(`${username} sta provando ad effettuare il login...`);

        const user = await Utente.findOne({
            attributes: ['id', 'tipo', 'email','datanascita', 'nome', 'cognome'],
            where: {
                nomeutente: username,
                password: passwordsha256,
            }
        });
        if(user) // utente trovato
        {
            const token = generaToken({id: user.id, tipo: user.tipo, email: user.email});
            console.log(`${username} ha effettuato il login.`);
            res.json( { status: 'ok', user: user, token: token} );
        }
        else
            res.json( { status: 'ko', user: null } )
    } catch(error) {
        res.json( { status: 'error' } )
        console.log(error);
    }  
})

router.post('/recuperaPassword', async (req, res) => {
    try 
    {
        const username = req.body.nomeutente;

        const user = await Utente.findOne({
            attributes: ['id', 'email'],
            where: {
                nomeutente: username,
            }
        });
        if(user)
        {
            let randomPassword = Math.random().toString(36).slice(-8);
            console.log(randomPassword + ' generata ed inviata a: ' + user.email);
            user.update({
                password: sha256(randomPassword).toString(),
            })
            res.json( { status: 'ok' } );
        }
        else
            res.json( { status: 'ko' } );
    }
    catch(error)
    {
        res.json( { status: 'error' } );
        console.log(error);
    }
})

router.post('/recuperaNomeUtente', async (req, res) => {
    try 
    {
        const email = req.body.email;

        const user = await Utente.findOne({
            attributes: ['id', 'email', 'nomeutente'],
            where: {
                email: email,
            }
        });
        if(user)
        {
            console.log(user.nomeutente + ' trovato ed inviato a: ' + user.email);
            res.json( { status: 'ok' } );
        }
        else
            res.json( { status: 'ko' } );
    }
    catch(error)
    {
        res.json( { status: 'error' } );
        console.log(error);
    }
})

router.post('/ricerca', verificaToken, async (req, res) => {
    const nomeUtente = req.body.nomeutente;
    const tipo = req.body.tipo;
    console.log(`Cercato ${tipo} ${nomeUtente}`);
    try
    {
        await Utente.findAll({
            // TODO: rimuovere password dagli attributi
            where: {
                nomeutente:
                {
                    [Op.like]: `%${nomeUtente}%`
                },
                tipo: tipo
            }
        }).then(
            utenti => {
                if(utenti.length > 0)
                    res.json({status: 'ok', utenti: utenti})
                else
                    res.json({status: 'ko'})
            }
        ).catch( 
            error => res.json({status: 'error'})
        )
    }
    catch(error)
    {
        console.log(error);
    }
});

// router.post('/test', async(req, res) => {
//     const token = generaToken({utente: 'a', password: 'b'});
//     res.json({token: token});
// })

// router.post('/verifica', verificaToken, (req, res) => {
//     res.json({status: 'ok'});
// })

module.exports = router;