import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import pkg from 'pg-connection-string';
const { parse } = pkg;
const { host, port, database, user, password } = parse(process.env.DB_URL || '');

export default defineConfig({
    dialect: 'postgresql',
    dbCredentials: {
        host,
        port,
        database,
        user,
        password,
        ssl: true
    },
    out: './migrations/',
    schema: './drizzle/',
    schemaFilter: 'todos1'
});