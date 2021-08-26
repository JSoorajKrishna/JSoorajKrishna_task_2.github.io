const express = require("express");
const mongoose = require("mongoose");
const {URL,user,continent} = require("./models/url");
const ipapi = require('ipapi.co');

const app = express();

const urldb = "mongodb+srv://JSoorajKrishna:12345@pollbooth.cgszb.mongodb.net/url_list?retryWrites=true&w=majority";
mongoose.connect(urldb,{useNewUrlParser: true, useUnifiedTopology: true})
        .then((result) =>app.listen(3000))
        .catch((err) =>console.log(err));

app.set("view engine","ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/",(req,res) =>{
    res.render("index");
});

app.get("/hackermode",(req,res) =>{
    res.render("hackermode");
});

app.post("/hackermode",(req,res) =>{







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


            URL.find()
        .then((result) =>{
            let temp ="";
            let temp1 ="";
            for(let i=0;i<result.length;i++)
            {
                let mon = "";
                let year = 0;
                let date = 0;

                let c_mon = "";
                let c_year = 0;
                let c_date = 0;

                let u_mon = "";
                let u_year = 0;
                let u_date = 0;


                temp = result[i].createdAt;
                temp = temp.toString();

                temp1 = result[i].updatedAt;
                temp1 = temp.toString();

                let today = new Date();
                today = today.toString();

                for(let j=4;j<=6;j++)
                {
                        mon+=temp[j];
                        u_mon+=temp1[j];
                        c_mon+=today[j];
                }
                for(let j=8;j<=9;j++)
                {
                    if(j==8)
                        {
                            date = temp[j];
                            u_date = temp1[j];
                            c_date = today[j];
                        }
                    else{
                        date+=temp[j];
                        u_date+= temp1[j];
                        c_date+= today[j];
                    }
                }
                for(let j=11;j<=14;j++)
                {
                   if(j==11)
                    {
                        year = temp[j];
                        u_year = temp1[j];
                        c_year = today[j];
                    }
                    else{
                        year+=temp[j];
                        u_year+=temp1[j];
                        c_year+= today[j];
                    }      
                }

                mon = mon.toUpperCase();
                c_mon = c_mon.toUpperCase();
                u_mon = u_mon.toUpperCase();

                if(mon == "JAN")
                    mon = 1;
                if(mon == "FEB")
                    mon = 2;
                if(mon == "MAR")
                    mon = 3;
                if(mon == "APR")
                    mon = 4;
                if(mon == "MAY")
                    mon = 5;
                if(mon == "JUN")
                    mon = 6;
                if(mon == "JUL")
                    mon = 7;
                if(mon == "AUG")
                    mon = 8;
                if(mon == "SEPT")
                    mon = 9;
                if(mon == "OCT")
                    mon = 10;
                if(mon == "NOV")
                    mon = 11;
                if(mon == "DEC")
                    mon = 12;


                if(c_mon == "JAN")
                    c_mon = 1;
                if(c_mon == "FEB")
                    c_mon = 2;
                if(c_mon == "MAR")
                    c_mon = 3;
                if(c_mon == "APR")
                    c_mon = 4;
                if(c_mon == "MAY")
                    c_mon = 5;
                if(c_mon == "JUN")
                    c_mon = 6;
                if(c_mon == "JUL")
                    c_mon = 7;
                if(c_mon == "AUG")
                    c_mon = 8;
                if(c_mon == "SEPT")
                    c_mon = 9;
                if(c_mon == "OCT")
                    c_mon = 10;
                if(c_mon == "NOV")
                    c_mon = 11;
                if(c_mon == "DEC")
                    c_mon = 12;

                if(u_mon == "JAN")
                    u_mon = 1;
                if(u_mon == "FEB")
                    u_mon = 2;
                if(u_mon == "MAR")
                    u_mon = 3;
                if(u_mon == "APR")
                    u_mon = 4;
                if(u_mon == "MAY")
                    u_mon = 5;
                if(u_mon == "JUN")
                    u_mon = 6;
                if(u_mon == "JUL")
                    u_mon = 7;
                if(u_mon == "AUG")
                    u_mon = 8;
                if(u_mon == "SEPT")
                    u_mon = 9;
                if(u_mon == "OCT")
                    u_mon = 10;
                if(u_mon == "NOV")
                    u_mon = 11;
                if(u_mon == "DEC")
                    u_mon = 12;
                
                mon = parseInt(mon) + 6;
                if(mon > 12)
                {
                        mon = mon - 12;
                        
                        if((c_mon >= mon) && (c_year > year))
                    {
                        result[i].remove();
                    }

                }
                else{

                    if((c_mon > mon) && (c_year = year))
                {
                    result[i].remove();
                }

                }
                if((c_date-u_date)>=2 && (c_mon == u_mon))
                {
                    result[i].remove();
                }
                else{
                    if((c_date-u_date)>=(2 - 30) && (c_mon > u_mon))
                    {
                        result[i].remove();
                    }
                }
                

            }
        })
        .catch((err) =>console.log(err));







    let url = new URL({
        originalUrl: req.body.o_url,
        clicked: 0,
        shortenedUrl: req.body.c_url
    });
    url.save();
    url = req.body.c_url;
    let temp="";
    for(let i=22;i<url.length;i++)
    {
        temp+=url[i];
    }
    res.render("custom");
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

                const url = new URL({
                    originalUrl: req.body.url,
                    clicked: 0,
                    shortenedUrl: "http://localhost:3000/AAA00"
                });
                url.save();
                res.render("details",{url});

            }
            else{
                result[0].total_users = newChar(result[0].total_users);
                result[0].save();

                const url = new URL({
                    originalUrl: req.body.url,
                    clicked: 0,
                    shortenedUrl: "http://localhost:3000/" + result[0].total_users
                });
                url.save();
                res.render("details",{url});
                

            }
            


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


            URL.find()
        .then((result) =>{
            let temp ="";
            let temp1 ="";
            for(let i=0;i<result.length;i++)
            {
                let mon = "";
                let year = 0;
                let date = 0;

                let c_mon = "";
                let c_year = 0;
                let c_date = 0;

                let u_mon = "";
                let u_year = 0;
                let u_date = 0;


                temp = result[i].createdAt;
                temp = temp.toString();

                temp1 = result[i].updatedAt;
                temp1 = temp.toString();

                let today = new Date();
                today = today.toString();

                for(let j=4;j<=6;j++)
                {
                        mon+=temp[j];
                        u_mon+=temp1[j];
                        c_mon+=today[j];
                }
                for(let j=8;j<=9;j++)
                {
                    if(j==8)
                        {
                            date = temp[j];
                            u_date = temp1[j];
                            c_date = today[j];
                        }
                    else{
                        date+=temp[j];
                        u_date+= temp1[j];
                        c_date+= today[j];
                    }
                }
                for(let j=11;j<=14;j++)
                {
                   if(j==11)
                    {
                        year = temp[j];
                        u_year = temp1[j];
                        c_year = today[j];
                    }
                    else{
                        year+=temp[j];
                        u_year+=temp1[j];
                        c_year+= today[j];
                    }      
                }

                mon = mon.toUpperCase();
                c_mon = c_mon.toUpperCase();
                u_mon = u_mon.toUpperCase();

                if(mon == "JAN")
                    mon = 1;
                if(mon == "FEB")
                    mon = 2;
                if(mon == "MAR")
                    mon = 3;
                if(mon == "APR")
                    mon = 4;
                if(mon == "MAY")
                    mon = 5;
                if(mon == "JUN")
                    mon = 6;
                if(mon == "JUL")
                    mon = 7;
                if(mon == "AUG")
                    mon = 8;
                if(mon == "SEPT")
                    mon = 9;
                if(mon == "OCT")
                    mon = 10;
                if(mon == "NOV")
                    mon = 11;
                if(mon == "DEC")
                    mon = 12;


                if(c_mon == "JAN")
                    c_mon = 1;
                if(c_mon == "FEB")
                    c_mon = 2;
                if(c_mon == "MAR")
                    c_mon = 3;
                if(c_mon == "APR")
                    c_mon = 4;
                if(c_mon == "MAY")
                    c_mon = 5;
                if(c_mon == "JUN")
                    c_mon = 6;
                if(c_mon == "JUL")
                    c_mon = 7;
                if(c_mon == "AUG")
                    c_mon = 8;
                if(c_mon == "SEPT")
                    c_mon = 9;
                if(c_mon == "OCT")
                    c_mon = 10;
                if(c_mon == "NOV")
                    c_mon = 11;
                if(c_mon == "DEC")
                    c_mon = 12;

                if(u_mon == "JAN")
                    u_mon = 1;
                if(u_mon == "FEB")
                    u_mon = 2;
                if(u_mon == "MAR")
                    u_mon = 3;
                if(u_mon == "APR")
                    u_mon = 4;
                if(u_mon == "MAY")
                    u_mon = 5;
                if(u_mon == "JUN")
                    u_mon = 6;
                if(u_mon == "JUL")
                    u_mon = 7;
                if(u_mon == "AUG")
                    u_mon = 8;
                if(u_mon == "SEPT")
                    u_mon = 9;
                if(u_mon == "OCT")
                    u_mon = 10;
                if(u_mon == "NOV")
                    u_mon = 11;
                if(u_mon == "DEC")
                    u_mon = 12;
                
                mon = parseInt(mon) + 6;
                if(mon > 12)
                {
                        mon = mon - 12;
                        
                        if((c_mon >= mon) && (c_year > year))
                    {
                        result[i].remove();
                    }

                }
                else{

                    if((c_mon > mon) && (c_year = year))
                {
                    result[i].remove();
                }

                }
                if((c_date-u_date)>=2 && (c_mon == u_mon))
                {
                    result[i].remove();
                }
                else{
                    if((c_date-u_date)>=(2 - 30) && (c_mon > u_mon))
                    {
                        result[i].remove();
                    }
                }
                

            }
        })
        .catch((err) =>console.log(err));

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