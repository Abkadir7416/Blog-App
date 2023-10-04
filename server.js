const express = require('express');
const app = express();
const mongoose = require('mongoose');
const articleRouter = require('./routes/articles.js');
const Article = require('./models/article.js');
const methodOverride = require('method-override')


mongoose.connect('mongodb://0.0.0.0:27017/blog').then(()=>{
    console.log('connected')
})

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async(req, res ) => {
    const articles = await Article.find().sort({
        createdAt: 'desc'
    })
    res.render('articles/index', { articles : articles })
})

app.use('/articles', articleRouter);

app.listen(5000, ()=> {
    console.log('server is working on port 5000!');
})