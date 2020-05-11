var express = require("express")
var app = express()
var fs = require("fs")

var products = fs.readFileSync('data/productsDataBase.json', {encoding: "utf-8"})
products = JSON.parse(products)

function binarySearchId(array, frst, lst, id) {
    let mid = Math.floor((frst + lst)/2)

    if (array[mid].id == id) {
        return mid
    }

    if(frst > lst) {
        return -1
    }

    if(array[mid].id > id) {
        return binarySearchId(array, frst, mid - 1, id)
    }

    if(array[mid].id < id) {
        return binarySearchId(array, mid + 1, lst, id)
    }
}


let indexViewController = {
    homeProducts: (req, res) => {
        res.render("index", {products: products})
    },

    productDetail: (req, res) => {
        let reqParams = req.params
        let productId = reqParams.id
        let productCategory = reqParams.category

        let productIndex = binarySearchId(products, 0, products.length, productId)
    
        res.render("productDetail", {product: products[productIndex]})
    },

    allProducts: (req, res) => {
        res.render("allProducts", {products: products})
    },

    productDelete: (req, res) => {
        let productId = req.params.id

        let newProductsArray = products.filter (prod => {
            return prod.id != productId
        })


        fs.writeFileSync("./data/productsDataBase.json", JSON.stringify(newProductsArray))

        res.redirect('/')
    },

    productToEdit: (req, res) => {
        let productId = req.params.id
        let productIndex = binarySearchId(products, 0, products.length, productId)

        res.render('productsEdit', {product: products[productIndex]})
    },

    productEdit: (req, res, next) => {
        console.log('put')
        console.log("--------------------------------->", req.body)
        console.log('end')


        res.send("Llegamos aca!!!!!!!")
    },

    productCreate: (req, res) => {
        res.render("productCreate")
    },

    productPublicar: (req, res, next) => {
        let newProduct = req.body
        let newProductId = products[products.length-1].id +1

        newProduct.id = newProductId
        
        products.push(newProduct)

        if (req.files == []) {
            newProduct.image = ""
        } else {
            newProduct.image = req.files[0].filename
        }

        fs.writeFileSync("./data/productsDataBase.json", JSON.stringify(products))
        
        res.redirect('/')
    }

}

module.exports = indexViewController