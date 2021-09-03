import express from "express"
import createError from "http-errors"

import {ProductModel} from "./schema.js"

const productRouter = express.Router()

productRouter.post('/', async (req, res, next)=> {
    try {
        const newProduct = new ProductModel(req.body)
        const {_id} = await newProduct.save()

        res.status(201).send(`My unique id: ${_id}`)
    } catch (error) {
        next(error)
    }
})

productRouter.get("/", async(req,res,next) => {
    try {
      
      const products = await ProductModel.find({}).populate("category")
  
      res.send(products)
      
    } catch (error) {
      next(error)
    }
  })

  productRouter.get("/:productId", async(req,res,next) => {
    try {
      
      const productId = req.params.productId

    const product = await ProductModel.findById(productId) // similar to findOne()

    if(product){

      res.send(product)
    }
      
    } catch (error) {
      next(error)
    }
  })

  productRouter.put("/:productId", async(req,res,next) => {
    try {
      const productId = req.params.productId
  
      const modifiedproduct = await ProductModel.findByIdAndUpdate(productId, req.body, {
        new: true // returns the modified product
      })
  
      if(modifiedproduct){
        res.send(modifiedproduct)
      } else {
        next(createError(404, `product with id ${productId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

  productRouter.delete("/:productId", async(req,res,next) => {
    try {
      const productId = req.params.productId
  
      const deletedproduct = await ProductModel.findByIdAndDelete(productId)
  
      if(deletedproduct){
        res.status(204).send()
      } else {
        next(createError(404, `product with id ${productId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

export default productRouter