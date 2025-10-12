const express = require("express");
const { getFilterProduct, getProductdetails } = require("../../controllers/shop/product-controller");



const router = express.Router();
router.get("/get", getFilterProduct);
router.get("/get/:id", getProductdetails);

module.exports = router;
