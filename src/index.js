import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './specification.json' with {type: 'json'}
import log from './services/log.js'
import server from './services/server.js'

import albumsRouter from './routers/albums.js';
import artistsRouter from './routers/artists.js';
import genresRouter from './routers/genres.js';
import mediaTypesRouter from './routers/mediaTypes.js';
import playlistsRouter from './routers/playlists.js';
import tracksRouter from './routers/tracks.js';
import logger from './middlewares/logger.js';

const PORT = 10000;
server.use(logger);

swaggerDocument.servers[0].url = `http://localhost:${PORT}`
server.use('/reference/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use('/v1/albums/', albumsRouter);
server.use('/v1/artists/', artistsRouter);
server.use('/v1/genres/', genresRouter);
server.use('/v1/media-types/', mediaTypesRouter);
server.use('/v1/playlists/', playlistsRouter);
server.use('/v1/tracks/', tracksRouter);

server.listen(PORT, () => {
    log();
    log(`Server running on port ${PORT}!`);
    log();
    log(`API Root - http://localhost:${PORT}`);
    log(`Reference - http://localhost:${PORT}/reference`);
    log();
    log("----------------------------------------------");
    log();
})