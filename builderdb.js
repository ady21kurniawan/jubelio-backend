const axios = require('axios').default;
var parser = require('xml2json');
const config = require("./knexfile");
const knex = require("knex")(config);


const init = async () =>{
    var results = await axios.get('http://api.elevenia.co.id/rest/prodservices/product/listing', {
        headers:{
            "openapikey":"721407f393e84a28593374cc2b347a98"
        }
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.log(error);
    });

    var json = parser.toJson( await results);
    console.log( JSON.parse(json));
    var data = JSON.parse(json);
    return data["Products"]["product"];
}

module.exports = init;