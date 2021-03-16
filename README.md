# Setup Program

1. git clone server API
- Install Nodejs
- Install postgres
+ Create database name: instagram and follow: file db_client.js
```
var connectionString = "postgres://postgres:postgres@localhost:5432/instagram";
```
+ Create table and insert data: cd project, open terminal
```
npm run db_create_table
npm run db_insert_data
```
+ Run server
```
cd src
node server.js
```
2. Clone front-end
```
git clone https://github.com/NguyenVanKhoi2603/server-api-post.git
```
3. Run
````
serve
````