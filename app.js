var express = require('express');
var exphbs  = require('express-handlebars');
const mercadopago = require ('mercadopago');

mercadopago.configure({
    access_token: 'APP_USR-1159009372558727-072921-8d0b9980c7494985a5abd19fbe921a3d-617633181',
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004'
  });
 


 
var app = express();
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});


app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});



app.post('/order', function (req, res) {
  

    // const body = req.body;
 
    
     const title = req.body.title;
     const price = Number(req.body.price);
     const unit = parseInt(req.body.unit);

     var payer = {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_58295862@testuser.com",
        date_created: "2020-06-02T12:58:41.425-04:00",
        phone: {
          area_code: "52",
          number: "5549737300"
        },
        address: {
          street_name: "Insurgentes Sur",
          street_number: "1602",
          zip_code: "03940"
        }
    }

 
    
     let preference = {
     items: [
       {
         id: '1234',
         description:'Dispositivo móvil de Tienda e-commerce',
         title: title,
         unit_price: price,
         quantity: unit,
         external_reference : 'plinio.arbizu@gmail.com'
       }
     ],
     payer : payer
     };
   
 
     //d) URL Imagen: Foto del producto seleccionado. (url válida)
     
   
     mercadopago.preferences.create(preference)
     .then(function(response){
     // Este valor reemplazará el string "<%= global.id %>" en tu HTML
     global.id = response.body.id;
     }).catch(function(error){
     console.log(error);
     });
   
     //res.send('POST request to the homepage xx' + JSON.stringify(preference));
 
 });


app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));
 
app.listen(3000);
