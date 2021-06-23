const Sequelize = require('sequelize');
const UtenteModel = require('../models/Utente');
const MezzoModel = require('../models/Mezzo');
const DepositoModel = require('../models/Deposito');
const PrenotazioneModel = require('../models/Prenotazione');

// db, username, password, { options }
const sequelize = new Sequelize('eurekapi', 'eurekapi', 'eurekapi', {
    dialect: 'mariadb'
});

const Utente = UtenteModel(sequelize, Sequelize);
const Mezzo = MezzoModel(sequelize, Sequelize);
const Deposito = DepositoModel(sequelize, Sequelize);
const Prenotazione = PrenotazioneModel(sequelize, Sequelize);

const deposito_impiegato = sequelize.define('deposito_impiegato', {}, { freezeTableName: true});

Deposito.hasMany( Mezzo, { foreignKey: 'refDeposito' } );
Deposito.belongsToMany( Utente, { through: deposito_impiegato } );

Utente.hasMany( Prenotazione, { foreignKey: 'refCliente' } );
Utente.hasMany( Prenotazione, { foreignKey: 'refAutista', allowNull: true } );

Deposito.hasMany( Prenotazione, { foreignKey: 'refDepositoConsegna' } );
Deposito.hasMany( Prenotazione, { foreignKey: 'refDepositoRitiro' } );

Mezzo.hasMany(Prenotazione , {foreignKey: 'refMezzo'} );

const init = function() {
    sequelize
        .authenticate()
        .then(() => {
            sequelize.sync();
        })
        .catch(err => {
            console.log(err);
        });
}

const doQuery = async function(query) {
    // TODO: query validation
    const [result, metadata] = await sequelize.query(query);
    return result;
}

module.exports = {
    Utente,
    Mezzo,
    Deposito,
    init,
    doQuery,
}