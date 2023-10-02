// IMPORTING PACKAGE/MODELS
const fs = require('fs');//allows to work with the file system on computer.
const csvParser = require('csv-parser');//can convert CSV into JSON
const CSV = require('../models/csv');
//const path = require('path');

// EXPORTING FUNCTION To upload a file
module.exports.upload = async function(req, res) {
    try {
        // file is not present
        if(!req.file) {
            return res.status(400).send('No files were uploaded.');
        }
        // file is not csv
        if(req.file.mimetype != "text/csv") {
            return res.status(400).send('Select CSV files only.');
        }
   
        let file = await CSV.create({
            fileName: req.file.originalname,
            filePath: req.file.path,
            file: req.file.filename
        });
        return res.redirect('/');
    } catch (error) {
  
        res.status(500).send('Internal server error');
    }
}

// EXPORTING FUNCTION To open file viewer page
module.exports.view = async function(req, res) {
    try {
     
        let csvFile = await CSV.findOne({file: req.params.id});
        
        const results = [];
        const header =[];
        fs.createReadStream(csvFile.filePath) // is a method from 'fs' that creates a readable stream for a specified file.
        .pipe(csvParser())//piping data frpm one stream to another
        .on('headers', (headers) => {
            //When the headers of the CSV are encountered, they are extracted and stored in the header array.
            headers.map((head) => {
                header.push(head);
            });
        })
        .on('data', (data) =>
        results.push(data))
        .on('end', () => {
            res.render("fileviewr", {
                title: "File Viewer",
                fileName: csvFile.fileName,
                head: header,
                data: results,
                length: results.length
            });
        });


    } catch (error) {
        console.log('Error in fileController/view', error);
        res.status(500).send('Internal server error');
    }
}

// To delete the file
module.exports.delete = async function(req, res) {
    try {
        
        let isFile = await CSV.findOne({file: req.params.id});

        if(isFile){
            await CSV.deleteOne({file: req.params.id});            
            return res.redirect("/");
        }else{
         
            return res.redirect("/");
        }
    } catch (error) {
        console.log('Error in fileController/delete', error);
        return;
    }
}