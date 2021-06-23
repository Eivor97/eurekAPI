const express = require('express')
const db = require('./db/middleware')

const app = express()
const port = 3000

db.init();

app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'ok' }))

app.get('/api/utenti', async (req, res) => {
    // const userId = req.params.userId;
    try {
        const user = await db.Utente.findAll();
        res.json({ user })
    } catch(error) {
        console.error(error)
    }
})

app.get('/api/utenti/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await db.Utente.findOne({
            where: {    
                id: userId
            }
        })
        res.json({ user })
    } catch(error) {
        console.error(error)
    }
})

app.get('/api/utenti/')

// app.get('/query', async (req, res) => {
//     // const userId = req.params.userId;
//     try {
//         const result = await db.doQuery('SELECT * FROM utente');
//         res.json({ result })
//     } catch(error) {
//         console.error(error)
//     }
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// app.post('/user', async (req, res) => {
//     try {
//         const newUser = new User(req.body)
//         await newUser.save()
//         res.json({ user: newUser }) // Returns the new user that is created in the database
//     } catch(error) {
//         console.error(error)
//     }
//     })