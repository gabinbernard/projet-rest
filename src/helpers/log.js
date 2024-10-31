export function log(msg) {
    const time = new Date().getTime();
    console.log(`[ API | ${time} ]${msg && msg.length > 0 ? ` ${msg}` : ''}`);
}

export default log;