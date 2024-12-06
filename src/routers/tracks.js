import { Router } from "express";
import { createTrack, deleteTrack, editTrack, getTrack, getTrackAlbum, getTrackGenre, getTrackMediaType, getTrackPlaylists, getTracks, setTrackAlbum, setTrackGenre, setTrackMediaType } from "../services/track.js";

export const tracksRouter = Router();

tracksRouter.get("/", (req, res) => {
    const tracks = getTracks();

    res.json(tracks);
})

tracksRouter.post("/", (req, res) => {
    const data = req.body;
    const trackId = createTrack(data.name, data.composer, data.milliseconds, data.bytes);

    res.json(trackId);
})

tracksRouter.get("/:id", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        return res.status(400);
    }

    res.json(track);
})

tracksRouter.put("/:id", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const data = req.body;
    const trackId = editTrack(req.params.id, data.name, data.composer, data.milliseconds, data.bytes);

    res.json(trackId);
})

tracksRouter.delete("/:id", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    deleteTrack(req.params.id);

    res.send();
})

tracksRouter.get("/:id/album", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const album = getTrackAlbum(req.params.id);

    res.json(album);
})

tracksRouter.put("/:id/album", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const data = req.body;
    const albumId = setTrackAlbum(req.params.id, data.id);

    res.json(albumId);
})

tracksRouter.get("/:id/genre", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const genre = getTrackGenre(req.params.id);

    res.json(genre);
})

tracksRouter.put("/:id/genre", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const data = req.body;
    const genreId = setTrackGenre(req.params.id, data.id);

    res.json(genreId);
})

tracksRouter.get("/:id/media-type", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const mediaType = getTrackMediaType(req.params.id);

    res.json(mediaType);
})

tracksRouter.put("/:id/media-type", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const data = req.body;
    const mediaTypeId = setTrackMediaType(req.params.id, data.id);

    res.json(mediaTypeId);
})

tracksRouter.get("/:id/playlists", (req, res) => {
    const track = getTrack(req.params.id);

    if (!track) {
        res.status(404).send();
    }

    const trackPlaylists = getTrackPlaylists(req.params.id);

    res.json(trackPlaylists);
})

export default tracksRouter;