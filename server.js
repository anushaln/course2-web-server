const express= require('express');
const hbs= require('hbs');
const fs= require('fs');
//to create  an app
var app=express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use(express.static(__dirname+'/public'));

app.use('/about', (req, res, next) =>{  // GET 'http://www.example.com/admin/new'
  console.log(req.originalUrl); // '/admin/new'
  console.log(req.baseUrl); // '/admin'
  console.log(req.path); // '/new'
  console.log(req.method);
  var now= new Date().toString();
  log= now+req.originalUrl+req.method;
console.log(log);
  fs.appendFile('server.log',log,(err)=>{
    if(err){
      console.log('uanble to connect to server')
    }
  });
  next();
});

app.use((req, res, next) =>{  // GET 'http://www.example.com/admin/new'
res.render('maintenance.hbs');
});

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
 });
//with arguments
 hbs.registerHelper('screamIt', (welcometext)=> {
   return welcometext.toUpperCase()
  });

//to get http handler
//response tat this server sends back to any http request make from our host
app.get('/',(req,res)=>{
  //to send text/html data
  //res.send('<h1>hello express</h1>');
  //to send Content-Type:application/json
  /*res.send({
    name: 'anusha',
    age:32
  });*/
  //to render dynamic content using handlebars.js hbstemplating engine which uses moustache template language{{}}
  res.render('home.hbs',{
    pageTitle: 'Home Page',
    pageHeading: 'Home Page',
    welcomeMessage:'welcome to my website',
  //  currentYear: new Date().getFullYear()
  });
});
//for http://localhost:3000/about
app.get('/about',(req,res)=>{
  //to send text/html data
  //res.send('<h1>hello express</h1>');
  //to send Content-Type:application/json
res.render('about.hbs',{
  pageTitle: 'About Page',
  pageHeading: 'About Page',
  //currentYear: new Date().getFullYear()
});
});
// to bind the server to listen to the requests coming fro m the port
//3000 is the port number  in our localhost
app.listen(3000,()=>{
  console.log('server is up and running and listening on port 3000');
});
