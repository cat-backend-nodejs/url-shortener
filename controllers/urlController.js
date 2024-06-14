const URL = require('../models/url');

const getHome = (req, res) => {
    URL.find()
        .then((urls) => {
            res.render('index', { title: 'urlShortner', urls });
        })
        .catch((err) => {
            res.render('error', { message: "Failed to load home page", error: err } );
        })
};

const urlPost = (req, res) => {
    const long = req.body.urlInput;
    const alias = req.body.aliasInput;
    const url = new URL({ long, alias});
    url.save()
        .then(() => {
            res.redirect('/');
            console.log('a new link added')
        })
        .catch((err) => {
            res.render('error', { message: "Failed to load home page", error: err });
        })
}
const urlRedirect = (req, res) => {
    const alias = req.params.alias;
    URL.findOne({ alias })
        .then((url) => {
            if (url) {
                res.redirect(`${url.long}`);
            }
            else {
                res.render('error', { message: "Invalid alias", error: err });
            }
        })
        .catch((err) => {
            res.render('error', { message: "Failed to redirect", error: err });
        })
}

const urlDelete = (req, res) => {
    const id = req.params.id;
    URL.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/'})
        })
        .catch((err) => {
            res.render('error', { message: "Failed to load home page", error: err });    })
    }

module.exports = {
    getHome,
    urlPost,
    urlDelete,
    urlRedirect,
}