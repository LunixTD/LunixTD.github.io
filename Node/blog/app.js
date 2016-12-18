var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')

var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

var template = require('art-template'); //引入arttemplate模板引擎
template.config('base', '');
template.config('extname', '.html'); //设置模板引擎的后缀名
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views'); //设置模板文件的位置

_globalPath = __dirname;

app.use(express.static('./www'))

app.get('/', (req, res) => {
    res.redirect('show/blog_List')
})
app.use('/api', require('./controllers/blogs/api'))
app.use('/show', require('./controllers/blogs/show'))

app.listen(3000, () => {
    console.log('正在监听3000端口...')
})