var express = require('express');
var router = express.Router();
var db = require('../../db')
var Student = db.Student
var StudentBook = db.StudentBook
// Student.findByName('Tom',function(err,data){
//     console.log('---findByName---')
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(data)
//     }
// })

/**
 * 获取页码数组
 * @param {any} currentPage [当前页]
 * @param {any} pageCount   [总页数]
 */
function getPages(currentPage, pageCount) {
    var pages = [currentPage];
    var left = currentPage - 1;
    var right = currentPage + 1;
    while (pages.length < 15 && (left >= 1 || right <= pageCount)) {
        if (left > 0) {
            pages.unshift(left--);
        }
        if (right <= pageCount) {
            pages.push(right++);
        }
    }
    console.log(pages)
    return pages;
}

router.get('/list/:page?', (req, res) => {
    var currentPage = 1;
    if (req.params.page) {
        currentPage = req.params.page * 1
    }
    var pageCount = 1; //总页数
    var pageSize = 2; //每页显示的数量

    // 查询条件
    var filter = {}
    if (req.query.name) {
        //通过new RegExp创建一个正则表达式的查询条件
        filter.name = new RegExp(req.query.name, 'i')
    }
    if (req.query.mobile) {
        filter.mobile = new RegExp(req.query.mobile, 'i')
    }
    // console.log(filter)
    // 根据条件统计总的记录数量
    // 查询学生数量
    var countStudent = Student.count(filter)
    // 根据条件查询学生信息
    countStudent.then(count => {
        console.log(`总的记录数目为:${count}`)
        pageCount = Math.ceil(count / pageSize) //计算总页数
        var pages = getPages(currentPage, pageCount)
        var findStudent = Student.find(filter)
            .limit(pageSize)
            .skip((currentPage - 1) * pageSize)
        findStudent.then(data => {
            res.render('admin/student/list', { data: data, page: currentPage, pageCount: pageCount, pages: pages, query: req.query })
        })
        findStudent.catch(err => {
            console.log(err)
            res.render('error', { error: err })
        })
    })
    countStudent.catch(err => {
        console.log(err)
        res.render('error', { error: err })
    })
})

// 根据id删除记录
router.post('/delete', (req, res) => {
    Student.findByIdAndRemove(req.body.id, err => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/admin/student/list')
        }
    })
})


router.get('/add/:id?', (req, res) => {
    if (req.params.id) {
        Student.findById(req.params.id, (err, data) => {
            var student;
            if (err) {
                student = new Student()
            }
            else {
                student = data
            }
            res.render('admin/student/add', { data: student })
        })
    }
    else {
        var student = new Student()
        res.render('admin/student/add', { data: student })
    }
})

// 新增数据 如果存在那么修改
router.post('/add/:id', (req, res) => {
    var student = new Student(req.body)
    // student.save(err => {
    //     if (err) {
    //         console.log(err)
    //         res.json({
    //             status: 'n',
    //             msg: '保存失败'
    //         })
    //     } else {
    //         console.log('保存成功')
    //         res.json({
    //             status: 'y',
    //             msg: '保存成功'
    //         })
    //     }
    // })
    // upsert:true 当记录不存在的时候创建否则修改指定的记录
    Student.findByIdAndUpdate(req.params.id, req.body, { upsert: true }, (err, data) => {
        if (err) {
            console.log(err)
            res.json({
                status: 'n',
                msg: '保存失败'
            })
        }
        else {
            res.json({
                status: 'y',
                msg: '保存成功'
            })
        }
    })
})

router.get('/books/:id',(req,res)=>{
    var user = {}
    Student.findOne({'_id':req.params.id})
        .then(data=>{
            user = data;
            console.log(data)
        })
    StudentBook.find({'user_id':req.params.id}).populate('book_id')
        .then(data=>{
            console.log(data)
            res.render('admin/student/books',{user:user,books:data})
        })
    
    console.log(req.params.id)
})

module.exports = router;
