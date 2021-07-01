const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;

function generaToken(dati, scadenza)
{
    if(scadenza)
        return jwt.sign(dati, secret, { expiresIn: scadenza });
    else
        return jwt.sign(dati, secret);
}

function verificaToken(req, res, next)
{  
    const auth = req.header('authorization');
    if(!auth)
    {
        console.log(`Ricevuta richiesta senza autorizzazione da ${req.header('x-forwarded-for') || req.socket.remoteAddress}`)
        return res.sendStatus(401);
    }
    jwt.verify(auth, secret, (err, tokendata) => {
        if(err)
        {
            console.log(`Richiesta non autorizzata da ${req.header('x-forwarded-for') || req.socket.remoteAddress}`);
            return res.sendStatus(403);
        }
        req.tokendata = tokendata;
        next();
    });
}

module.exports = {
    generaToken,
    verificaToken
}