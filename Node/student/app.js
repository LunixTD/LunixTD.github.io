var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

var app = express();

// view engine setup
//
// 以下代码引入art-template的配置信息
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 设置express框架的静态文件目录
// 在静态文件目录中的文件可以直接进行访问
app.use(express.static(path.join(__dirname, 'public')));

// 路由地址模糊匹配 匹配所有的地址中以/admin/为开始的
// 在此处做管理后台的登录判断 如果没有登录 那么跳转到登录页面
app.all('/admin/*', (req, res, next) => {
  console.log('您访问的是管理后台')
  console.log(req.path)
  if (req.path == '/admin/login') {  //如果当前访问的是管理后台的登录页面，就不需要判断是否登录
    next()
  } else {
    //如果cookies中存在管理员登录信息
    if (req.cookies.admin_user_name) {
      next()
    } else {
      res.redirect('/admin/login')
    }

  }

})

app.use('/admin/login/', require('./routes/admin/admin_user'))
app.use('/admin/student/', require('./routes/admin/student'));
// 前端展示页面 用户信息部分
app.use('/user/', require('./routes/user'))
app.use('/books/', require('./routes/books'))
app.use('/', (req, res) => {
  res.redirect('/books/list')
})
app.listen(3000, function () {
  console.log('服务器运行与于3000端口....')
})
