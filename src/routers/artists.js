import { Router } from "express";
import { createArtist, deleteArtist, editArtist, getArtist, getArtistAlbums, getArtists } from "../services/artist.js";

export const artistsRouter = Router();

artistsRouter.get("/", (req, res) => {
    const artists = getArtists();

    res.json(artists);
})

artistsRouter.post("/", (req, res) => {
    const data = req.body;
    const artistId = createArtist(data.name);

    res.json(artistId);
})

artistsRouter.get("/:id", (req, res) => {
    const artist = getArtist(req.params.id);

    if (!artist) {
        res.status(404).send();
    }

    res.json(artist);
})

artistsRouter.put("/:id", (req, res) => {
    const artist = getArtist(req.params.id);

    if (!artist) {
        res.status(404).send();
    }
    
    const data = req.body;
    const artistId = editArtist(req.params.id, data.name)

    res.json(artistId);
})

artistsRouter.delete("/:id", (req, res) => {
    const artist = getArtist(req.params.id);

    if (!artist) {
        res.status(404).send();
    }

    deleteArtist(req.params.id);

    res.json();
})

artistsRouter.get("/:id/albums", (req, res) => {
    const albums = getArtistAlbums(req.params.id);

    if (!albums) {
        res.status(404).send();
    }

    res.json(albums);
})

export default artistsRouter;