import { Product } from '../models/productModel.js'

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({ attributes: ['id', 'title', 'price', 'createdAt', 'updatedAt'] })
        res.json(products)
    } catch (error) {
        res.json({ message: error.message })
    }
}
const getProductById = async (req, res) => {
    try {
        const product = await Product.findAll({
            where: {
                id: req.params.id
            }, attributes: ['id', 'title', 'price', 'createdAt', 'updatedAt']
        })
        res.json(product)
    } catch (error) {
        res.json({ message: error.message })
    }
}
const createProduct = async (req, res) => {
    try {
        await Product.create(req.body)
        res.json({
            'message': "Product Created"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
const updateProduct = async (req, res) => {
    try {
        await Product.update(req.body,{
            where:{
                id:req.params.id
            }
        })
        res.json({
            'message': "Product Updated"
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
const deleteProduct = async (req, res) => {
    const data=req.params.id.split(',')
    const result=data.map(Number)
    try {
        await Product.destroy({
            where:{
                id:result
            }
        })
        res.json({
            'message': 'Delete Success'
        })
    } catch (error) {
        res.json({ message: error.message })
    }
}
export { getAllProducts, createProduct, getProductById,updateProduct,deleteProduct}