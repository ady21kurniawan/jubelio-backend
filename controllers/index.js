const axios = require('axios').default;
var parser = require('xml2json');
const hello_world = (request, h)=>{
    return "hello world new"
}

const products = async (request, h) =>{
    var results = await axios.get('http://api.elevenia.co.id/rest/prodservices/product/listing', {
        headers:{
            "openapikey":"721407f393e84a28593374cc2b347a98"
        }
    })
    .then(function (response) {
        // handle success
        return response.data;
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    });
   
    var json = parser.toJson(results);
    return json;
    
}

module.exports = {hello_world, products};