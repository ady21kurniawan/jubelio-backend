# jubelio-backend
# node version v14.20.0
# ganti versi node jika mengalami kendala

1. jalankan perintah 'npm install'
2. create .env dan masukan parameter database (user, password, dan nama database)
3. jalankan 'knex migrate:up'
4. jalankan 'knex seed:run' (peintah ini akan mengisi table product yang datanya berasal dari api http://api.elevenia.co.id/rest/prodservices/product/listing)
5. import file jubelio.postman_collection.json ke postman
6. pastikan data header terisi minimal dengan data : x-api-key:guest