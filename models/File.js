const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String,
    },
    tages:{
        type:String,
    },
    email:{
        type:String,
    }
});

// post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("Doc ",doc);

        // transporter
        // shift this configration under /config folder
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });

        // send mail 
        let info = await transporter.sendMail({
            from:"Mediahelp by Sapna",
            to: doc.email,
            subject: "New file Uploaded to Cloudinary",
            html:`<h2>Hello </h2></br><p>Click Here:</br> <a href="${doc.imageUrl}">${doc.imageUrl}</a></p></br><p>mail send</p> `
        })

        console.log("info",info);

    }catch(err){
        console.error(err);

    }
})

const File = mongoose.model("File",fileSchema);
module.exports = File;