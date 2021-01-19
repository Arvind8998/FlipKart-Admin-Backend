const slugify = require("slugify")
const Category = require("../models/category")

function createCategories(categories, parentId = null) {
  const categoryList = []
  let category
  if (parentId == null) {
    category = categories.filter((cat) => cat.parentId == undefined)
  } else {
    category = categories.filter((cat) => cat.parentId == parentId)
  }
  for (let cat of category) {
    categoryList.push({
      _id: cat._id,
      name: cat.name,
      slug: cat.slug,
      parentId: cat.parentId,
      children: createCategories(categories, cat._id),
    })
  }
  return categoryList
}

exports.addCategory = (req, res) => {
  const { name, parentId } = req.body
  const categoryObj = {
    name,
    slug: slugify(name),
  }
  if (parentId) {
    categoryObj.parentId = parentId
  }

  if (req.file) {
    categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename
  }

  const cat = new Category(categoryObj)
  cat.save((error, category) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (category) {
      return res.status(201).json({ category })
    }
  })
}

exports.getCategories = (req, res) => {
  Category.find({}).exec((error, categories) => {
    if (error) {
      return res.status(400).json({ error })
    }
    if (categories) {
      const categoryList = createCategories(categories)
      return res.status(200).json({ categoryList })
    }
  })
}

exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body
  const updateCategories = []
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
      }
      if (parentId[i] !== "") {
        category.parentId = parentId[i]
      }
      const updateCategory = await Category.findOneAndUpdate(
        { _id: _id[i] },
        category,
        { new: true }
      )
      updateCategories.push(updateCategory)
    }
    return res.status(200).json({ updateCategories: updateCategories})
  } else {
    const category = { name, type }
    if (parentId !== "") {
      category.parentId = parentId
    }
    const updateCategory = await Category.findOneAndUpdate({ _id }, category, {
      new: true,
    })
    return res.status(200).json({ updateCategory })
  }
}
