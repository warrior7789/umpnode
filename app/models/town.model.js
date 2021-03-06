module.exports = (sequelize, Sequelize,province) => {
    const Town = sequelize.define("towns", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        province_id: {
            type: Sequelize.INTEGER,
            references: {
              // This is a reference to another model
              model: province,

              // This is the column name of the referenced model
              key: 'id',

              // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
              //deferrable: Deferrable.INITIALLY_IMMEDIATE
              // Options:
              // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
              // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
              // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
            }
        },
        name: {
            type: Sequelize.STRING
        }
    });
    return Town;
};