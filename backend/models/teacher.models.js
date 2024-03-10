import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    content: {
        type: String,
        required: false
    }
});

const subjectSchema = mongoose.Schema({
    nameSubject: {
        type: String,
        required: true
    },

    gradeSubject:{
         type: String,
         required: true,
    },
    messages: [messageSchema]
})

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
    },
    subjects: [subjectSchema]
});

teacherSchema.index({ email: 1},{ unique: true});

export const teacherModel = mongoose.model('Teacher', teacherSchema)