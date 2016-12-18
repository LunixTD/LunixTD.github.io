var express = require('express')
var router = express.Router()
var db = require('../db')
var DangDangBook = db.DangDangBook
var Student = db.Student
var StudentBook = db.StudentBook
// 渲染列表页面
router.get('/list',(req,res)=>{
    if(req.cookies.user_id){
        Student.findById(req.cookies.user_id)
            .then(data=>{
                res.render('book/list',{isLogined:true,user:data})
            })
    }else{
         res.render('book/list',{isLogined:false})
    }
})
// 获取json数据
router.get('/get_data/:page?',(req,res)=>{
    var filter = {}
    var currentPage = 1
    var pageSize = 10
    filter.title = new RegExp(req.query.search,'i')
    console.log(filter)
    if(req.params.page){
        currentPage = Number(req.params.page)
    }
    if(currentPage<=0){
        currentPage=1
    }
    DangDangBook.find(filter).limit(pageSize).skip((currentPage-1)*pageSize)
        .then(data=>{
            res.json({status:'y',data:data,current_page:currentPage})
        })
        .catch(err=>{
            console.log(err)
            res.json({status:'n',data:[],msg:'获取数据失败'})
        })
})



router.post('/pick',(req,res)=>{
    // console.log(req.body.id)
    
    if(req.cookies.user_id){
        StudentBook.count({'user_id':req.cookies.user_id,'book_id':req.body.id})
            .then(count=>{
                if(count==0){
                    console.log(count)
                    var sb = new StudentBook()
                    sb.user_id = req.cookies.user_id
                    sb.book_id = req.body.id
                    sb.save()
                        .then(data => {
                            if (data) {
                                console.log(data)
                            }
                            res.json({
                                status: 'y',
                                msg: '借阅成功,请注意爱护公共财物~'
                            })
                        })
                }else{
                    res.json({
                        status: 'n',
                        msg: '您已订阅过该书籍!'
                    })
                }      
            })
            // .catch(err=>{
            //     console.log(err)
            //     res.json({
            //         status: 'n',
            //         msg: '借阅失败'
            //     })
            // })
    }else{
        res.json({
            status:'n',
            msg:'请先登录'
        })
    }
})

module.exports = router