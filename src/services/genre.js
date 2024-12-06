import db from "./db.js";

export function getGenres() {
    return db.prepare(`
        SELECT g.GenreId
        FROM genres g;
    `).all().map(v => v.GenreId);
}

export function getGenre(id) {
    return db.prepare(`
        SELECT g.Name 
        FROM genres g 
        WHERE g.GenreId = ?;
    `).get(id);
}

export function createGenre(name) {
    return db.prepare(`
        INSERT INTO genres (Name) 
        VALUES (?)
        RETURNING GenreId;
    `).get(name).GenreId;
}

export function editGenre(id, name) {
    return db.prepare(`
        UPDATE genres
        SET Name = ?
        WHERE GenreId = ?
        RETURNING GenreId;
    `).get(name, id).GenreId;
}

export function deleteGenre(id) {
    return db.prepare(`
        DELETE FROM genres
        WHERE GenreId = ?
    `).run(id);
}

export function getGenreTracks(id) {
    return db.prepare(`
        SELECT t.TrackId 
        FROM genres g 
        INNER JOIN tracks t on g.GenreId = t.GenreId
        WHERE g.GenreId = ?
    `).all(id).map(v => v.TrackId);
}