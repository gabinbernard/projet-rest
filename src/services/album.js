import db from "./db.js";

export function getAlbums() {
    return db.prepare(`
        SELECT al.AlbumId
        FROM albums al;
    `).all().map(v => v.AlbumId);
}

export function getAlbum(id) {
    return db.prepare(`
        SELECT al.Title
        FROM albums al 
        WHERE al.AlbumId = ?;
    `).get(id);
}

export function createAlbum(title) {
    return db.prepare(`
        INSERT INTO albums (Title, ArtistId) 
        VALUES (?, 1)
        RETURNING AlbumId;
    `).get(title).AlbumId;
}

export function editAlbum(id, title) {
    return db.prepare(`
        UPDATE albums
        SET Title = ?
        WHERE AlbumId = ?
        RETURNING AlbumId;
    `).get(title, id).AlbumId;
}

export function deleteAlbum(id) {
    return db.prepare(`
        DELETE FROM albums
        WHERE AlbumId = ?
    `).run(id);
}

export function getAlbumArtist(id) {
    return db.prepare(`
        SELECT ar.Name
        FROM albums al
        JOIN artists ar ON al.ArtistId = ar.ArtistId 
        WHERE al.AlbumId = ?
    `).get(id);
}

export function editAlbumArtist(albumId, artistId) {
    return db.prepare(`
        UPDATE albums
        SET ArtistId = ?
        WHERE AlbumId = ?
        RETURNING ArtistId
    `).get(artistId, albumId);
}

export function getAlbumTracks(id) {
    return db.prepare(`
        SELECT t.TrackId 
        FROM albums al 
        INNER JOIN tracks t ON t.AlbumId = al.AlbumId 
        WHERE al.AlbumId = 1;
    `).all().map(v => v.TrackId);
}
