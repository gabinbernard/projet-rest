import sqlite from 'better-sqlite3'
import log from './log.js';

const options = {
    verbose: (msg) => log(`SQLITE : ${msg}`)
}
export const db = sqlite('./chinook.db', options);

export default db;
