const express = require("express");
const mongoose = require("mongoose");
const {URL,user,continent} = require("./models/url");
const ipapi = require('ipapi.co');

const app = express();

const urldb = "mongodb+srv://JSoorajKrishna:12345@pollbooth.cgszb.mongodb.net/url_list?retryWrites=true&w=majority";
mongoose.connect(urldb,{useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) =>console.log("Connected to the data base"))
        .catch((err) =>console.log(err));

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.listen(3000);



app.get("/",(req,res) =>{
    res.render("index");
});

app.post("/homepage",(req,res) =>{
    user.find()
    .then((result) =>{

            if(result.length == 0)
            {
                const User = new user({
                    total_users: "AAA00"
                });
                User.save();
            }
            else{
                result[0].total_users = newChar(result[0].total_users);
                result[0].save();
                

            }

            const url = new URL({
                originalUrl: req.body.url,
                clicked: 0,
                shortenedUrl: "http://localhost:3000/"+result[0].total_users
            });
            url.save();
            res.render("details",{url});


    })
    .catch((err) =>console.log(err));

    continent.find()
            .then((result) =>{
                if(result.length == 0)
                {
                    const Continent = new continent({
                        america: 0,
                        africa: 0,
                        asia: 0,
                        antartica: 0,
                        australia: 0,
                        europe: 0
                    });
                    Continent.save();
                }
            })
            .catch((err) => console.log(err));

});

app.get("/:surl",(req,res) =>{
    const surl = req.params.surl;
    URL.find()
    .then((result)=>{

        let j=0;
            for(let i=0;i<result.length;i++)
            {
                let temp = "http://localhost:3000/"+surl;
                if(result[i].shortenedUrl == temp)
                {
                    ipapi.location((loc)=>{
                        let temp1="";
                        for(let k=0;k<loc.length;k++)
                        {
                            if(loc[k]!="/")
                                temp1+=loc[k];
                            else{
                                break;
                            }
                        }
                        continent.find()
                                .then((result) =>{
                        if(temp1.toUpperCase() == "ASIA")
                            {
                                result[0].asia++;
                                result[0].save();
                            }
                        if(temp1.toUpperCase() == "AMERICA")
                            {
                                result[0].america++;
                                result[0].save();
                            }
                        if(temp1.toUpperCase() == "AUSTRALIA")
                            {
                                result[0].australia++;
                                result[0].save();
                            }
                        if(temp1.toUpperCase() == "ANTARTICA")
                            {
                                result[0].antartica++;
                                result[0].save();
                            }
                        if(temp1.toUpperCase() == "EUROPE")
                            {
                                result[0].europe++;
                                result[0].save();
                            }
                        if(temp1.toUpperCase() == "AFRICA")
                            {
                                result[0].africa++;
                                result[0].save();
                            }
                                })
                                .catch((err) =>console.log(err));
                    }, '', '', 'timezone');
                    result[i].clicked++;
                    result[i].save();
                    j++;
                    res.redirect(result[i].originalUrl);
                }
            }

            if(j == 0)
            {
                res.redirect("/");
            }


    })
    .catch((err) =>console.log(err));
});




function newChar(temp){




let arr = new Array(temp.charCodeAt(0),temp.charCodeAt(1),temp.charCodeAt(2),temp.charCodeAt(3),temp.charCodeAt(4));
for(i=4;i>=4;i--)
{
    if(arr[i]==90)
    {
            if(arr[i-1]<90)
            {
                arr[i-1]++;
                arr[i]=48;
            }
            else{
                    if(arr[i-2]<90)
                    {
                        arr[i-2]++;
                        arr[i-1]=48;
                        arr[i]=48;
                    }
                    else{
                            if(arr[i-3]<90)
                            {
                                arr[i-3]++;
                                arr[i-2]=48;
                                arr[i-1]=48;
                                arr[i]=48;
                            }
                            else{
                                    if(arr[i-4]<90)
                                    {
                                        arr[i-4]++;
                                        arr[i-3]=48;
                                        arr[i-2]=48;
                                        arr[i-1]=48;
                                        arr[i]=48;
                                    }
                            }
                    }
            }
    }
    else{
        arr[i]++;
    }
}
temp = String.fromCharCode(arr[0]) + String.fromCharCode(arr[1]) + String.fromCharCode(arr[2]) + String.fromCharCode(arr[3]) + String.fromCharCode(arr[4]);
return temp;


}