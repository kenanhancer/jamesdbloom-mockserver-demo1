const { host = "localhost", port = 1080 } = process.env;
const target = `http://${host}:${port}`;

module.exports = {
    host,
    port,
    target
}