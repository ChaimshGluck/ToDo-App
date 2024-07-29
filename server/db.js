import pgPromise from "pg-promise";
import 'dotenv/config';

const pgp = pgPromise();
const db = pgp(process.env.DB_URL)
// const db = pgp({
//     host: 'ep-raspy-base-a6w3apoo.us-west-2.retooldb.com',
//     port: 5432,
//     database: 'retool',
//     user: 'retool',
//     password: '5VtirHvlo9gz',
//     ssl: true,
// });

export default db;