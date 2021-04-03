const knex = require("./knex");

function getAllProducts() {
    return knex("products").select("*");
}

function addProduct(product) {
    return knex("products").insert(product);
}

function updateProduct(id, product) {
    return knex("products").where("id", id).update(product);
}

module.exports = {
    getAllProducts,
    addProduct,
    updateProduct
}