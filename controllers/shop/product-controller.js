const Product = require("../../models/Product");

const getFilterProduct = async (req, res) => {
  // console.log("Product get list hited")
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;
    // console.log(category)
    const normalize = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;          // Already an array
      if (typeof value === "string") return value.split(","); // Comma-separated string
      return [];
    };

    const categories = normalize(category);
    const brands = normalize(brand);

    let filters = {};
    if (categories.length) filters.category = { $in: categories };
    if (brands.length) filters.brand = { $in: brands };

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;
        break;
      case "price-hightolow":
        sort.price = -1;
        break;
      case "title-atoz":
        sort.title = 1;
        break;
      case "title-ztoa":
        sort.title = -1;
        break;
      default:
        sort.price = 1;
    }

    // console.log("Filters:", filters);
    // console.log("Sort:", sort);

    const products = await Product.find(filters).sort(sort);

    // console.log(products)
    res.status(200).json({ success: true, data: products, category, brand, sortBy });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Some error occurred" });
  }
};

module.exports = { getFilterProduct };
