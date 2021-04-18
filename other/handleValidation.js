//VALIDATION
const joi = require('joi');


function HandleValidation() { }

HandleValidation.prototype.loginValidator = (data) => {
    schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(5).max(50).required()
    });
    const validation = schema.validate(data);
    return validation?.error?.details[0]?.message;
}

HandleValidation.prototype.registerValidator = (data) => {
    schema = joi.object({
        name: joi.string().min(5).max(20).required(),
        email: joi.string().email().required(),
        password: joi.string().min(5).max(50).required()
    });
    const validation = schema.validate(data);
    return validation?.error?.details[0]?.message;
}

module.exports = HandleValidation;