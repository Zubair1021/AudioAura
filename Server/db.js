const mongoose = require("mongoose")

const connectToDb = () => {
    return mongoose.connect("mongodb+srv://hamzanaseer496:9T0aFUNlIiIUsBGP@cluster0.yxj8x.mongodb.net/")
}



module.exports = {connectToDb}