const temp=require("express").Router();
const model=require("../orm/model")

temp.get("/books",function(request,response){
    model.book.findAll(
        {include:[model.author]}
      ).then(function(data){
          response.render("book",{books:data})
      }).catch(function(err){
          console.log(err)
          response.json([]);
      })
})




temp.post("/books",function(request,response){
var book={book_id:request.body.book_id,
          book_name:request.body.book_name,
          category:request.body.category,
          price:request.body.price}
          console.log(book);
    model.book.create(book,{include: [model.author]}).then(
        ()=>response.send("successfully uploaded")
    ).catch(
        function (err) {
            console.log(err);
            return response.sendStatus(500);
            
        }
    );
})

module.exports = temp