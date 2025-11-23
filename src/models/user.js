const mongoose = require("mongoose");
const validator = require('validator')
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid email address " + value)
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password " + value)
            }
        }
    },
    age: {
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new error ("Gender data is not valid")
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://avatars.githubusercontent.com/u/30509968?v=4",
        validate(value) {
            if(!validator.isURL(value)) {
                throw new Error("Invalid photo Url " + value)
            }
        }
    },
    about: {
        type: String,
        default: "This is the default description of the user"
    },
    skills: {
        type: [String]
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);