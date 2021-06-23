module.exports = (sequelize, Sequelize) => {
    return sequelize.define('mezzo', {
        numerotelaio: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true
        },
        descrizione: {
            type: Sequelize.STRING,
            allowNull: true
        },
        targa: {
            type: Sequelize.STRING(7),
            allowNull: false,
        },
        batteria: {
            type: Sequelize.DECIMAL(3,2),
            allowNull: true,
        },
        cilindrata: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true,
        },
        nPosti: {
            type: Sequelize.INTEGER.UNSIGNED,
            allowNull: true
        },
    }, {
        freezeTableName: 'mezzo',
    }
)}