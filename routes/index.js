const router = require('express').Router();

const urlSchema = require('../models/urlSchema.js'); // get the schema of url

/*
router.get('/favicon.ico', async function (req, res,next) {
    const urls = await urlSchema.find({});
    res.locals.allUrl = urls;
    res.render('index', { title: 'Express' });
});
*/

// get website using its alias Url
router.get('/:aliasUrl', async (req, res) => {
    const urlCollection = await urlSchema.findOne({shortUrl :  req.params.aliasUrl});
    if(urlCollection){
        console.log(urlCollection);
        const link = urlCollection.originalUrl;
        res.redirect(link);
    }
    else{
        res.status(404).send('Not Found');
    }
});

/* GET home page. */
router.get('/', async function (req, res,next) {
    const urls = await urlSchema.find({});
    res.locals.allUrl = urls;
    res.render('index', { title: 'Express' });
});

// Add new url and its Alias
router.post('/', async function (req, res) {

    const newUrlShortener = new urlSchema({

        originalUrl: req.body.urlInput, 
        shortUrl: req.body.aliasInput

    });

    await newUrlShortener.save();
    res.redirect('/');
});

module.exports = router;
