const validator = require('../helpers/validate');
//https://www.npmjs.com/package/validatorjs
const signup = (req, res, next) => {
    const validationRule = {
        'name'        :'required|min:1',
        'email'       :'required|email',
        'phone'       :'required',
        'birthdate'   :'required|date',
        'province_id' :'required|integer',
        'town_id'     :'required|integer',
        'password'    :'required',          
        'avatar'      :'required|image|mimes:jpeg,png,jpg,gif,svg',
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            let err_message = ""
            for (const [key, value] of Object.entries(err.errors)) {
                err_message = value[0];
                break
            }
            res.status(412)
                .send({
                    status: 0,
                    success: false,
                    message: err_message,
                    data: null
                });
        } else {
            next();
        }
    });
}

module.exports = { 
  signup
}