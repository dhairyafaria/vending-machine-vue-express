# vending-machine-vue-express

It is a simple vending machine example which uses Vue js in front end & Node js + Express js in backend. Also it uses sqlite3 for database with knex library as a bridge between express and sqlite3.

You can check the test coverage by running unit test case once and the open "coverage\Icove-report\index.html" file.

Frontend is running on http://localhost:8080/
Backend is running on http://localhost:3000/
Backend endpoint are:
1. Get All products  
    Get: http://localhost:3000/api/products

2. Update Product
    Patch: http://localhost:3000/api/products/update/:id
    data: product object in json format
    example product: {id: 1, name: 'apple', price: 10, quantity: 10}


You can use sqlite DB browser to Add/update/delete/select on database. Also you can check all purchases in database.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```


### run server and frontend simultaneously
```
npm run start
```

### run server
```
npm run start-server
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests and coverage too
```
npm run test:unit
```


### Run your unit tests with debug mode with chrome inspect
```
npm run test:debug-brk
```


### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
