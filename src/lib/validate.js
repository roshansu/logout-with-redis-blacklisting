import validator from 'validator'

const validate = (data)=>{
    const mandatoryField = ["email", 'password', 'name']
    const isAllowed = mandatoryField.every((val)=> Object.keys(data).includes(val))
    if(!isAllowed){
        throw new Error("field missing")
    }

    if(!validator.isEmail(data.email)){
        throw new Error("Invalid email")
    }
    if(!validator.isStrongPassword(data.password)){
        throw new Error("Weak password")
    }

}

export default validate