import db from "./db.js";

export function getTracks() {
    return db.prepare(`
        SELECT t.TrackId
        FROM tracks t;
    `).all();
}