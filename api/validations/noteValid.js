const Note = require('../models/Note')

const checkNote = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body)
        if (validationResult.error) {
            console.log(validationResult.error)
            return res
                .status(406)
                .json({
                    error: validationResult.error.details[0].message
                })
        } else {
            next()
        }
    }
}

module.exports = { checkNote }