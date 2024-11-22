import db from "./db.js";

export function getArtists() {
    return db.prepare(`
        SELECT ar.ArtistId
        FROM artists ar;
    `).all().map(v => v.ArtistId);
}

export function getArtist(id) {
    return db.prepare(`
        SELECT a.Name 
        FROM artists a 
        WHERE a.ArtistId = ?;
    `).get(id);
}

export function createArtist(name) {
    return db.prepare(`
        INSERT INTO artists (Name) 
        VALUES (?)
        RETURNING ArtistId;
    `).run(name);
}

export function editArtist(id, name) {
    return db.prepare(`
        UPDATE artists
        SET Name = ?
        WHERE ArtistId = ?
        RETURNING ArtistId;
    `).get(name, id);
}

export function deleteArtist(id) {
    return db.prepare(`
        DELETE FROM artists
        WHERE ArtistId = ?
    `).run(id);
}

export function getArtistAlbums(id) {
    return db.prepare(`
        SELECT al.AlbumId 
        FROM artists ar 
        INNER JOIN albums al on al.ArtistId = ar.ArtistId
        WHERE ar.ArtistId = ?
    `).all(id).map(v => v.AlbumId);
}