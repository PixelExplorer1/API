const joi = require('@hapi/joi')

const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 校验规则对象 - 添加分类
exports.add_article_schema = {
    body:{
        name:joi.string().required(),
        alias:joi.string().alphanum().required()
    }
}

// 校验规则对象 - 删除分类
const id = joi.number().integer().min(1).required()
exports.delete_cate_schema = {
    params:{
        id,
    }
}

// 校验规则对象 - 根据 Id 获取文章分类
exports.get_cate_schema = {
    params:{
        id,
    }
}

// 校验规则对象 - 更新文章分类
exports.update_cate_schema = {
    body:{
        id,
        name,
        alias,
    }
}