import { Router } from "express";
import { addTrackToPlaylist, createPlaylist, deletePlaylist, editPlaylist, getPlaylist, getPlaylists, getPlaylistTracks, removeTrackFromPlaylist } from "../services/playlist.js";
import { getTrack } from '../services/track.js';

export const playlistsRouter = Router();

playlistsRouter.get("/", (req, res) => {
    const playlists = getPlaylists();

    res.json(playlists);
})

playlistsRouter.post("/", (req, res) => {
    const data = req.body;
    const playlistId = createPlaylist(data.name);

    res.json(playlistId);
})

playlistsRouter.get("/:id", (req, res) => {
    const playlist = getPlaylist(req.params.id);

    if (!playlist) {
        res.status(404).send();
    }

    res.json(playlist);
})

playlistsRouter.put("/:id", (req, res) => {
    const playlist = getPlaylist(req.params.id);

    if (!playlist) {
        res.status(404).send();
    }

    const data = req.body;
    const playlistId = editPlaylist(req.params.id, data.name);

    res.json(playlistId);
})

playlistsRouter.delete("/:id", (req, res) => {
    const playlist = getPlaylist(req.params.id);

    if (!playlist) {
        res.status(404).send();
    }

    deletePlaylist(req.params.id);

    res.send();
})

playlistsRouter.get("/:id/tracks", (req, res) => {
    const playlist = getPlaylist(req.params.id);

    if (!playlist) {
        res.status(404).send();
    }

    const tracks = getPlaylistTracks(req.params.id);

    res.json(tracks);
})

playlistsRouter.post("/:id/tracks", (req, res) => {
    const playlist = getPlaylist(req.params.id);

    if (!playlist) {
        res.status(404).send();
    }

    const data = req.body;
    const track = getTrack(data.id);

    if (!track) {
        res.status(400).send();
    }

    const playlistId = addTrackToPlaylist(data.id, req.params.id);

    res.json(playlistId);
})

playlistsRouter.delete("/:playlistId/tracks/:trackId", (req, res) => {
    const playlist = getPlaylist(req.params.playlistId);

    if (!playlist) {
        res.status(404).send();
    }

    const track = getTrack(req.params.trackId);

    if (!track) {
        res.status(400).send();
    }

    removeTrackFromPlaylist(req.params.trackId, req.params.playlistId);

    res.send();
})

export default playlistsRouter;