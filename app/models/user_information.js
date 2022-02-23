module.exports = (sequelize, Sequelize) => {
  const UserInformation = sequelize.define('user_informations', {
    FirstName: {
      type: Sequelize.STRING
    },
    LastName: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    PhoneNumber: {
      type: Sequelize.STRING
    },
    Website: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    },
    Address: {
      type: Sequelize.STRING
    },
    WinPrize: {
      type: Sequelize.STRING
    }
  });

  return UserInformation;
};
