require("dotenv").config()


const congif = {
    port: process.env.PORT || 8000,

    mongodb: {
        uri: process.env.MONGODB_CONNECT_URI,
    },

    cors: {
        origin: process.env.CORS_ORIGIN || '*',
        credentials: true
    }
}

module.exports = congif