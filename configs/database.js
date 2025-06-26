require('dotenv').config()
module.exports = {
    development: {
        username: process.env.DEV_DB_USERNAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_NAME,
        host: process.env.DEV_DB_HOSTNAME,
        port: process.env.DEV_DB_PORT,
        max: process.env.DEV_DB_MAX_CONNECTION_POOL,
        min: process.env.DEV_DB_MIN_CONNECTION_POOL,
        acquire: process.env.DEV_DB_ACQUIRE_CONNECTION_POOL,
        idle: process.env.DEV_DB_IDLE_CONNECTION_POOL,
        dialect: 'mysql',
        logging: false
    },
    test: {
        username: process.env.TEST_DB_USERNAME,
        password: process.env.TEST_DB_PASSWORD,
        database: process.env.TEST_DB_NAME,
        host: process.env.TEST_DB_HOSTNAME,
        port: process.env.TEST_DB_PORT,
        max: process.env.TEST_DB_MAX_CONNECTION_POOL,
        min: process.env.TEST_DB_MIN_CONNECTION_POOL,
        acquire: process.env.TEST_DB_ACQUIRE_CONNECTION_POOL,
        idle: process.env.TEST_DB_IDLE_CONNECTION_POOL,
        dialect: 'mysql',
        logging: false
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        max: process.env.PROD_DB_MAX_CONNECTION_POOL,
        min: process.env.PROD_DB_MIN_CONNECTION_POOL,
        acquire: process.env.PROD_DB_ACQUIRE_CONNECTION_POOL,
        idle: process.env.PROD_DB_IDLE_CONNECTION_POOL,
        dialect: 'mysql',
        logging: false
    },
};