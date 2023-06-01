const express = require('express')
// 导入路由处理函数模块
const userinfoRouter = require('../router_handler/userinfo')

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const {update_userinfo_schema,update_password_schema,update_avatar_schema} = require('../schema/user')

const router = express.Router()
// 获取用户基本信息的路由
router.get('/userinfo',userinfoRouter.getUserInfo)
// 更新用户信息的路由
router.post('/userinfo',expressJoi(update_userinfo_schema),userinfoRouter.updateUserInfo)
// 重置密码的路由
router.post('/updatepwd',expressJoi(update_password_schema),userinfoRouter.updatePassword)
// 更新用户头像的路由
router.post('/update/avatar',expressJoi(update_avatar_schema),userinfoRouter.updateAvatar)



module.exports = router