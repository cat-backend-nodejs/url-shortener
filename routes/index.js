const router = require('express').Router();
const Url = require('../models/shortUrl')

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const urls = await Url.find();
        // console.log(urls);
        res.render('index', { URLS: urls });
      } catch (err) {
        console.error('Error fetching URLs:', err);
        res.status(500).send('Internal Server Error');
      }
    
});

router.post('/' , (req,res,next)=>{
    Url.insertUrl(req.body.urlInput , req.body.aliasInput )
    res.redirect('/');
})

router.get('/:alias' , async (req,res,next)=>{
    try {
        const link = await Url.findOne({alias: "http://localhost:3000/"+ req.params.alias});
        console.log(link);
        if (link) {
            res.redirect(link.original);
        } else {
            res.status(404).send('URL not found');
        }
    } catch(err){
        console.error('Error fetching URL:', err);
        res.status(500).send('Internal Server Error');
    } 
})

module.exports = router;
