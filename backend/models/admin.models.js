import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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
        default: "admin"
    },
    token: {
        type: String,
        unique: true,
        required: false,
    }
});

adminSchema.index({ email: 1 }, { unique: true });

export const adminModel = mongoose.model('Admin', adminSchema);

