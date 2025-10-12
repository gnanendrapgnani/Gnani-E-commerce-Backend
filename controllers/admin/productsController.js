const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

// These controller is For Uploading image
const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log("Error Form image upload",error);
    res.json({
      success: false,
      message: "Error Occoured",
    });
  }
};

// This Controller for add a new Product
const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStocks,
    } = req.body;

    const newlyCreatedProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStocks,
    });

    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
      message: "Product Created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// This constroller for fetching all the added Product

const fetchAllProducts = async (req, res) => {
  try {
    const listOfProduct = await Product.find({});
    res.status(201).json({ success: true, data: listOfProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// This controller for edit product
const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStocks,
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice =
      salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStocks = totalStocks || findProduct.totalStocks;
    findProduct.image = image || findProduct.image;

    await findProduct.save();

    res.status(201).json({
      success: true,
      data: findProduct,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

// This controller is for Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const product = await Product.findByIdAndDelete(id);
    // console.log(product);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted SuccessFully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error Occured",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  editProduct,
  fetchAllProducts,
  deleteProduct,
};
