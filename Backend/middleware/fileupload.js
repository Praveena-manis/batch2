import multer from 'multer';
import path from 'path';

//set Storage
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/');//update image to image folder
    },
    filename:(req,file,cb)=>{
        if(!file.originalname||typeof file.originalname!=='string'){
            return cb(new Error('Invalid file name'));
        }
        const uniqueName=Date.now()+path.extname(file.originalname);
        cb(null,uniqueName);
    }
})
//init upload //upload middleware
export const upload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},//5MB
    fileFilter:(req,file,cb)=>{
        const fileTypes=/jpeg|png|jpg|gif/
        const extname=fileTypes.test(path.extname(file.originalname))
        const mimeType=fileTypes.test(file.mimetype);
        if(extname&&mimeType)
            return cb(null,true)
        else
            cb('Error:Upload Images ONly')
    }
})