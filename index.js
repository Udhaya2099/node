const express=require("express")
const app  = express()
const path =require("path")
const books=require("./routes/route")
const temp=require("./routes/temp")
const authorapi =require('./routes/rest')
const bookapi =require('./routes/rest1')
const cors = require('cors')
const peopleapi=require('./mongodb/peopleapi')

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/steling');

var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error'));

db.once('open',function() {
    console.log("mongo dp connection is open");
});

app.use(express.static(path.join(__dirname,"public/styles")))
app.use(express.static(path.join(__dirname,"public/pages")))

app.use(cors())
 
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views', path.join(__dirname, 'public/views'));//setting the path of template files
app.set('view engine', 'pug'); //configuring view Engine

app.use("/peopleapi",peopleapi)

app.use("/books",books)
app.use("/temp",temp)
app.use("/authorapi",authorapi)
app.use("/bookapi",bookapi)


app.get("/home",function(request,response){
    response.sendFile(path.join(__dirname,"public/home.html"))
})

app.listen(4000,function(){
    console.log("server started on port number 4000")
})