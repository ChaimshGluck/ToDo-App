import pgPromise from "pg-promise";
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
// import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

// const client = postgres(process.env.DB_URL);
// const db = drizzle(client);

const pgp = pgPromise();
const db = pgp(process.env.DB_URL)


// const db = pgp({
//     host: 'ep-raspy-base-a6w3apoo.us-west-2.retooldb.com',
//     port: 5432,
//     database: 'retool',
//     user: 'retool',
//     password: 'DVdj9xLf8ATZ',
//     ssl: true,
// });

export default db;