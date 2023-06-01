// 导入数据库操作模块
const db = require('../db/index')
// 导入处理密码模块
const bcrypt = require('bcryptjs')


// 获取用户基本信息的处理函数
exports.getUserInfo = (req,res)=>{
    // 定义查询用户信息的 SQL 语句
    const sqlStr = 'select id,username,nickname,email,user_pic from ev_users where id = ?'
    // 调用 db.query()执行 SQL 语句
    db.query(sqlStr,[req.user.id],(err,results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 执行成功 SQL 语句，但是查询到结果可能为空
        if(results.length !== 1) return res.cc('获取用户信息失败!')

        // 用户信息获取成功
        res.send({
            status:0,
            message:'获取用户基本信息成功',
            data:results[0]
        })
    })
}

// 更新用户基本信息的处理函数
exports.updateUserInfo = (req,res)=>{
    // 定义待执行的 SQL 语句
    const sqlStr = 'update ev_users set ? where id = ?'
    // 调用 db.qurey() 执行 SQL 语句并传递参数
    db.query(sqlStr,[req.body,req.body.id],(err,results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 执行 SQL 语句成功，但数据库没有对应的数据
        if(results.affectedRows !==1) return res.cc('修改用户密码失败!')
        // 更新用户基本信息成功
        res.cc('修改用户信息成功!',0)
    })
}


// 重置密码函数
exports.updatePassword = (req,res)=>{
    // 根据 id 查询用户的信息
    const sql = 'select * from ev_users where id = ?'
    // 执行根据 id 查询用户信息的 SQL 语句
    db.query(sql,req.user.id,(err,results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err)
        // 判断用户是否存在
        if(results.length !== 1) return res.cc('用户不存在')
        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult) return res.cc('旧密码错误！')
        // 定义更新密码的 SQL 语句
        const sql = 'update ev_users set password=? where id=?'
        // 对新密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd,10)
        // 调用 db.query() 执行 SQL 语句
        db.query(sql,[newPwd,req.user.id],(err,results)=>{
            // 执行 SQL 语句失败
            if(err) return res.cc(err)
            // 判断影响的行数
            if(results.affectedRows !==1) return res.cc('更新密码失败！')
            // 更新密码成功
            res.cc('密码修改成功',0)
        })
    })
}

// 更新头像处理函数
exports.updateAvatar = (req,res)=>{
    // 定义更新用户头像 SQL 语句
    const sql = 'update ev_users set user_pic=? where id=?'

    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        // 执行 SQL 语句失败
        if(err) return res.cc(err)

        if(results.affectedRows !== 1) return res.cc('头像更新失败')

        res.cc('头像更新成功',0)
    })
}