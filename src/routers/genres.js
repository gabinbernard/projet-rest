import { Router } from "express";
import { createGenre, deleteGenre, editGenre, getGenre, getGenres, getGenreTracks } from "../services/genre.js";

export const genresRouter = Router();

genresRouter.get("/", (req, res) => {
    const genres = getGenres();

    res.json(genres);
})

genresRouter.post("/", (req, res) => {
    const data = req.body;
    const genreId = createGenre(data.name);

    res.json(genreId);
})

genresRouter.get("/:id", (req, res) => {
    const genre = getGenre(req.params.id);

    if (!genre) {
        res.status(404).send();
    }

    res.json(genre);
})

genresRouter.put("/:id", (req, res) => {
    const genre = getGenre(req.params.id);

    if (!genre) {
        res.status(404).send();
    }
    
    const data = req.body;
    const genreId = editGenre(req.params.id, data.name)

    res.json(genreId);
})

genresRouter.delete("/:id", (req, res) => {
    const genre = getGenre(req.params.id);

    if (!genre) {
        res.status(404).send();
    }

    deleteGenre(req.params.id);

    res.send();
})

genresRouter.get("/:id/tracks", (req, res) => {
    const tracks = getGenreTracks(req.params.id);

    if (!tracks) {
        res.status(404).send();
    }

    res.json(tracks);
})

export default genresRouter;