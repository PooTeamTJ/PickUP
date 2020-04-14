const {admin, db} = require('../util/admin');
const config  = require('../util/config')


/*
    --> Requirements for image upload
    1. Busyboy
    2. path
    3. os
    4. fs
    5. bucket
*/
const BusyBoy = require('busboy');
const path = require('path');
const os = require('os')
const fs = require('fs')
const bucket = admin.storage().bucket()

exports.uploadImage = (req,res) => {
    const busboy = new BusyBoy({
        headers: req.headers
    }) 
 
    let imageFilename;
    let imageToBeUploaded = {};
    let filepath;
    let imageExtension;
 
    /*
         We are not going to use all the aurgumnets but we still need
         to put them here because they are all parameters of a call back 
         funciton and they need to be in these spots. 
         
         We are not going to be using fieldname or encoding
         
         --> First thing we do is check for mimetype because 
                we want upload only images and not texts or 
                anything like that.
        
        --> 1. We want to get our image extension from our filename
            2. we want to give a profile  name to our new image file
            3. we want to create a temp directory and concat our imagefilename with it.
     */
    
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
 
     const type = mimetype.split('/')[0]
 
      if (type !== 'image'){
         return res.status(400).json({ message: "Only image types please"});
         }
 
         imageExtension = filename.split('.')[filename.split('.').length-1];
         console.log(req.user)
         imageFilename = `profilePic${req.user.email}.${imageExtension}`;
         filepath = path.join(os.tmpdir(), imageFilename);
         imageToBeUploaded = {filepath, mimetype};
         file.pipe(fs.createWriteStream(filepath));
    });
 
    busboy.on('finish', () => {
        bucket.upload(imageToBeUploaded.filepath, {
            resumable: false,
            metadata: {
                metadata: {
                  contentType: imageToBeUploaded.mimetype  
                }
            }
        })
        .then(() => {
            const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFilename}?alt=media`
            return db.doc(`users/${req.user.email}`).update({
                imageUrl: imageUrl
            })
            .then(() => {
                res.json({ message: 'Image Uploaded successfully'})
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ error: err.code});
            })
        })   
    })
    busboy.end(req.rawBody);
 }