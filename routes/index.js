const router = require('express').Router();
const URL = require('../models/schema');
const connection_to_database = require('../check/check');

connection_to_database();

router.get('/', async function(req,res){
    const urls = await URL.find();
    res.render('index',{
        title: 'Express',
        URLs: urls
    }
    );
})

router.post('/', async (req,res)=>{
    
    const {urlInput,aliasInput} = req.body;

    if(!urlInput || !aliasInput) {
        res.status(400).json({error : "both urls is required"});
    }

    try {
        const addedURL = new URL ({
            urlInput:urlInput,
            aliasInput: aliasInput,
        });

        await addedURL.save();

        const urls = await URL.find();
        res.render('index', {
            title: 'Express',
            URLs: urls,
        });
    } catch (err) {
        console.error("Error saving URL:", err);
        res.status(500).send("Error saving URL");
    }
})

router.get('/:aliasInput' , async function (req,res) {
    const { aliasInput } = req.params;
    const bothURLs = await URL.findOne({aliasInput : aliasInput})

    if (!bothURLs) {
        // Handle case where no matching shortened URL is found
        return res.status(404).send(" aliasInput not found.");
    }
    res.redirect(bothURLs.urlInput)
})

module.exports = router;
