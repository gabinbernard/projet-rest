import db from "./db.js";

export function getTracks() {
    return db.prepare(`
        SELECT t.TrackId
        FROM tracks t;
    `).all().map(v => v.TrackId);
}

export function getTrack(id) {
    return db.prepare(`
        SELECT t.Name, t.Composer, t.Milliseconds, t.Bytes
        FROM tracks t
        WHERE t.TrackId = ?;    
    `).get(id);
}

export function createTrack(name, composer, milliseconds, bytes) {
    return db.prepare(`
        INSERT INTO tracks (Name, AlbumId, MediaTypeId, GenreId, Composer, Milliseconds, Bytes)
        VALUES (?, 1, 1, 1, ?, ?, ?)
        RETURNING TrackId;
    `).get(name, composer, milliseconds, bytes).TrackId;
}

export function editTrack(id, name, composer, milliseconds, bytes) {
    return db.prepare(`
        UPDATE tracks
        SET Name = ?, Composer = ?, Milliseconds = ?, Bytes = ?
        WHERE TrackId = ?
        RETURNING TrackId;
    `).get(name, composer, milliseconds, bytes, id).TrackId;
}

export function deleteTrack(id) {
    return db.prepare(`
        DELETE FROM tracks
        WHERE TrackId = ?;
    `).run(id);
}

export function getTrackAlbum(id) {
    return db.prepare(`
        SELECT a.Title
        FROM tracks t
        JOIN albums a ON t.AlbumId = a.AlbumId
        WHERE t.TrackId = ?;
    `).get(id);
}

export function setTrackAlbum(trackId, albumId) {
    return db.prepare(`
        UPDATE tracks
        SET AlbumId = ?
        WHERE TrackId = ?
        RETURNING AlbumId;
    `).get(albumId, trackId).AlbumId;
}

export function getTrackGenre(id) {
    return db.prepare(`
        SELECT g.Name
        FROM tracks t
        JOIN genres g ON t.GenreId = g.GenreId
        WHERE t.TrackId = ?;
    `).get(id);
}

export function setTrackGenre(trackId, genreId) {
    return db.prepare(`
        UPDATE tracks
        SET GenreId = ?
        WHERE TrackId = ?
        RETURNING GenreId;
    `).get(genreId, trackId).GenreId;
}

export function getTrackMediaType(id) {
    return db.prepare(`
        SELECT m.Name
        FROM tracks t
        JOIN media_types m ON t.MediaTypeId = m.MediaTypeId
        WHERE t.TrackId = ?;
    `).get(id);
}

export function setTrackMediaType(trackId, mediaTypeId) {
    return db.prepare(`
        UPDATE tracks
        SET MediaTypeId = ?
        WHERE TrackId = ?
        RETURNING MediaTypeId;
    `).get(mediaTypeId, trackId).MediaTypeId;
}

export function getTrackPlaylists(id) {
    return db.prepare(`
        SELECT pt.PlaylistId
        FROM tracks t
        JOIN playlist_track pt ON pt.TrackId = t.TrackId
        WHERE t.TrackId = ?;
    `).all(id).map(v => v.PlaylistId);
}