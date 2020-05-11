var express = require("express")
var router = express.Router()
const multer = require("multer")
const path = require("path")

const indexViewController = require("../controllers/indexViewController")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },

    filename: (req, file, cb) => {
        cb(null, file.fieldname + ' ' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({storage: storage})


router.get('/', indexViewController.allProducts)
router.get('/detail/:id', indexViewController.productDetail)
router.delete('/delete/:id', indexViewController.productDelete)
router.get('/edit/:id', indexViewController.productToEdit)
router.put('/edit', indexViewController.productEdit)
router.get('/create', indexViewController.productCreate)
router.post('/create', upload.any(), indexViewController.productPublicar)


module.exports = router