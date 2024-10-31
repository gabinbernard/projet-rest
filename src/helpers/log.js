export function log(msg) {
    console.log(`[ API ]${msg.length > 0 ? ' - ' : ''}${msg}`);
}

export default log;