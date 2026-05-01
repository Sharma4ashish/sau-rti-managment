const dotenv = require('dotenv');
const app = require('./app.js');
const config = require('./config/index.js');
const connectDB = require('./config/db.js');


dotenv.config();

const startServer = async () => {
    try {

        await connectDB();        

        app.listen(config.port, () => {
            console.log(`Server running in development mode on port ${config.port}`)
        })

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer()