module.exports = (sequelize, Sequelize) => {
    return sequelize.define('deposito', {
        nome: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        capienza: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },
        tipo: {
            type: Sequelize.ENUM('stallo', 'parcheggio'),
            allowNull: false,
        },
    }, {
        freezeTableName: 'deposito',
    }
)}