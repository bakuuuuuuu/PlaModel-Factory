import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        next(err);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        next(err);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted.");
    } catch (err) {
        next(err);
    }
};

export const getProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        next(err);
    }
};

export const getProducts = async (req, res, next) => {
    const { limit, ...others } = req.query;
    try {
        const Products = await Product.find({
            ...others
        }).limit(parseInt(limit) || 0);
        res.status(200).json(Products);
    } catch (err) {
        next(err);
    }
};


export const countByCategory = async (req, res, next) => {
    const categorys = req.query.categorys.split(",");
    try {
        const list = await Promise.all(
            categorys.map((category) => {
                return Product.countDocuments({ category: category });
            })
        );
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
        const EGCount = await Product.countDocuments({ type: "EG" });
        const HGCount = await Product.countDocuments({ type: "HG" });
        const RGCount = await Product.countDocuments({ type: "RG" });
        const MGCount = await Product.countDocuments({ type: "MG" });
        const PGCount = await Product.countDocuments({ type: "PG" });
        const FRSCount = await Product.countDocuments({ type: "Figure Rise Standard" });
        const FRSACount = await Product.countDocuments({ type: "Figure Rise Standard Amplified" });

        res.status(200).json([
            { type: "EG", count: EGCount },
            { type: "HG", count: HGCount },
            { type: "RG", count: RGCount },
            { type: "MG", count: MGCount },
            { type: "PG", count: PGCount },
            { type: "Figure Rise Standard", count: FRSCount },
            { type: "Figure Rise Standard Amplified", count: FRSACount },
        ]);
    } catch (err) {
        next(err);
    }
};

// SEARCH
export const searchProducts = async (req, res, next) => {
    const query = req.query.q;
    try {
        const products = await Product.find({ productName: { $regex: query, $options: 'i' } });
        res.status(200).json(products);
    } catch (err) {
        next(err);
    }
};