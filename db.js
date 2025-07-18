import mysql from 'mysql2/promise';

const db = await mysql.createConnection(process.env.JAWSDB_URL);

export default db;