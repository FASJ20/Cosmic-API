import { Product } from "../models/Product.model.js";
import { authenticateToken, authenticateRefreshToken } from "../middleware/auth.middleware.js";

// To Show all the products available
export const ShowAllProducts = async (req, res) => {
    
    try {
        let products = await Product.find()
        if (!products) return res.status(404).json({message: "No Products found"})
        res.status(200).json(products)
    } catch (err){
        console.error(err)
        res.status(500).json({message: err})
    }
}
// To get product by id
export const GetOneProduct = async (req, res) => {
    const {params: id} = req
    try{
        const product = await Product.findOne({_id:id.id})
        if (!product) return res.status(404).json({message: "Product not found"})
        res.status(201).json(product)

    } catch (err){
       console.error(err)
       res.status(500).json({message: err}) 
    }
}
// Add product
export const addProduct = async (req, res) =>{
    const {body} = req;
    try{
        const AddProd = new Product ({...body})
        await AddProd
        .save()
        .then((product) => {
        console.log("product created successfully:", product.toJSON());
        return res.status(201).json(product); // Returns the user in a Json format
      })
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: err}) 
    }
}
// To update product
export const updateProduct = async (req, res) => {
    const {body, params:id} = req;
    try {
        const UpdateProd = await Product.updateOne({ _id: id.id }, {$set: body}, {updatedat: new Date()});
        console.log(UpdateProd)
        return res.json({message: "updated successfully"})
    } catch (err) {
        res.status(500).json({message: err}) 
    }
}
// To delete products
export const deleteProduct = async (req, res) => {
        const {params:id} = req;
    try {
        const DeleteProd = await Product.deleteOne({ _id: id.id });
        return res.json({message: "deleted successfully"})
    } catch (err) {
        console.error(err)
        res.status(500).json({message: err}) 
    }
}


//To add reviews
export const GetReviews = async (req, res) => {
    const {body, params: id} = req
    try{
        const product = await Product.findOne({ _id: id.id });
        console.log(product.ratings._id)
        product.ratings = {
            rating: body.rating ? body.rating : product.ratings.rating,
            review: body.review ? body.review : product.ratings.review
        }
        console.log(product)
        res.json(product)
       
    } catch (err){
       console.error(err) 
       res.status(500).json({message: err}) 
    }
}