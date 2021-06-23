const express = require('express')
const Sequelize = require('sequelize')

const app = express()
const port = 3000
const sequelize = new Sequelize('postgres://eurekAPI:eurekAPIpass@127.0.0.1:4000/eurekAPIdb', {define: {
    timestamps: false
}})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    // attributes
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.STRING
        // allowNull defaults to true
    },
    address: {
        type: Sequelize.STRING
    },
    salary: {
        type: Sequelize.REAL
        // allowNull defaults to true
    },
    }, {
        // options
    });

User.sync();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Hello World' }))

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

app.get('/user/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findAll({
            where: {    
                id: userId
            }
        })
        res.json({ user })
    } catch(error) {
    console.error(error)
    }
})