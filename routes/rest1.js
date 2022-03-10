const temp=require("express").Router();
const model=require("../orm/model")

temp.get("/books",function(request,response){
    model.book.findAll(
        {include:[model.author]}
      ).then(function(data){
          response.json(data)
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

temp.delete("/delete1",function(request,response){
    model.book.destroy(
        {where:[model.author]}
        ).then(function(data){
            response.json(data)
        }).catch(function(err){
            console.log(err)
            response.json([]);
        })}) 

temp.delete("/delete1/:book_id",function(request,response){
    model.book.destroy(
        {
            where: {
                book_id: request.params.book_id
                    }
        }).then(function(data){
                    response.json(data)
                }).catch(function(err){
                    console.log(err)
                    response.json([]);
                })}) 



temp.put("/update1/:book_id/:name/:category/:price",function(request,response){
    
                    model.book.update(
                        {
                        book_name: request.params.name,
                        category: request.params.category,
                        price: request.params.price}, {
                        where: {
                            book_id: request.params.book_id
                        }
                    }).then(function(data){
                    response.json(data)
                    }).catch(function(err){
                    console.log(err)
                    response.json([]);
                })
            }) 
            





module.exports = temp