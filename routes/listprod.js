const express = require('express');
const router = express.Router();
const sql = require('mssql');
const bodyParser = require('body-parser')

router.use(function(req, res, next){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader('Access-Control-Allow-Methods', '*')
    next();
})

router.use(bodyParser.json())

router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');

    (async function() {
        try{
            let pool = await sql.connect(dbConfig)

            res.write('<p>Connected to Product Summary</p>')

            // Get the product name to search for
            let name = req.query.productName;
            console.log(name)

            /** $name now contains the search string the user entered
             Use it to build a query and print out the results. **/
            let pst = "SELECT * FROM product"

            /** Create and validate connection **/
            results = await pool.request().query(pst)

            /** Print out the ResultSet **/
            res.write("<table><tr><th>ProductId</th><th>ProductName</th></tr>")
            for( let i = 0; i < results.recordset.length; i++) {
                let result = results.recordset[i]
                res.write("<tr><td>" + result.productId + "</td>" + "<td>" + result.productName + "</td></tr>")
            }
            res.write("</table>")

            /**
             For each product create a link of the form
             addcart?id=<productId>&name=<productName>&price=<productPrice>
             **/
            res.end();
        } catch (err){
            console.dir(err)
        }
    })();

    /**
        Useful code for formatting currency:
        let num = 2.89999;
        num = num.toFixed(2);
    **/
});

router.post('/', function(req, res, next) {
    console.log(req.body.product);
    (async function() {
        try{
            let pool = await sql.connect(dbConfig)

            const product = req.body.product

            const ps = new sql.PreparedStatement(pool)
            ps.input('param', sql.VarChar(40))
            await ps.prepare("SELECT * FROM product WHERE productName LIKE '%' + @param + '%'")

            results = await ps.execute({param: product})
            let result = results.recordset

            await ps.unprepare()

            console.log(result)

            res.send(result)
        } catch (err){
            console.dir(err)
        }
    })();
})

module.exports = router;
