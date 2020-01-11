import { UserInputError } from 'apollo-server-express'
import validator from 'validator'

export const validateAddress = (values) => {
    const errorMessage = []
    if(validator.isEmpty(values.name)) {
        errorMessage.push("NAME_EMPTY")
    } else if(!validator.isLength(values.name, {min: 5, max: 50})) {
        errorMessage.push("NAME_LENGTH")
    }

    if(validator.isEmpty(values.tel1)) {
        errorMessage.push("TEL1_EMPTY")
    } else if(!validator.isLength(values.tel1, {min: 9, max: 13})) {
        errorMessage.push("TEL1_LENGTH")
    }
    if(values.tel2 && !validator.isLength(values.tel2, {min: 9, max: 13})) {
        errorMessage.push("TEL2_LENGTH")
    }
    if(values.tel3 && !validator.isLength(values.tel3, {min: 9, max: 13})) {
        errorMessage.push("TEL3_LENGTH")
    }
    if (values.email) {
        if(!validator.isEmail(values.email)) {
            errorMessage.push("EMAIL_INVALID")
        } else if(!validator.isLength(values.email, {max: 30})) {
            errorMessage.push("EMAIL_LENGTH")
        }
    }
    // if (mimetype !== 'image/jpeg' || mimetype !== 'image/png') {
    //     errorMessage.push("INVALID_MIMETYPE")
    // }
    if (errorMessage.length > 0) {
        throw new UserInputError(errorMessage, { invalidArgs: "errors-input-todo"})
    }
}

export const validateUser = values => {
    const errorMessage = []

    if(validator.isEmpty(values.username)) {
        errorMessage.push("USERNAME_EMPTY")
    } else if(!validator.isLength(values.username, {min: 5, max: 50})) {
        errorMessage.push("USERNAME_LENGTH")
    }
    if(validator.isEmpty(values.email)) {
        errorMessage.push("EMAIL_EMPTY")
    } else if(!validator.isEmail(values.email)) {
        errorMessage.push("EMAIL_INVALID")
    }

    if (errorMessage.length > 0) {
        throw new UserInputError(errorMessage, { invalidArgs: "errors-input-user" })    
    }
}

export const validateSignup = values => {
    const errorMessage = []

    if(validator.isEmpty(values.username)) {
        errorMessage.push("USERNAME_EMPTY")
    } else if(!validator.isLength(values.username, {min: 5, max: 50})) {
        errorMessage.push("USERNAME_LENGTH")
    }
    if(validator.isEmpty(values.password)) {
        errorMessage.push("PASSWORD_EMPTY")
    } else if(!validator.isLength(values.password, {min: 6, max: 30})) {
        errorMessage.push("PASSWORD_LENGTH")
    }
    if(validator.isEmpty(values.email)) {
        errorMessage.push("EMAIL_EMPTY")
    } else if(!validator.isEmail(values.email)) {
        errorMessage.push("EMAIL_INVALID")
    }

    if (errorMessage.length > 0) {
        throw new UserInputError(errorMessage, { invalidArgs: "errors-input-signup"})
    }
}

export const validateLogin = values => {
    const errorMessage = []

    if(validator.isEmpty(values.password)) {
        errorMessage.push("PASSWORD_EMPTY")
    } else if(!validator.isLength(values.password, {min: 6, max: 30})) {
        errorMessage.push("PASSWORD_LENGTH")
    }
    if(validator.isEmpty(values.email)) {
        errorMessage.push("EMAIL_EMPTY")
    } else if(!validator.isEmail(values.email)) {
        errorMessage.push("EMAIL_INVALID")
    }

    if (errorMessage.length > 0) {
        throw new UserInputError(errorMessage, { invalidArgs: "errors-input-signin"})
    }
}

export const validateChangePassword = values => {
    const errorMessage = passwordValidation(values.password)

    if (errorMessage) {
        throw new UserInputError(errorMessage, { invalidArgs })    
    }
}

const passwordValidation = password => {
    let errorMessage
    if(validator.isEmpty(password)) {
        errorMessage = "PASSWORD_EMPTY"
    } else if(!validator.isLength(password, {min: 6, max: 30})) {
        errorMessage = "PASSWORD_LENGTH"
    }
    return errorMessage;
}


export const validateEmail = values => {
    const errorMessage = []

    if(validator.isEmpty(values.email)) {
        errorMessage.push("EMAIL_EMPTY")
    } else if(!validator.isEmail(values.email)) {
        errorMessage.push("EMAIL_INVALID")
    }

    if (errorMessage.length > 0) {
        throw new UserInputError(errorMessage, { invalidArgs: "errors-input-signup"})
    }
}

