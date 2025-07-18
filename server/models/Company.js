import mongoose from 'mongoose';
// import { RequiredError } from 'svix/dist/openapi';

const companySchema = new mongoose.Schema({
    name: {
        type: String, required: true
    },
    email: {
        type: String, required: true, unique: true
    },
    image: {
        type: String, required: true
    },
    password: {
        type: String, required: true
    },

})

const Company = mongoose.model('Company', companySchema);

export default Company;