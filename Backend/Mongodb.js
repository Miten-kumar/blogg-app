const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://miten:miten7869%40@cluster0.hd7lepw.mongodb.net/user").then((res)=>{
    console.log("successfully connect");
}).catch((err)=>{console.log(err);})
