const axios = require('axios').default;
var parser = require('xml2json');
const config = require("../knexfile");
const knex = require('knex')(config);
const fs = require('fs');


const listProducts = async (request, h)=>{
    if( request.headers["x-api-key"].toLowerCase() != 'guest' )
    {
        return {message:'unautorization - xapikey is required'}
    }

    var data = await knex.select().table('products');
    return {
        success:true,
        message:"success",
        data: data
    };
}

const addProduct = async (request, h)=>{
    if( request.headers["x-api-key"].toLowerCase() != 'guest' )
    {
        return {message:'unautorization - xapikey is required'}
    }
   try {
        var runningNumber = Math.floor(Math.random() * 10000);
        var dataFile = request.payload.file.hapi.filename.split(".");
        var filename = `${dataFile[0]}_${runningNumber}.${dataFile[1]}`;
        const upload =  new Promise((resolve, reject) => {
            fs.writeFile(`./upload/${filename}`, request.payload.file._data , err => {
            if (err) {
                reject(err)
            }
            resolve({ success:true, message: 'Upload successfully!' })
            })
        });
        var uploaded = await upload;
        if( uploaded.success )
        {
        
            var params = {
                images:`image/${filename}`,
                sku: request.payload.sku,
                name: request.payload.name,
                price: request.payload.price,
                description: request.payload.description
            }
            var raw = await knex('products').insert(params).returning('*');
        
            return {
                success: true,
                message : "data saved",
                data : params
            }
        }
        return {
            success: false,
            message : "data failed saved"
        }
   } catch (error) {
        console.log("error", error);
        return {
            success: false,
            message : error.detail
        }
   }

   
}

const deleteProduct = async (request, h) => {
    if( request.headers["x-api-key"].toLowerCase() != 'guest' )
    {
        return {message:'unautorization - xapikey is required'}
    }
   try {
        await knex( "products" ).del().where( "sku", request.params.sku);
        return {
            success: true,
            message : `sku ${request.params.sku} deleted successfully`
        }

   } catch (error) {
        return {
            success: false,
            message : error.detail
        }
   }

    
    
}

const updateProduct = async (request, h) => {
    if( request.headers["x-api-key"].toLowerCase() != 'guest' )
    {
        return {message:'unautorization - xapikey is required'}
    }

    if( ! request.payload.sku )
    {
        return {
            success: false,
            message : "sku required"
        };
    }
    var raw = await knex("products").where("sku", request.payload.sku ).select();
    if(! raw.length)
    {
        return {
            success: false,
            message : `product with sku ${request.payload.sku} not found`
        }
    }
    var params = {};
    if(request.payload.file)
    {
        var runningNumber = Math.floor(Math.random() * 10000);
        var dataFile = request.payload.file.hapi.filename.split(".");
        var filename = `${dataFile[0]}_${runningNumber}.${dataFile[1]}`;
        const upload = await new Promise((resolve, reject) => {
            fs.writeFile(`./upload/${filename}`, request.payload.file._data , err => {
            if (err) {
                reject(err)
            }
            resolve({ success:true, message: 'Upload successfully!' })
            })
        });

        if( upload.success)
        {
            params["images"] = `image/${filename}`;
        }else{
            return {
                success:false,
                message : "error upload file"
            }
        }
    }

    var available_columns = ['name','price','description'];
    Object.keys(request.payload).forEach((column)=>{
        if( available_columns.includes(column) )
        {
            params[column] = request.payload[column];
        }
    });

    console.log( params );

    var raw_update = await knex("products")
        .update(params)
        .where("sku", request.payload.sku)
        .then((res)=>{
            return res;
        })
        .catch((error)=>{
            return error;
        })
    ;
    
    if( ! raw_update )
    {
        return {
            success : false,
            message: "product failed updated !"
        }
    }
    return {
        success : true,
        message: "product updated successfully !"
    }
}

module.exports = {
    listProducts, 
    addProduct, 
    deleteProduct, 
    updateProduct
};