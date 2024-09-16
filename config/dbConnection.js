const mongoose = require('mongoose') // Import the mongoose

const dbconnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_STRING)
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {dbconnection}