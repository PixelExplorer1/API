// 这是文章分类的路由模块
const express = require('express')
const router = express.Router()
// 导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handler/artcate')
// 导入数据验证的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则
const {add_article_schema,delete_cate_schema,get_cate_schema,update_cate_schema} = require('../schema/artcate')


// 获取文章分类列表数据的路由
router.get('/cates',artcate_handler.getArticleCates)

// 新增文章分类的路由
router.post('/addcates',expressJoi(add_article_schema),artcate_handler.addArticleCates)

// 删除文章分类的路由
router.get('/deletecate/:id',expressJoi(delete_cate_schema),artcate_handler.deleteCateById)

// 根据 ID 获取文章分类
router.get('/cates/:id',expressJoi(get_cate_schema),artcate_handler.getArtCateById)

// 更新文章分类的路由
router.post('/updatecate',expressJoi(update_cate_schema),artcate_handler.updateCateById)

// 发布新文章的路由
router.post('/add',artcate_handler.addArticle)

module.exports = router