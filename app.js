var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require ('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
  });
 

 
var app = express();
 

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/*
app.get('/', function (req, res) {
    res.render('home');
});
*/

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error

app.get('/', function(request, response) {
    //var result = 'App is running'
    //response.send(result);
    response.render('home');

}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});



app.post('/order', function (req, res) {
  

    const title = req.body.title;
     const price = Number(req.body.price);
     const unit = parseInt(req.body.unit);
 

    
     let preference = {
     items: [
       {
         title: title,
         unit_price: price,
         quantity: unit
       }
     ]
     };

     console.log("entro aca bbb");

     mercadopago.preferences.create(preference)
     .then(function(response){
        console.log('aca d');
        // Este valor reemplazará el string "<%= global.id %>" en tu HTML
     global.id = response.body.id;
     }).catch(function(error){
         console.log('aca');
     console.log(error);
     });
     
   
    //res.send('POST request to the homepage xx' + JSON.stringify(preference));

    //res.send('POST request to the homepage xx' + req);
 
 });


app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(3000);
