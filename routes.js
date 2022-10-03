const {listProducts,addProduct, deleteProduct,updateProduct,showProducts} = require("./controllers/index");

const routes = [
    {
        method: 'GET',
        path: '/products/{limit?}',
        handler: listProducts,
       
    },
    {
        method: 'GET',
        path: '/show-product/{offset?}',
        handler: showProducts,
       
    },
    {
        method: 'POST',
        path: '/add-product',
        options:{
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                timeout: false,
                multipart : true
            }
        },
        handler: addProduct
       
    },
    {
        method: 'GET',
        path: '/image/{filename}',
        handler: function (request, h) {
            return h.file( request.params.filename );
        }
    },
    {
        method: 'DELETE',
        path: '/delete-product/{sku}',
        handler: deleteProduct
    },
    {
        method: 'PUT',
        path: '/update-product',
        options:{
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                timeout: false,
                multipart : true
            }
        },
        handler: updateProduct
    }
];

module.exports = routes;