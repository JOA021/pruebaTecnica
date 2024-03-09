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
        type: String,
        default: "teacher"
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
        type: String,
        required: true
    }
});

teacherSchema.index({ email: 1},{ unique: true});

export const teacherModel = mongoose.model('Teacher', teacherSchema)