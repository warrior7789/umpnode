module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email_verified_at: {
        type: Sequelize.DATE
    },
    avatar: {
        type: Sequelize.STRING
    },
    user_type: {
        type: Sequelize.STRING(10)
    },
    parent_id: {
        type: Sequelize.BIGINT(11)
    },
    refcode: {
        type: Sequelize.STRING(15)
    },
    phone: {
        type: Sequelize.STRING(20)
    },
    birthdate: {
        type: Sequelize.DATE
    },
    province_id: {
        type: Sequelize.INTEGER(11)
    },
    town_id: {
        type: Sequelize.INTEGER(11)
    },
    status: {
        type: Sequelize.INTEGER(1),
        defaultValue: 1
    },
    is_block: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    is_dummy: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    is_phone_verify: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    is_email_verify: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    investment_limit: {
        type: Sequelize.BIGINT(11),
        defaultValue: 10000
    },
    wallet: {
        type: Sequelize.DOUBLE(16,2),
        defaultValue: 0
    },
    slot_earning: {
        type: Sequelize.DOUBLE(16,2),
        defaultValue: 0
    },
    over_all_earning: {
        type: Sequelize.DOUBLE(16,2),
        defaultValue: 0
    },
    reward_earning: {
        type: Sequelize.DOUBLE(16,2),
        defaultValue: 0
    },
    purchase_pin_count: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
    },
    total_slots: {
        type: Sequelize.INTEGER(11),
        defaultValue: 0
    },
    sms_verify_code: {
        type: Sequelize.STRING(10)
    },
    email_verify_code: {
        type: Sequelize.STRING(10)
    },
    deleted_at: {
        type: Sequelize.DATE
    },
    last_login_at: {
        type: Sequelize.DATE
    },
    rejected_at: {
        type: Sequelize.DATE
    },
    rejected_reason: {
        type: Sequelize.TEXT
    },
    last_login_ip: {
        type: Sequelize.STRING(20)
    },
    document: {
        type: Sequelize.STRING(50)
    },
    isverify: {
        type: Sequelize.INTEGER(1),
        defaultValue: 0
    },
    freeze_txt: {
        type: Sequelize.TEXT
    },
    week_withdraw: {
        type: Sequelize.STRING(50)
    },
    p_to_p_limit: {
        type: Sequelize.INTEGER(11)
    },
    p_to_p_commission: {
        type: Sequelize.FLOAT(8,2)
    },
    is_multiple: {
        type: Sequelize.INTEGER(1)
    },
    multiple_parent_id: {
        type: Sequelize.INTEGER(11)
    },
  });
  return User;
};