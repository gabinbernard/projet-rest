import { Router } from "express";
import { createMediaType, deleteMediaType, editMediaType, getMediaType, getMediaTypes, getMediaTypeTracks } from "../services/mediaType.js";

export const mediaTypesRouter = Router();

mediaTypesRouter.get("/", (req, res) => {
    const mediaTypes = getMediaTypes();

    res.json(mediaTypes);
})

mediaTypesRouter.post("/", (req, res) => {
    const data = req.body;
    const mediaTypeId = createMediaType(data.name);

    res.json(mediaTypeId);
})

mediaTypesRouter.get("/:id", (req, res) => {
    const mediaType = getMediaType(req.params.id);

    if (!mediaType) {
        res.status(404).send();
    }

    res.json(mediaType);
})

mediaTypesRouter.put("/:id", (req, res) => {
    const mediaType = getMediaType(req.params.id);

    if (!mediaType) {
        res.status(404).send();
    }
    
    const data = req.body;
    const mediaTypeId = editMediaType(req.params.id, data.name)

    res.json(mediaTypeId);
})

mediaTypesRouter.delete("/:id", (req, res) => {
    const mediaType = getMediaType(req.params.id);

    if (!mediaType) {
        res.status(404).send();
    }

    deleteMediaType(req.params.id)

    res.send();
})

mediaTypesRouter.get("/:id/tracks", (req, res) => {
    const tracks = getMediaTypeTracks(req.params.id);

    if (!tracks) {
        res.status(404).send();
    }

    res.json(tracks);
})

export default mediaTypesRouter;