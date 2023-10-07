const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

// localfileupload -> handler function ->yeh clint ki path se data fetch karta hai or usse server ke path pe upload karta hai

exports.localFileUpload = async (req,res)=>{
    try{

        // fetch file
        const file = req.files.file;
        console.log("File aa gyi ",file);

        // server ke kis path pe file store karna hai
        let path = __dirname + "/file/" + Date.now() +`.${file.name.split('.')[1]}`;
        console.log("Path",path)

        // add path to the move function
        file.mv(path,(err)=>{
            console.log(err);
        });

        // create successful response
        res.json({
            success:true,
            message:'Local file Uploaded Successfully'
        });

    }catch(err){
        console.log("Not able to upload the data");
        console.log(err);
    }
}

// image upload handaler

function isFileTypeSupported(type,supportedType){
    return supportedType.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const option = {folder};
    console.log("temp file path",file.tempFilePath);

    if(quality){
        option.quality = quality;
    }
    option.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath,option);
}
exports.imageUpload = async (req,res) =>{
    try{

        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        // image vile leke aana
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedType = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ",fileType);

        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                seccess:false,
                message:"File Formate not Supported"
            })
        }
        // file formated support
        const responses = await uploadFileToCloudinary(file,"MediaHelp")
        console.log(responses);

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : responses.secure_url
        })

        res.json({
            success:true,
            imageUrl:responses.secure_url,
            message:"Image Successfully Uploaded"
        });

    }catch(err){
        console.error(err);
        res.status(400).json({
            success:false,
            message:'Something went wrong'
        });

    }
}

// video upload handelar

exports.videoUpload = async (req,res)=>{
    try{
        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        // video file leke aana
        const file = req.files.videoFile;
        console.log(file);

        // validation
        const supportedType = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File type: ",fileType);

        // homework : addd upper limt of 5mb for video
        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                success:true,
                message:'File formate not supported'
            });
        }
        console.log("this ")

        // file formated support->upload to cloudinary
        const responses = await uploadFileToCloudinary(file,"MediaHelp")
        console.log(responses);
        console.log("Is here error")
        
        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : responses.secure_url
        })

        res.json({
            success:true,
            imageUrl:responses.secure_url,
            message:"Video Successfully Uploaded"
        });


    }catch(err){
        console.error(err);
        res.status(400).json({
            success:true,
            message:"Somthing went wrong"
        });
    }
}

// image size reducer handelar
exports.imageSizeReducer = async (req,res)=>{
    try{

        // data fetch
        const {name,tags,email} = req.body;
        console.log(name,tags,email);

        // image vile leke aana
        const file = req.files.imageFile;
        console.log(file);

        // validation
        const supportedType = ["jpg","jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type: ",fileType);

        if(!isFileTypeSupported(fileType,supportedType)){
            return res.status(400).json({
                seccess:false,
                message:"File Formate not Supported"
            })
        }
        // file formated support
        const responses = await uploadFileToCloudinary(file,"MediaHelp",20)
        console.log(responses);

        // db me entry save karni hai
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl : responses.secure_url
        })

        res.json({
            success:true,
            imageUrl:responses.secure_url,
            message:"Image Successfully Uploaded"
        });


    }catch(err){
        console.error(err);
        res.status(400).json({
            success:true,
            message:"Somthing went wrong"
        });
    }
}