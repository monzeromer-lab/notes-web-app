// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("./database");
const users = require('./user');

const orders = sequelize.define("orders", {
    id : {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: "monzer"
    },
    userRef: {
        type: DataTypes.UUID,
        allowNull:false
        // references: {
        //     model: users,
        //     key: "id"
        // }
    }
    }, {
        classMethods: {
          associate: function (models) {
            orders.belongsTo(models.users, {foreignKey: 'userRef'});
          }
        }
    }, {
        freezeTableName: true
    }
);
// orders.associate = (models) => {
//     orders.belongsTo(models.users, {foreignKey: 'id'});
// };

// orders.belongsTo(users, {foreignKey: "id" , as: "userid"});

orders.sync();
module.exports = orders;