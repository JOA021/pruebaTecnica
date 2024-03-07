import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    userType: {
        type: "teacher",
    },
    citizenshipCard: {
        type: Number,
        unique: true,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    maritalStatus:{
        type: Number,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: false,
    },

})

teacherSchema.index({ email: 1},{ unique: true});

export const teacherModel = mongoose.model('Teacher', teacherSchema)