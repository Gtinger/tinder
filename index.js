const { response } = require('express');
const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}))

app.engine('hbs',exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.set('view engine', 'hbs')

const books = require('./models/books');
const { request } = require('http');

app.get('/', (request, response, next) => {
    
    response.render('index',{person: 'Fred', books: books.books})
});

app.post('/add', (request, response, next) => {
    console.log(request.body);
    books.books.push(request.body)
    response.redirect('/');
})
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080')
})