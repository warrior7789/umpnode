module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING(50),
            defaultValue: null,
        },
        email: {
            type: Sequelize.STRING(50)
        },
        password: {
            type: Sequelize.STRING(255)
        },        
        email_verified_at: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        avatar: {
            type: Sequelize.STRING(50),
            defaultValue: null,
        },
        user_type: {
            type: Sequelize.STRING(10),
            defaultValue: 'user',
        },
        parent_id: {
            type: Sequelize.INTEGER(11),
            defaultValue: null,
        },  
        refcode: {
            type: Sequelize.STRING(15),
            defaultValue: null,
        },
        phone: {
            type: Sequelize.STRING(20),
            defaultValue: null,
        },
        birthdate: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        province_id: {
            type: Sequelize.INTEGER(11),
            defaultValue: null,
        },
        town_id: {
            type: Sequelize.INTEGER(11),
            defaultValue: null,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 1,
        },
        is_block: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        },
        is_dummy: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        },
        is_phone_verify: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        },
        is_email_verify: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        },
        investment_limit: {
            type: Sequelize.BIGINT,
            defaultValue: 0,
        },
        wallet: {
            type: Sequelize.DOUBLE(16,2),
            defaultValue: 0,
        },
        slot_earning: {
            type: Sequelize.DOUBLE(16,2),
            defaultValue: 0,
        },
        over_all_earning: {
            type: Sequelize.DOUBLE(16,2),
            defaultValue: 0,
        },
        reward_earning: {
            type: Sequelize.DOUBLE(16,2),
            defaultValue: 0,
        },
        purchase_pin_count: {
            type: Sequelize.INTEGER(11),
            defaultValue: 0,
        },
        total_slots: {
            type: Sequelize.INTEGER(11),
            defaultValue: 0,
        },
        sms_verify_code: {
            type: Sequelize.STRING(10),
            defaultValue: 0,
        },
        email_verify_code: {
            type: Sequelize.STRING(10),
            defaultValue: 0,
        },
        remember_token: {
            type: Sequelize.STRING(100),
            defaultValue: 0,
        },
        deleted_at: {
            type: Sequelize.DATE,
            defaultValue: null,
        },
        last_login_at: {
            type: Sequelize.DATE,
            defaultValue:null,
        },
        rejected_at: {
            type: Sequelize.DATE,
            defaultValue:null,
        },
        rejected_reason: {
            type: Sequelize.TEXT,
            defaultValue:null,
        },
        last_login_ip: {
            type: Sequelize.STRING(20),
            defaultValue:null,
        },
        document: {
            type: Sequelize.STRING(50),
            defaultValue:null,
        },
        isverify: {
            type: Sequelize.BOOLEAN,
            defaultValue:0,
        },
        freeze_txt: {
            type: Sequelize.TEXT,
            defaultValue:null,
        },
        week_withdraw: {
            type: Sequelize.STRING(50),
            defaultValue:null,
        },
        p_to_p_limit: {
            type: Sequelize.INTEGER(11),
            defaultValue:null,
        },
        p_to_p_commission: {
            type: Sequelize.FLOAT(8,2),
            defaultValue:null,
        }
    });
    return User;
};
