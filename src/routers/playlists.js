import { Router } from "express";
import { getPlaylists } from "../services/playlist.js";

export const playlistsRouter = Router();

playlistsRouter.get("/", (req, res) => {
    const playlists = getPlaylists();

    res.json(playlists);
})

export default playlistsRouter;