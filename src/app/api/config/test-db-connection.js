// src/app/api/config/test-db-connection.js
import sequelize from './database.js';

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('Connection to MySQL database successful!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

testConnection();
