import db from "./db.js";

export function getPlaylists() {
    return db.prepare(`
        SELECT p.PlaylistId
        FROM playlists p;
    `).all().map(v => v.PlaylistId);
}

export function getPlaylist(id) {
    return db.prepare(`
        SELECT p.Name
        FROM playlists p
        WHERE p.PlaylistId = ?;    
    `).get(id);
}

export function createPlaylist(id) {
    return db.prepare(`
        INSERT INTO playlists (Name)
        VALUES (?)
        RETURNING PlaylistId;
    `).get(id).PlaylistId;
}

export function editPlaylist(id, name) {
    return db.prepare(`
        UPDATE playlists
        SET Name = ?
        WHERE PlaylistId = ?
        RETURNING PlaylistId
    `).get(name, id).PlaylistId;
}

export function deletePlaylist(id) {
    return db.prepare(`
        DELETE FROM playlists
        WHERE PlaylistId = ?;
    `).run(id);
}

export function getPlaylistTracks(id) {
    return db.prepare(`
        SELECT t.TrackId
        FROM playlists p
        JOIN playlist_track pt on p.PlaylistId = pt.PlaylistId
        JOIN tracks t on t.TrackId = pt.TrackId
        WHERE pt.PlaylistId = ?
    `).all(id).map(v => v.TrackId);
}

export function addTrackToPlaylist(trackId, playlistId) {
    return db.prepare(`
        INSERT INTO playlist_track (TrackId, PlaylistId)
        VALUES (?, ?)
        RETURNING TrackId;
    `).get(trackId, playlistId).TrackId;
}

export function removeTrackFromPlaylist(trackId, playlistId) {
    return db.prepare(`
        DELETE FROM playlist_track
        WHERE TrackId = ? AND PlaylistId = ?; 
    `).run(trackId, playlistId);
}