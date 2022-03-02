const validator = require('../helpers/validate');
const multer = require('multer')

const DIR = './public/avatar/';
//https://www.npmjs.com/package/validatorjs
const signup = (req, res, next) => {
    const validationRule = {
        'name'        :'required|min:1',
        'email'       :'required|email',
        'phone'       :'required',
        'birthdate'   :'required|date',
        'province_id' :'required|integer',
        'town_id'     :'required|integer',
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

function makeid (length) {
    var result = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-')
        cb(null, makeid(16) + '_' + fileName)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log(file.mimetype)
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
        }
    }
})

const image_upload = (req, res, next) => {
    return upload.single('avatar')(req, res, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()

    if (!req.file) { 
        //return res.json({ error: ErrorMessages.invalidFiletype })
        res.status(412)
            .send({
                status: 0,
                success: false,
                message: "Invalid File type",
                data: null
            });
            return ;
    }
        next()
    })
}

module.exports = { 
  signup,
  image_upload
}