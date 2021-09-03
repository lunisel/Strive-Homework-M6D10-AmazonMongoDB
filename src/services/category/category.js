import express from "express"
import createError from "http-errors"

import CategoryModel from "./CategorySchema.js"

const categoryRouter = express.Router()

categoryRouter.post('/', async (req, res, next)=> {
    try {
        const newCategory = new CategoryModel(req.body)
        const {_id} = await newCategory.save()

        res.status(201).send(`My unique id: ${_id}`)
    } catch (error) {
        next(error)
    }
})

categoryRouter.get("/", async(req,res,next) => {
    try {
        const query = q2m(req.query)
    
        console.log(query)
        
        const total = await CategoryModel.countDocuments(query.criteria)
        const categories = await CategoryModel.find(query.criteria, query.options.fields)
          .limit(query.options.limit)
          .skip(query.options.skip)
          .sort(query.options.sort) // no matter how I write them, mongo is going to apply  ALWAYS sort skip limit in this order
    
        res.send({ links: query.links("/categories", total), total, categories, pageTotal: Math.ceil(total / query.options.limit) })
      } catch (error) {
        next(error)
      }
  })

  /* productRCategoryRouterouter.get("/:productId", async(req,res,next) => {
    try {
      
      const productId = req.params.productId

    const product = await CategoryModel.findById(productId) // similar to findOne()

    if(product){

      res.send(product)
    }
      
    } catch (error) {
      next(error)
    }
  })

  CategoryRouter.put("/:productId", async(req,res,next) => {
    try {
      const productId = req.params.productId
  
      const modifiedproduct = await CategoryModel.findByIdAndUpdate(productId, req.body, {
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
 */
  categoryRouter.delete("/:categoryId", async(req,res,next) => {
    try {
      const categoryId = req.params.categoryId
  
      const deletedcategory = await CategoryModel.findByIdAndDelete(categoryId)
  
      if(deletedcategory){
        res.status(204).send()
      } else {
        next(createError(404, `category with id ${categoryId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

export default categoryRouter