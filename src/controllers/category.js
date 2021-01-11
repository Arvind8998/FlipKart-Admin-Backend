const slugify = require('slugify')
const Category = require('../models/category')

function createCategories(categories,parentId=null){
    const categoryList = []
    let category
    if(parentId == null){
        category = categories.filter(cat=>cat.parentId == undefined)
    }
    else{
        category = categories.filter(cat=>cat.parentId == parentId)
    }
    for(let cat of category){
        categoryList.push({
            _id: cat._id,
            name: cat.name,
            slug: cat.slug,
            children: createCategories(categories, cat._id)
        })
    }
    return categoryList
}

exports.addCategory = (req,res)=>{

    const {name,parentId} = req.body
    const categoryObj = {
        name,
        slug: slugify(name),
    }
    if(parentId){
        categoryObj.parentId = parentId
    }
    const cat = new Category(categoryObj)
    cat.save((error,category)=>{
        if(error){
             return res.status(400).send({error})
        }
        if(category){
            
            return res.status(200).send({category})
        }
    })
}

exports.getCategories = (req,res)=>{
    Category.find({})
    .exec((error,categories)=>{
        if(error){
            return res.status(400).send({error})
        }
       if(categories){
            const categoryList = createCategories(categories)
            return res.status(200).send({categoryList})
        }
    })
}