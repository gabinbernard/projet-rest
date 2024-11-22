import { Router } from "express";
import { getTracks } from "../services/track.js";

export const tracksRouter = Router();

tracksRouter.get("/", (req, res) => {
    const tracks = getTracks();

    res.json(tracks);
})

export default tracksRouter;