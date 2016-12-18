var express = require('express')
var db = require('mongoose')
var router = express.Router()

db.connect('mongodb://localhost/blog_db')

db.Promise = Promise
var Schema = db.Schema 

var blogsSchema = new Schema({
    title:{
        type:String,
        default:''
    },
    type:{
        type:Schema.Types.ObjectId,
        ref:'blog_type'
    },
    description:{
        type:String,
        default:''
    },
    content:{
        type:String,
        default:''
    },
    view_times:{
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})

var blog_typeSchema = new Schema({
    name:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})

var Blogs = db.model('blogs',blogsSchema)
var BlogType = db.model('blog_type',blog_typeSchema)

module.exports = {
    Blogs:Blogs,
    BlogType:BlogType
}

