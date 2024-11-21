const checkLogin = (schema) => {
    return (req, res, next) => {
        const validationResult = schema.validate(req.body)
        if (validationResult.error) {
            return res
                .status(406)
                .json({
                    error: validationResult.error.details
                })
        }
        next()
    }
}

module.exports = { checkLogin }