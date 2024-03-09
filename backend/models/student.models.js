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
        type: String,
        default: "student"
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
    }
})

studentSchema.index({ email: 1},{ unique: true });

export const studentModel = mongoose.model('Student', studentSchema)