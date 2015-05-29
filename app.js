var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
    console.log('Conectado ao MongoDB.')
});

if(process.env.ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/BookAPI-Tests');
else{
    db = mongoose.connect('mongodb://localhost/BookAPI');
}


var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

bookRouter = require('./Routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);
//app.use('/api/authors', authorRouter);

app.get('/', function(req, res){
    res.send('welcome to my API');

});

app.listen(port, function(){
    console.log('Gulp is running my app on PORT: ' + port);
});

module.exports = app;