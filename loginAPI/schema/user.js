// 导入定义验证规则的包
const joi = require('@hapi/joi')


/* 
    string() 值必须是字符串
    alphanum() 值只能是包含 a-zA-Z0-9 的字符串
    min(length) 最小长度
    max(length) 最大长度
    required() 值是必填项，不能为 undefined
    pattern(正则表达式) 值必须符合正则表达式的规则 
*/

// 定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// 定义头像路径的验证规则
/* dataUri() 指的是如下格式的字符串数据：
    data:image/png;base64,VE9PTUFOWVNFQ1JFVFM= */
const avatar = joi.string().dataUri().required()

// 定义文章添加的验证规则
const articleName = joi.string().required()
const articleAlias = joi.string().required()

// 定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body: {
        username, 
        password,
    }
}

// 定义 id，nickname，email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const user_email = joi.string().email().required()


// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
    body:{
        id,
    nickname,
    email:user_email,
    }
}

// 验证规则对象 - 更新密码
exports.update_password_schema = {
    body:{
        oldPwd:password,
        newPwd:joi.not(joi.ref('oldPwd')).concat(password)
        /* 
            1. joi.ref('oldPwd') 表示 newPwd 的值必须和 oldPwd 的值保持一致
            2. joi.not(joi.ref('oldPwd')) 表示 newPwd 的值不能等于 oldPwd 的值
            3. .concat() 用于合并 joi.not(joi.ref('oldPwd')) 和 password 这两条验证规则
        */
    }
}

// 验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body:{
        avatar,
    }
}


// 验证规则对象 - 添加文章
exports.add_article_schema = {
    body:{
        name:articleName,
        alias:articleAlias,
    }
}
