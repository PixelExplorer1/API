// 导入数据库模块
const db = require('../db/index')



// 获取文章分类列表的处理函数 
exports.getArticleCates = (req, res) => {
    // 定义查询分类列表数据的 SQL 语句
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'

    db.query(sql, (err, resluts) => {
        if (err) return res.cc(err)
        if (resluts.length < 1) return res.cc('文章不存在!')
        res.send({ status: 0, message: '获取文章分类列表成功！', data: resluts })
    })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    // 查询分类名称和别名是否被占用
    const sql = 'select *  from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, resluts) => {
        if (err) return res.cc(err)
        if (resluts.length === 2 || resluts.length === 1 && resluts[0].name === req.body.name && resluts[0].alias === req.body.alias) return res.cc('分类名字和别名同时都被占用!')
        if (resluts.length === 1 && resluts[0].name === req.body.name) return res.cc('分类名称被占用，请更换名称!')
        if (resluts.length === 1 && resluts[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换分类别名！')
        // 新增文章分类
        const sql = 'insert into ev_article_cate set ?'
        db.query(sql, req.body, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('新增文章分类失败')
            res.cc('新增文章分类成功!', 0)
        })
    })
}

// 删除文章分类的处理函数
exports.deleteCateById = (req,res)=>{
    const sql = `update ev_article_cate set is_delete=1 where id=?`
    db.query(sql,req.params.id,(err,resluts)=>{
        if(err) return res.cc(err)
        if(resluts.affectedRows !== 1) return res.cc('删除文章分类失败!')
        res.cc('删除文章分类成功!',0)
    })
}

// 根据 ID 获取文章分类的处理函数
exports.getArtCateById = (req,res)=>{
    const sql = 'select * from ev_article_cate where id = ?'
    db.query(sql,req.params.id,(err,results)=>{
        if(err) return res.cc(err)
        if(results.length !== 1 || results[0].is_delete === 1) return res.cc('该文章分类不存在！')
        res.send({
            status:0,
            message:'获取文章分类成功!',
            data:results[0]
        })
    })
}

// 更新文章分类的处理函数
exports.updateCateById = (req,res)=>{
    // 查询分类名称和别名是否被其它占用
    const sql = 'select * from ev_article_cate where id <> ? and (name=? or alias=?)'
    db.query(sql, [req.body.id,req.body.name, req.body.alias], (err, resluts) => {
        if (err) return res.cc(err)
        if (resluts.length === 2 || resluts.length === 1 && resluts[0].name === req.body.name && resluts[0].alias === req.body.alias) return res.cc('分类名字和别名同时都被占用!')
        if (resluts.length === 1 && resluts[0].name === req.body.name) return res.cc('分类名称被占用，请更换名称!')
        if (resluts.length === 1 && resluts[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换分类别名！')
        // 更新文章的分类功能
        const sql = 'update ev_article_cate set ? where id = ?'
        db.query(sql,[req.body,req.body.id],(err,resluts)=>{
            if(err) return res.cc(err)
            if(resluts.affectedRows !== 1) return res.cc('更新文章失败!')
            res.cc('更新文章成功!',0)
        })
    })
}

// 发布新文章的处理函数
exports.addArticle = (req,res)=>{
    res.send('ok')
}