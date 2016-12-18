/****
 * 用户页面 需要实现登陆注册的地方
 */
var express = require('express')
var router = express.Router()
var db = require('../db')
var Student = db.Student
var StudentBook = db.StudentBook

router.get('/reg', (req, res) => {
    var student = new Student()
    res.render('user/reg', { data: student })
})
router.post('/reg/:id', (req, res) => {
    Student.findOne({ user_name: req.body.user_name })//判断用户名是否已存在
        .then(data => {
            console.log(data)
            if (data) {
                res.json({ status: 'n', msg: '用户名已存在' })
            }
            else {
                //保存注册信息
                Student.findByIdAndUpdate(req.params.id, req.body, { upsert: true })
                    .then(data => {
                        console.log(data)
                        if (data) {
                            res.json({ status: 'n', msg: '注册失败' })
                        }
                        else {
                            var timeSpan = new Date(Date.now() + 24 * 3600 * 1000 * 10);
                            // 设置cookie保存用户id信息
                            res.cookie('user_id', req.params.id, { path: '/', expires: timeSpan })
                            res.json({ status: 'y', msg: '注册成功' })
                        }
                    })
            }
        })
})

router.get('/login', (req, res) => {
    console.log(req.cookies)
    Student.findById(req.cookies.user_id)
        .then(data => {
            if (data) {
                res.redirect('/user/user_info')
            } else {
                res.render('user/login')
            }
        })
})

router.get('/user_info', (req, res) => {
    Student.findById(req.cookies.user_id)
        .then(data => {
            if (data) {
                StudentBook.find({
                    user_id: req.cookies.user_id
                }).populate('book_id')  //通过populate关联另一个集合的数据
                    .then(sbData => {
                        console.log(sbData)
                        res.render('user/user_info', { user: data, books: sbData })
                    })
            } else {
                res.redirect('user/login')
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('user/login')
        })
})

router.post('/login', (req, res) => {
    Student.findOne({ user_name: req.body.userName })
        .then(data => {
            if (data) {
                if (data.pwd == req.body.userPWD) {
                    // console.log(4334);
                    // 设置cookie过期时间为10天
                    var timeSpan = new Date(Date.now() + 24 * 3600 * 1000 * 10);
                    // 设置cookie保存用户id信息
                    res.cookie('user_id', data.id, { path: '/', expires: timeSpan })
                    res.json({ status: 'y', msg: '登陆成功' })
                }
                else {
                    res.json({ status: 'n', msg: '登陆密码错误' })
                }
            }
            else {
                res.json({ status: 'n', msg: '用户信息不存在,请先注册' })
            }
        })
})

module.exports = router