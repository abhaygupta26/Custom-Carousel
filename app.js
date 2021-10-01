require('dotenv').config();
const express = require("express");
const fetchUrl = require("fetch").fetchUrl;
const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));

//--------------------- Deaclared Variables-------------------------------------------------------
const key = process.env.UNSPLASH_KEY;

const url = "https://api.unsplash.com/topics/?client_id="+key;
let urlData = [];
let urlData2 = [];


//------------------------ Routings---------------------------------------------------------------




app.get("/", function(req, res){
    fetchUrl(url, function(err, meta, body){
        if(err){
            console.log(err);
        }else{
            if(body){
                urlData = JSON.parse(body);
                res.render("testing2", {categoriesData:urlData, photosData:urlData2});
                }
            }
    });
    
});

app.get("/:categoryTitle/:categoryId", function(req, res){
    const requestedId = req.params.categoryId;
    fetchUrl(url, function(err,meta,body){
        if(err){
            console.log(err);
        }else{
            if(body){
                urlData = JSON.parse(body);
                urlData.forEach((imgCategory)=>{
                    const storedId = imgCategory.id;
                    if(requestedId === storedId){
                        fetchUrl("https://api.unsplash.com/topics/"+storedId+"/photos?client_id="+key+"&h=32&w=32", function(err, meta, body2){
                            if(err){
                                console.log(err)
                            }else{
                                if(body2){
                                    urlData2 = JSON.parse(body2);
                                    res.redirect("/");
                                }
                            }
                        });
                    }
                });
            }
        }
    });
});



app.listen(3000, function(req, res){
    console.log("server is started on the port 3000");
});