module.exports = (sequelize, Sequelize) => {
  const SpinnerEnquiry = sequelize.define('spinner_enquiry', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    number: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    prize_win: {
      type: Sequelize.STRING
    },
    win_status: {
      type: Sequelize.STRING
    }
  });

  return SpinnerEnquiry;
};
