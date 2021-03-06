import * as dotenv from 'dotenv'
dotenv.config()
export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  synchronize: !process.env.PRODUCTION,
  logging: false,
  entities: ['src/entity/**/*.{ts,js}'],
  migrations: ['src/migration/**/*.{ts,js}'],
  subscribers: ['src/subscriber/**/*.{ts,js}'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
}
