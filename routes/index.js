const router = require('express').Router();
const Url = require('../models/urlschema')

/* GET home page. */
router.get('/', async function (req, res, next) {
    try{
        const urls = await Url.find();
        console.log("url fetched successfully");
        res.render('index', { URLS : urls });
    }catch(err){
        console.error("can't fetch urls :",err);
        res.status(500);
        res.send("internal server error");
    }
});

router.post('/' , async (req , res , next)=>{
    try{
        const newUrl = new Url({
            original : req.body.urlInput,
            alias    : req.body.aliasInput
        })

        await newUrl.save();
        console.log("new url added successfully");
        res.redirect('/');
    }catch(err){
        console.error("can't add new url :" , err);
    }
})

router.get('/:alias' , async(req , res , next)=>{
    try{
        const link = await Url.findOne({alias : req.params.alias});
        if(link){
            console.log("link was founded");
            console.log(link);
            res.redirect(link.original);
        }else{
            console.log("link wasn't founded");
            res.status(404).send("page not found");
        }
    }catch(err){
        console.error(err);
    }
})

module.exports = router;
