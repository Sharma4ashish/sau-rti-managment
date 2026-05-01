const dotenv = require('dotenv');
const app = require('./app.js');
const config = require('./config/index.js');

dotenv.config();

const startServer = async () => {
    try {

        app.listen(config.port, () => {
            console.log(`Server running in development mode on port ${config.port}`)
        })

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer()