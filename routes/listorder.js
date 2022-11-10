const express = require('express');
const router = express.Router();
const sql = require('mssql');
const moment = require('moment');

router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*')
    let results

    /** Create connection, and validate that it connected successfully **/
    (async function() {
        try{
            let pool = await sql.connect(dbConfig)

            let sqlQuery = "SELECT * FROM orderSummary"

            results = await pool.request().query(sqlQuery)

            // res.write("<table><tr><th>OrderId</th><th>Total Amount</th></tr>")
            // for( let i = 0; i < results.recordset.length; i++) {
            let result = results.recordset
            //     res.write("<tr><td>" + result.orderId + "</td>" + "<td>" + result.totalAmount+ "</td></tr>")
            // }
            // res.write("</table>")
            res.send(result)

        } catch (err){
            console.dir(err)
        }
    })();

    /**
    Useful code for formatting currency:
        let num = 2.87879778;
        num = num.toFixed(2);
    **/

    /** Write query to retrieve all order headers **/

    /** For each order in the results
            Print out the order header information
            Write a query to retrieve the products in the order

            For each product in the order
                Write out product information 
    **/
});

module.exports = router;
