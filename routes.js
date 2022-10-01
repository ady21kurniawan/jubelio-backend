const {hello_world, products} = require("./controllers/index")

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: hello_world
    },
    {
        method: 'GET',
        path: '/products',
        handler: products
    }
];

module.exports = routes;