const express=require("express")
const app  = express()
const path =require("path")
const books=require("./routes/route")
const temp=require("./routes/temp")
const authorapi =require('./routes/rest')
const bookapi =require('./routes/rest1')

app.use(express.static(path.join(__dirname,"public/styles")))
//app.use(express.static(path.join(__dirname,"public/scripts")))
app.use(express.static(path.join(__dirname,"public/pages")))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.set('views', path.join(__dirname, 'public/views'));//setting the path of template files
app.set('view engine', 'pug'); //configuring view Engine

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