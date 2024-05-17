const express = require('express');
const router = express.Router();
const Url = require('../models/urlModel');

/* GET a page with alias. */
router.get('/:alias', async function (req, res, next) {
    try {
        const alias = req.params.alias;
        const url = await Url.findOne({ alias: alias });
        if (url) {
            res.redirect(url.longUrl);
        } else {
            res.status(404).send('404 Not Found');
        }
    } catch (err) {
        next(err);
    }
});

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const urls = await Url.find({});
        res.locals.urls = urls;
        res.locals.domain = `${req.protocol}://${req.get('host')}/`;
        res.render('index', { title: 'Express' });
    } catch (err) {
        next(err);
    }
});

// Middleware to validate alias
const validator = function (req, res, next) {
    const regex = /^[a-zA-Z0-9_]+$/;
    if (req.body.aliasInput.length > 3 && regex.test(req.body.aliasInput)) {
        next();
    } else {
        res.status(400).render('invalid');
    }
};

// Middleware to check availability
const available = async function (req, res, next) {
    try {
        if (await Url.findOne({ alias: req.body.aliasInput })) {
            res.status(400).render('not-available');
        } else {
            next();
        }
    } catch (err) {
        next(err);
    }
};

/* POST new url shortener from home page */
router.post('/', validator, available, async (req, res, next) => {
    try {
        const url = new Url({
            longUrl: req.body.urlInput,
            alias: req.body.aliasInput,
        });
        await url.save();
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

/* DELETE a shortened URL */
router.get('/:id/delete', async (req, res, next) => {
    try {
        await Url.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
