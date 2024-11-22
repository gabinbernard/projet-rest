import db from "./db.js";

export function getPlaylists() {
    return db.prepare(`
        SELECT p.PlaylistId
        FROM playlists p;
    `).all();
}