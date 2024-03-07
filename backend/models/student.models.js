import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
    name:{
        type: String,
        required:  true
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
        type: "student",
    },
    age: {
        type: Number,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    identityCard: {
        type: Number,
        unique: true,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: false,
    }

})

studentSchema.index({ email: 1},{ unique: true });

export const studentModel = mongoose.model('Teacher', studentSchema)