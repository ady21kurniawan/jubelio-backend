const Hapi = require('@hapi/hapi');
const routes = require("./routes");
const Path = require("path");
const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'upload')
            }
        }
    });
    await server.register(require('@hapi/inert'));
    server.route(routes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
init();