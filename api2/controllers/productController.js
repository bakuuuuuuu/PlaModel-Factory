import pool from '../db.js';

// 모든 상품 정보 가져오기
export const getAllProducts = async (req, res) => {
    try {
        console.log('getAllProducts');
        const [rows] = await pool.query(
            `SELECT
                p.id AS id,
                p.productName AS name,
                p.description AS product_description,
                p.price AS new_price,
                p.discountedPrice AS old_price,
                p.inventory AS inventory,
                p.manufacturer AS manufacturer,
                p.isNewProduct AS isNewProduct,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                c.name AS category,
                t.name AS type
            FROM
                products p
            LEFT JOIN
                productImages i ON p.id = i.product_id
            INNER JOIN
                categories c ON p.category_id = c.id
            INNER JOIN
                types t ON p.type_id = t.id`
        );
        console.log(rows);
        res.status(200).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 카테고리 이름으로 상품 정보 가져오기
export const getCategoriesProducts = async (req, res) => {
    try {
        const { catename } = req.params;
        console.log('catename : ', catename);
        const [rows] = await pool.query(
            `SELECT
                p.id AS id,
                p.productName AS name,
                p.description AS product_description,
                p.price AS new_price,
                p.discountedPrice AS old_price,
                p.inventory AS inventory,
                p.isNewProduct AS isNewProduct,
                p.manufacturer AS manufacturer,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                c.name AS category,
                t.name AS type
            FROM
                products p
            LEFT JOIN
                productImages i ON p.id = i.product_id
            INNER JOIN
                categories c ON p.category_id = c.id
            INNER JOIN
                types t ON p.type_id = t.id
            WHERE
                c.name = ?`, [catename]
        );
        res.status(200).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 타입 이름으로 상품 정보 가져오기
export const getTypesProducts = async (req, res) => {
    try {
        const { typename } = req.params;
        console.log('typename : ', typename);
        const [rows] = await pool.query(
            `SELECT
                p.id AS id,
                p.productName AS name,
                p.description AS product_description,
                p.price AS new_price,
                p.discountedPrice AS old_price,
                p.inventory AS inventory,
                p.isNewProduct AS isNewProduct,
                p.manufacturer AS manufacturer,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                c.name AS category,
                t.name AS type
            FROM
                products p
            LEFT JOIN
                productImages i ON p.id = i.product_id
            INNER JOIN
                categories c ON p.category_id = c.id
            INNER JOIN
                types t ON p.type_id = t.id
            WHERE
                t.name = ?`, [typename]
        );
        res.status(200).json({ rows: rows });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 특정 상품 정보 가져오기
export const getIDProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query(
            `SELECT
                p.id AS id,
                p.productName AS name,
                p.description AS product_description,
                p.price AS new_price,
                p.discountedPrice AS old_price,
                p.inventory AS inventory,
                p.manufacturer AS manufacturer,
                p.isNewProduct AS isNewProduct,
                p.created_at AS product_created_at,
                p.updated_at AS product_updated_at,
                i.id AS image_id,
                i.url AS image,
                c.name AS category,
                t.name AS type
            FROM
                products p
            LEFT JOIN
                productImages i ON p.id = i.product_id
            INNER JOIN
                categories c ON p.category_id = c.id
            INNER JOIN
                types t ON p.type_id = t.id
            WHERE
                p.id = ?`, [id]
        );
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 상품 생성
export const createProduct = async (req, res) => {
    const { productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct } = req.body;
    try {
        const [result] = await pool.query('INSERT INTO products (productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct]);
        res.status(201).json({ id: result.insertId, productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 상품 업데이트
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct } = req.body;
    try {
        const [result] = await pool.query('UPDATE products SET productName = ?, price = ?, discountedPrice = ?, description = ?, category_id = ?, type_id = ?, inventory = ?, manufacturer = ?, isNewProduct = ? WHERE id = ?', [productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct, id]);
        if (result.affectedRows > 0) {
            res.status(200).json({ id, productName, price, discountedPrice, description, category_id, type_id, inventory, manufacturer, isNewProduct });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 상품 삭제
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
        if (result.affectedRows > 0) {
            res.status(204).json();
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};