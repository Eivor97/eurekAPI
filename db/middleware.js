const Sequelize = require('sequelize');
const UtenteModel = require('../models/Utente');
const MezzoModel = require('../models/Mezzo');

// db, username, password, { options }
const sequelize = new Sequelize('eurekapi', 'eurekapi', 'eurekapi', {
    dialect: 'mariadb'
});

const Utente = UtenteModel(sequelize, Sequelize);
const Mezzo = MezzoModel(sequelize, Sequelize);

exports.init = function() {
    sequelize
        .authenticate()
        .then(() => {
            Utente.sync();
            Mezzo.sync();
        })
        .catch(err => {
            console.log(err);
        });
}

exports.doQuery = async function(query) {
    // query validation
    const [result, metadata] = await sequelize.query(query);
    return result;
}

exports.Utente = Utente;
exports.Mezzo = Mezzo;