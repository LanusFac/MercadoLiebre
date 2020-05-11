var express = require('express');
var router = express.Router();
const indexViewController = require("../controllers/indexViewController")
const rutaProductos = require('./products')

/* GET home page. */
router.get('/', indexViewController.homeProducts);
router.use('/products', rutaProductos)

module.exports = router;
