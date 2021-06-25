module.exports = (sequelize, Sequelize) => {
    return sequelize.define('utente', {
        id: {
            type: Sequelize.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        cf: {
            type: Sequelize.STRING(20),
            allowNull: false,
        },
        tipo: {
            type: Sequelize.ENUM('amministratore', 'impParcheggio', 'cliente', 'autista'),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false, // sure?
        },
        carta: {
            type: Sequelize.STRING(16),
            allowNull: true,
        },
        cartaCVV: {
            type: Sequelize.STRING(3),
            allowNull: true,
        },
        cartaNominativo: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        dataNascita: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        patente: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nomeutente: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        cognome: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    }, {
        indexes: [
            {
                unique: true,
                fields: ['cf', 'tipo']
            }
        ],
        freezeTableName: 'utente',
    }
)}