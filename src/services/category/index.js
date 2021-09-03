import express from "express"
import q2m from "query-to-mongo"

import CategoryModel from "./schema.js"

const categoryRouter = express.Router()

categoryRouter.post("/", async (req, res, next) => {
    try {
      const newCategory = new CategoryModel(req.body) // here happens validation of the req.body, if it's not ok mongoose will throw a "ValidationError"
      const { _id } = await newCategory.save()
  
      res.status(201).send({ _id })
    } catch (error) {
      next(error)
    }
  })

  categoryRouter.get("/", async (req, res, next) => {
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

  categoryRouter.delete("/:categoryId", async(req,res,next) => {
    try {
      const categoryId = req.params.categoryId
  
      const deletedcategory = await CategoryModel.findByIdAndDelete(categoryId)
  
      if(deletedcategory){
        res.status(204).send()
      } else {
        next(createError(404, `blog with id ${categoryId} not found!`))
      }
    } catch (error) {
      next(error)
    }
  })

export default categoryRouter