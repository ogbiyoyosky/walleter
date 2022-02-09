module.exports = {
    name: 'default',
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    entities: ['src/**/*.entity.ts'],
    database: process.env.DATABASE_NAME,
    migrations: ['src/database/migrations/*.ts'],
    subscribers: ['dist/**/*.subscriber.js'],
    seeds: ['src/database/seeds/*.ts'],
    cli: {
      migrationsDir: ['src/database/migrations'],
    },
  };
  