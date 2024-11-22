import log from "../services/log.js";

export function logger(req, res, next) {
    log(`${req.method} ${req.path}`);

    console.log(req.body);

    next();
}

export default logger;