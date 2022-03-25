module.exports = (sequelize, Sequelize) => {
    const Province = sequelize.define("provinces", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Province;
};