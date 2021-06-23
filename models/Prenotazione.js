module.exports = (sequelize, Sequelize) => {
    return sequelize.define('prenotazione', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
        },
        stato: {
            type: Sequelize.ENUM('effettuata', 'in corso'),
            allowNull: false,
            defaultValue: 'in corso',
        },
        transazione: {
            type: Sequelize.UUID,
            allowNull: false,
        },
        importo: {
            type: Sequelize.DECIMAL(4,2),
            allowNull: false,
        },
        oraritiro: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        oraritiroprevista: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        oraconsegna: {
            type: Sequelize.DATE,
            allowNull: true,
        },
        oraconsegnaprevista: {
            type: Sequelize.DATE,
            allowNull: true,
        }
    }, {
        freezeTableName: 'prenotazione',
    }
)}