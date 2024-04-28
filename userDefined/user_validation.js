const Joi = require('joi');

const schema = Joi.object({
    email: Joi.string()
        .email({ minDomainSegments: 1, tlds: { allow: ['com'] } }) 
        .regex(/^[^\s@]+@gmail\.com$/), 

    password: Joi.string()
        .pattern(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')),
});

module.exports = schema;

