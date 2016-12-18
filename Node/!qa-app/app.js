const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fs = require('fs');
// 展示所有问题
app.get('/api/get_asks', (req, res) => {
    var arr = [];
    fs.readFile('./data/q-a.json', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            arr = JSON.parse(data.toString());
            res.json({
                data: arr
            })
        }
    })
})

//提问页面
app.post('/api/ask', (req, res) => {
    // 将提交的问题保存在文件中
    var obj = {};
    obj.id = Date.now(); //时间戳
    obj.content = req.body.content; //客户端传递来的参数
    // 把数据存储在data文件夹下q-a.json文件中
    // 首先需要判断文件中是否有内容
    var arr = [];
    fs.readFile('./data/q-a.json', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            if (data.toString()) {
                arr = JSON.parse(data.toString());
            }
            arr.unshift(obj);
            fs.writeFile('./data/q-a.json', JSON.stringify(arr));
            setTimeout(function() {
                res.json({
                    status: 'y',
                    msg: '提交成功',
                    data: obj.content
                })
            }, 1000)

        }
    })
})

app.get('/api/detail', (req, res) => {
    // console.log(req.query);
    // console.log(`当前请求的问题id为${req.query.aid}`);
    var aid = req.query.aid;
    fs.readFile('./data/q-a.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var arr = [];
            arr = JSON.parse(data.toString());
            var result = arr.find(function(item) {
                if (item.id == aid) {
                    return item;
                }
            })
            console.log(result);
            res.json({
                status: 'y',
                msg: '获取数据成功',
                data: result
            })
        }
    })
})

app.post('/api/do_answer', (req, res) => {
    fs.readFile('./data/q-a.json', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            var arr = JSON.parse(data.toString());
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].id == req.body.aid) {
                    var obj = {};
                    obj.id = Date.now();
                    obj.content = req.body.content;
                    if (arr[i].answers) {
                        arr[i].answers.unshift(obj);
                    } else {
                        arr[i].answers = [];
                        arr[i].answers.unshift(obj);
                    }
                }
            }
            fs.writeFile('./data/q-a.json', JSON.stringify(arr));
            res.json({
                status: 'y',
                msg: '回答成功',
                data: arr
            })
        }
    })
})

app.listen(3000, () => {
    console.log('服务器运行于3000端口...');
})