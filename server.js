const Hapi = require('@hapi/hapi');
const routes = require("./routes");
const Path = require("path");
require('dotenv').config()
const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors:{
                origin:["*"],
                headers:["Accept","Content-Type","Authorization","x-api-key"],
                additionalHeaders:["x-Requested-With"]
            },
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