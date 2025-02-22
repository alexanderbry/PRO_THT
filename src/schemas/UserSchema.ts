import Joi from 'joi';

const UserSchema = Joi.object({
    id: Joi.number().integer().messages({
        'number.base': 'ID must be a number',
        'number.integer': 'ID must be an integer',
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    }),
    fullName: Joi.string().required().messages({
        'string.base': 'Full name must be a string',
        'any.required': 'Full name is required'
    }),
    gender: Joi.string().valid('male', 'female').required().messages({
        'string.base': 'Gender must be a string',
        'any.only': 'Gender must be one of male or female',
        'any.required': 'Gender is required'
    }),
    dateOfBirth: Joi.date().max('now').required().messages({
        'date.base': 'Date of birth must be a valid date',
        'date.max': 'Date of birth cannot be in the future',
        'any.required': 'Date of birth is required'
    }),
    role: Joi.string().valid('member', 'admin').default('member').messages({
        'string.base': 'Role must be a string',
        'any.only': 'Role must be one of member or admin'
    }),
    createdAt: Joi.date().default(() => new Date()).messages({
        'date.base': 'Created at must be a valid date'
    }),
    updatedAt: Joi.date().default(() => new Date()).messages({
        'date.base': 'Updated at must be a valid date'
    })
});

const LoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(8).required().messages({
        'string.base': 'Password must be a string',
        'string.min': 'Password must be at least 8 characters long',
        'any.required': 'Password is required'
    })
});

const UpdateSchema = Joi.object({
    fullName: Joi.string().required().messages({
        'string.base': 'Full name must be a string',
        'any.required': 'Full name is required'
    }),
    gender: Joi.string().valid('male', 'female').required().messages({
        'string.base': 'Gender must be a string',
        'any.only': 'Gender must be one of male or female',
        'any.required': 'Gender is required'
    }),
    dateOfBirth: Joi.date().max('now').required().messages({
        'date.base': 'Date of birth must be a valid date',
        'date.max': 'Date of birth cannot be in the future',
        'any.required': 'Date of birth is required'
    }),
    createdAt: Joi.date().default(() => new Date()).messages({
        'date.base': 'Created at must be a valid date'
    }),
});
        

export { UserSchema, LoginSchema, UpdateSchema };