const express = require('express');
const app = express();
const path = require('path');
var methodOverride = require('method-override')
const { v4: uuid } = require('uuid');



app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

let comments = [
    {
        id:uuid(),
        username: 'Todd',
        comment: 'lol that is so funny'
    },
    {
        id:uuid(),
        username: 'Jimmy',
        comment: 'whats up my dudes'
    },
    {
        id:uuid(),
        username: 'L8tex',
        comment: 'please stop im cringing jimmy'
    },
    {
        id:uuid(),
        username: 'bark',
        comment: 'i hate you woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
})

app.get('/comments/new', (req,res) => {
    res.render('comments/new');
})

app.post('/comments',(req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()})
    res.redirect("/comments");
})
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find (c => c.id === id);
    res.render('comments/show', { comment });
})

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find (c => c.id === id);
    foundComment.comment = newCommentText
    res.redirect('/comments')
})

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

app.get ('/tacos', (req, res) =>{
    res.send("get /tacos response");
})

app.post ('/tacos', (req, res) =>{
    const {meat, qty } = req.body;
    res.send(`okay here are your ${qty} ${meat} tacoss`)
})

app.listen (3000, () => {
    console.log("on port 3000!")
})

