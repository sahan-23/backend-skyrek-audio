import Product from '../models/product.js';
import { isadmin } from './userController.js';

// this function is used to add a product
export function addProduct(req, res) {

    console.log(req.user);
    if (req.user == null) {
        res.status(401).json({
            message: "plaese Login and try again"
        })
        return;
    }
    if (req.user.role != "admin") {
        res.status(403).json({
            message: "You are not authorized to add product"
        })
        return;
    }
   
    const newProduct = req.body;
    const product = new Product(newProduct);

    product.save().then(
        () => {
            res.json({ "message": "Product Created Successfully" });
        }
    ).catch(
        () => {
            res.json({ "message": "Product Creation Failed" });
        }
    )
}
// this function is used to get all the products
export async function getProducts(req, res) {

    try {
        if (isadmin(req)) {
            const products = await Product.find();
            res.json(products);
        } else {
            const products = await Product.find({ availability: true });
            res.json(products);
        }
    }catch(err) {
        res.json({ "message": "Product Creation Failed" });
    }
}
// this function is used to get a single product
export async function updateProduct(req, res) {
    try {
        if (isadmin(req)) {
            const key = req.params.key;
            const data = req.body;
            await Product.updateOne({key: key}, data);
            res.json({ "message": "Product Updated Successfully" });
            return;
        } else {
            res.status(403).json({ "message": "You are not authorized to update product" });
        }
    }catch(err) {
        res.status(500).json({ "message": "Product Update Failed" });
    }
}
// this function is used to delete a product
export async function deleteProduct(req, res) {
    try{
        if (isadmin(req)) {
            const key = req.params.key;
            await Product.deleteOne({key: key});
            res.json({ "message": "Product Deleted Successfully" });
            return;
        }else{
            res.status(403).json({ "message": "You are not authorized to delete product" });
        }
    }catch(err) {
        res.json({ "message": "Product Deletion Failed" });
    }
}
