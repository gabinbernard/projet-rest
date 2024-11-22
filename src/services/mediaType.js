import db from "./db.js";

export function getMediaTypes() {
    return db.prepare(`
        SELECT m.MediaTypeId
        FROM media_types m;
    `).all().map(v => v.MediaTypeId);
}

export function getMediaType(id) {
    return db.prepare(`
        SELECT m.Name 
        FROM media_types m 
        WHERE m.MediaTypeId = ?;
    `).get(id);
}

export function createMediaType(name) {
    return db.prepare(`
        INSERT INTO media_types (Name) 
        VALUES (?)
        RETURNING MediaTypeId;
    `).run(name);
}

export function editMediaType(id, name) {
    return db.prepare(`
        UPDATE media_types
        SET Name = ?
        WHERE MediaTypeId = ?
        RETURNING MediaTypeId;
    `).get(name, id);
}

export function deleteMediaType(id) {
    return db.prepare(`
        DELETE FROM media_types
        WHERE MediaTypeId = ?
    `).run(id);
}

export function getMediaTypeTracks(id) {
    return db.prepare(`
        SELECT t.TrackId 
        FROM media_types m 
        INNER JOIN tracks t on m.MediaTypeId = t.MediaTypeId
        WHERE m.MediaTypeId = ?
    `).all(id).map(v => v.TrackId);
}