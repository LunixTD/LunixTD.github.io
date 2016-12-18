var express = require('express')
var router = express.Router()
var db = require(_globalPath + '/db')
var BlogType = db.BlogType
var Blogs = db.Blogs

// 添加、修改博客分类
router.post('/addType/:id?', (req, res) => {
    var id = req.params.id
    if (id) {
        BlogType.findByIdAndUpdate(id, req.body)
            .then(data => {
                console.log('保存成功!')
                res.json({
                    status: 'y',
                    msg: '数据提交成功!'
                })
            })
    } else {
        var blogType = new BlogType(req.body)
        blogType.save(err => {
            if (err) {
                console.log(err)
                res.json({
                    status: 'n',
                    msg: '数据提交失败!'
                })
            } else {
                res.json({
                    status: 'y',
                    msg: '数据提交成功!'
                })
            }
        })
    }
})

// 博客发布、修改
router.post('/blog_editor/:id?', (req, res) => {
    var id = req.params.id
    var typeName = req.body.typeName
    if (id) {
        BlogType.findOne({ 'name': typeName })
            .then(typeData => {
                req.body.type = typeData.id
                Blogs.findByIdAndUpdate(id, req.body, { upsert: true })
                    .then(data => {
                        console.log('保存成功!')
                        res.json({
                            status: 'y',
                            msg: '博客修改成功!'
                        })
                    })
            })
    } else {
        BlogType.findOne({ 'name': typeName })
            .then(typeData => {
                req.body.type = typeData.id
                var blogs = new Blogs(req.body)
                blogs.save(err => {
                    if (err) {
                        res.json({
                            status: 'n',
                            msg: '博客发布失败!'
                        })
                    } else {
                        res.json({
                            status: 'y',
                            msg: '博客发布成功!'
                        })
                    }
                })
            })
    }

})

// 分类删除
router.get('/blog_type_delete', (req, res) => {
    var id = req.query.id
    BlogType.findByIdAndRemove(id)
        .then(data => {
            console.log(data + '删除成功')
            res.json({
                status: 'y',
                msg: '删除成功!'
            })
        })
        .catch(err => {
            console.log(err)
        })
})

// 博客删除
router.get('/blog_delete', (req, res) => {
    var id = req.query.id
    Blogs.findByIdAndRemove(id)
        .then(data => {
            console.log(data + '删除成功')
            res.json({
                status: 'y',
                msg: '删除成功!'
            })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router