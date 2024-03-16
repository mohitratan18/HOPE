const express = require('express');
const twilio = require("twilio")("ACd1e481ce4a6bdcbbcbacd79c384a59f6","39c718a33afded78a5d5ed5d46ba2c02");
const app = express();
const ejs = require('ejs');
let otp;
const otpgenerator = require('otp-generator');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const { redirect } = require('express/lib/response');
mongoose.connect("mongodb://127.0.0.1:27017/webdataDB",{
    useNewUrlParser : true,
})
app.use(express.static('public'))
app.set('view engine','ejs');
app.use(bodyparser.urlencoded({extended:true}));
const dataSchema = new mongoose.Schema({
    name : String,
    location : String,
    map : String,
    phone : String,
    food_quantity : String,
})
const Data = mongoose.model("data",dataSchema);
app.listen(3000,()=>
{
    console.log("running at 3000");
})
app.get('/',(req,res)=>
{
    res.sendFile(__dirname+"/homepage/index.html");
})
app.get('/donate',(req,res)=>
{
    res.sendFile(__dirname+"/attachments/donationsData.html");
})
app.get('/aboutus',(req,res)=>
{
    res.sendFile(__dirname+"/attachments/Aboutus.html")
})
app.get('/contactus',(req,res)=>
{
    res.sendFile(__dirname+"/attachments/contactus.html")
})
app.get('/getfood',(req,res)=>
{
    const function1 = async()=>
    {
        const newdata = await Data.find();
        res.render("getfood",{lists:newdata});
    }
    function1();
});
app.get('/otp',(req,res)=>
{
    res.sendFile(__dirname+"/attachments/otp.html");
})
app.post('/otp',(req,res)=>
{
    const OTP = req.body.otp;
    if(OTP===otp)
    {
        res.render("success");
    }
    else
    {
        res.render("failed");
    }
});
app.post('/donate',(req,res)=>
{
    let phone = req.body.DonatorNo;
    const fun = async()=>
    {
        const data = new Data({
            name:req.body.DonatorName,
            location:req.body.locationOfFood,
            map:req.body.maplink,
            phone:req.body.DonatorNo,
            food_quantity:req.body.FoodQuantity,
        });
        await data.save();
    }
    fun();
    sendotp(phone);
    res.redirect('/otp');
});
app.get('/admin/mohit',(req,res)=>
{
    const function1 = async()=>
    {
        const newdata = await Data.find();
        res.render("admin",{lists:newdata});
    }
    function1();

})
app.get('/otpp',(req,res)=>{
    res.sendFile(__dirname+"/attachments/otpp.html")
})
app.post('/otpp',(req,res)=>
{
    let adminotp = req.body.otp;
    if(adminotp===otp)
    {
        res.redirect('/admin/mohit');
    }
    else
    {
        res.redirect("failed");
    }
})
app.get('/admin',(req,res)=>
{
    sendotp("8658418821");
    res.redirect('/otpp');
})
app.post('/getfood',(req,res)=>
{
    let id = req.body.btn;
    console.log(id);
    const dlt = async()=>
    {
        await Data.findByIdAndRemove(id);
    }
    dlt();
    res.redirect('/admin/mohit');
})
function sendotp(phone)
{
    try
    { 
    otp = otpgenerator.generate(4, { upperCaseAlphabets: false, lowerCaseAlphabets: false ,specialChars: false });
    twilio.messages.create({
    body:`YOUR OTP - ${otp}`,
    to:`+91${phone}`,
    from:"+18149047983"
    })}
    catch(err)
    {
        console.log(err); 
    }
}