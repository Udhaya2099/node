const route=require("express").Router();

const model=require("../orm/model")



route.get("/authors",function(request,response){
    model.author.findAll(
        {include:[model.book]}
      ).then(function(data){
          response.json(data)
      }).catch(function(err){
          console.log(err)
          response.json([]);
      })
})




route.post("/authors",function(request,response){
var author={author_id:request.body.author_id,
          name:request.body.name,
          country:request.body.country}
          console.log(author);
    model.author.create(author,{include: [model.book]}).then(
        ()=>response.send("successfully uploaded")
    ).catch(
        ()=>response.sendStatus(500)
    );
})

route.delete("/delete",function(request,response){
    model.author.destroy(
        {where:[model.book]}
        ).then(function(data){
            response.json(data)
        }).catch(function(err){
            console.log(err)
            response.json([]);
        })}) 

route.delete("/delete/:author_id",function(request,response){
    model.author.destroy(
        {
            where: {
                author_id: request.params.author_id
                    }
        }).then(function(data){
                    response.json(data)
                }).catch(function(err){
                    console.log(err)
                    response.json([]);
                })}) 

route.put("/update/:author_id/:name/:country",function(request,response){
    
        model.author.update(
            {
            name: request.params.name,
            country: request.params.country}, {
            where: {
                author_id: request.params.author_id
            }
        }).then(function(data){
        response.json(data)
        }).catch(function(err){
        console.log(err)
        response.json([]);
    })
}) 






module.exports = route