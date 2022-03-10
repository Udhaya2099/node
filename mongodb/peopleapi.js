var people=require("./people")
var route=require("express").Router()


route.get("/all",function(request,response)
{
    people.find({},{_id:0},function(err,data)
    {
        if(err)
        {
            response.status(500).send("error occured in get api")
        }
        else
        {
            response.json(data)
        }
    })
})

module.exports=route