var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
//app.listen(3000);
const server = require('http').createServer();
//const port = process.env.PORT || 3000;
const port = 3000;
server.listen(port, () => console.log(`Listening on ${port}`));