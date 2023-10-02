// IMPORTING PACKAGE/MODELS
const File = require("../models/csv");

// To open home page 
module.exports.home = async function(req, res) {
    try {
        let file = await File.find({});
        return res.render('home', {
            files: file,
            title: "Home"
        });
    } catch (error) {
        
        return;
    }
}
