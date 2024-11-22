import { Router } from "express";
import { createAlbum, deleteAlbum, editAlbum, editAlbumArtist, getAlbum, getAlbumArtist, getAlbums, getAlbumTracks } from "../services/album.js";

export const albumsRouter = Router();

albumsRouter.get("/", (req, res) => {
    const albums = getAlbums();
        
    res.json(albums);
})

albumsRouter.post("/", (req, res) => {
    const data = req.body;
    const albumId = createAlbum(data.name);

    res.send(albumId);
})

albumsRouter.get("/:id", (req, res) => {
    const album = getAlbum(req.params.id);

    if (!album) {
        res.status(404).send();
    }

    res.json(album);
})

albumsRouter.put("/:id", (req, res) => {
    const album = getAlbum(req.params.id);

    if (!album) {
        res.status(404).send();
    }
    
    const data = req.body;
    const albumId = editAlbum(req.params.id, data.name)

    res.json(albumId);
})

albumsRouter.delete("/:id", (req, res) => {
    const album = getAlbum(req.params.id);

    if (!album) {
        res.status(404).send();
    }

    deleteAlbum(req.params.id);

    res.json();
})

albumsRouter.get("/:id/artist", (req, res) => {
    const artist = getAlbumArtist(req.params.id);

    if (!artist) {
        res.status(404).send();
    }

    res.json(artist);
})

albumsRouter.put("/:id/artist", (req, res) => {
    const album = getAlbum(req.params.id);

    if (!album) {
        res.status(404).send();
    }

    const data = req.body;
    console.log(data);
    const artistId = editAlbumArtist(req.params.id, data.id)

    res.json(artistId)
})


albumsRouter.get("/:id/tracks", (req, res) => {
    const tracks = getAlbumTracks(req.params.id);

    if (!tracks) {
        res.status(404).send();
    }

    res.json(tracks);
})

export default albumsRouter;