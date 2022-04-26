const Product = require('../models/Product');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors/index');
const path = require('path');

const createProduct = async (req,res) => {
    req.body.user = req.user.userId;
    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({product});
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({products,count: products.length});
}

const getSingleProduct = async (req,res) => {
    const {id : productId} = req.params
    const product = await Product.findOne({_id: productId});
    if(!product) throw CustomError.NotFoundError(`No product with id : ${productId}`)
    res.status(StatusCodes.OK).json({product});
}

const updateProduct = async (req,res) => {
    const {id : productId} = req.params
    const product = await Product.findOneAndUpdate({_id: productId},req.body,{new:true,runValidators:true});
    if(!product) throw CustomError.NotFoundError(`No product with id : ${productId}`)
    res.status(StatusCodes.OK).json({product});
}

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
    if (!product) throw CustomError.NotFoundError(`No product with id : ${productId}`);
    await product.remove();
  res.status(StatusCodes.OK).json({ msg : "Product removed successfully" });
};

const uploadProductImage = async(req,res) => {
    console.log(req.files);
    if(!req.files){
        throw CustomError.BadRequestError(`No file found to upload`);
    }
    const productImage = req.files.image;
    const maxSize = 1024 * 1024;
    if(productImage.size > maxSize){
        throw CustomError.BadRequestError(`Max allowed size is 1 MB`);
    }
    if(!productImage.mimeType.startsWith('image')) throw CustomError.BadRequestError(`Please upload jpeg image`);


    const imagePath = path.join(__dirname,'../public/uploads/' + `${productImage.name}`)
    await productImage.mv(imagePath);
    res.status(StatusCodes.OK).json({image : `/uploads/${productImage.name}`})
}



module.exports = { createProduct ,getSingleProduct,getAllProducts, updateProduct , deleteProduct , uploadProductImage};
