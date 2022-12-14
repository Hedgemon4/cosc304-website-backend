const express = require('express');
const router = express.Router();
const sql = require('mssql');
const moment = require('moment');

router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'text/html');
    res.write("<title>YOUR NAME Grocery Order Processing</title>");

    let productList = false;
    if (req.session.productList && req.session.productList.length > 0) {
        productList = req.session.productList;
    }

    /**
    Determine if valid customer id was entered
    Determine if there are products in the shopping cart
    If either are not true, display an error message
    **/

    /** Make connection and validate **/

    /** Save order information to database**/


        /**
        // Use retrieval of auto-generated keys.
        sqlQuery = "INSERT INTO <TABLE> OUTPUT INSERTED.orderId VALUES( ... )";
        let result = await pool.request()
            .input(...)
            .query(sqlQuery);
        // Catch errors generated by the query
        let orderId = result.recordset[0].orderId;
        **/

    /** Insert each item into OrderedProduct table using OrderId from previous INSERT **/

    /** Update total amount for order record **/

    /** For each entry in the productList is an array with key values: id, name, quantity, price **/

    /**
        for (let i = 0; i < productList.length; i++) {
            let product = products[i];
            if (!product) {
                continue;
            }
            // Use product.id, product.name, product.quantity, and product.price here
        }
    **/

    /** Print out order summary **/

    /** Clear session/cart **/

    res.end();
});

module.exports = router;
