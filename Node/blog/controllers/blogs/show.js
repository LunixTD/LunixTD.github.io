var express = require('express')
var router = express.Router()
var db = require(_globalPath + '/db')
var BlogType = db.BlogType
var Blogs = db.Blogs

// 博客分类信息页
router.get('/blog_type_List/:page?', (req, res) => {
    BlogType.find({})
        .then(data => {
            data = data.map(item => {
                var time = item.toObject() //将模型转换为js对象
                time.updated_at = formatDate(time.updated_at)
                time.created_at = formatDate(time.created_at)
                time.id = item.id
                return time
            })
            res.render('admin/blog_type/list', { data: data })
        })
})

//博客分类编辑、修改页
router.get('/addType', (req, res) => {
    var id = req.query.id
    if (id) {
        BlogType.findOne({ '_id': id })
            .then(data => {
                res.render('admin/blog_type/addType', { data: data })
            })
    } else {
        var data = ''
        res.render('admin/blog_type/addType', { data: data })
    }
})

function formatDate(date) {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}


// 博客内容页
router.get('/blog_list/:page?', (req, res) => {
    // 分类筛选
    var filter = {}
    var typeId = ''
    if (req.query.type) {
        typeId = req.query.type
        filter.type = typeId
    }
    if (req.query.search) {
        filter.title = new RegExp(req.query.search, 'i')
    }
    console.log(filter)
    Blogs.find(filter).populate('type')
        .then(data => {
            if (data != '') {
                BlogType.find()
                    .then(typeData => {
                        console.log(data)
                        res.render('admin/blogs/list', { data: data, typeData: typeData, typeId: typeId })
                    })
            } else {
                BlogType.find()
                    .then(typeData => {
                        console.log(data)
                        res.render('admin/blogs/list', { data: data, typeData: typeData, alertMsg: req.query.search })
                    })
            }

        })
})

// 博客编辑、修改页
router.get('/blog_editor', (req, res) => {
    var id = req.query.id
    if (id) {
        Blogs.findById(id).populate('type')
            .then(data => {
                var blogsData = data
                BlogType.find()
                    .then(typeData => {
                        res.render('admin/blogs/editor', { data: blogsData, typeData: typeData })
                    })
            })
    } else {
        var data = ''
        BlogType.find()
            .then(typeData => {
                res.render('admin/blogs/editor', { data: data, typeData: typeData })
            })
    }
})


module.exports = router