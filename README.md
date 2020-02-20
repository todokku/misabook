# MisaBook

MisaBook is a webapp using reactjs on client and expressjs, mongodb on server.

## Clone

Use Git to clone repository

```bash
$ git clone https://github.com/misa198/misabook.git
```

## Require
* Node
* Yarn
* Mongodb

## Usage

```bash
$ cd misabook

# Server
# Create database by mongodb
# Add file .env includes
# PORT, MONGO_URL, TOKEN_SECRET, PER_PAGE
$ cd book-store-server
$ yarn install
$ yarn dev # Run with nodemon
$ yarn start # node index.js

# Client
# Change axios base url folowing the port on server
$ cd book-store-client
$ yarn install
$ yarn start
```

## API

```bash
#--- Require token in header ---
# Get all the books
GET http://localhost:PORT/books
# Post one or many books
http://localhost:PORT/books
# Get all the orders
http://localhost:PORT/orders
# Get all the messages
http://localhost:PORT/message
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
