export function log(msg) {
    const time = new Date().toISOString().split('T').join(' - ').split('.')[0];
    console.log(`[ ${time} ]${msg && msg.length > 0 ? ` ${msg}` : ''}`);
}

export default log;