require('dotenv').config()
module.exports = {
    client: 'pg',
    connection: {
      host : process.env.DBHOST,
      port : process.env.PORT,
      user : process.env.DBUSER,
      password : process.env.DBPASSWORD,
      database : process.env.DATABASE
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/migrations'
    }
};
