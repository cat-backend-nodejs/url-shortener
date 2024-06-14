const router = require('express').Router();
const urlController = require ('../controllers/urlController')

/* GET home page. */
router.get('/', urlController.getHome);
router.post('/', urlController.urlPost);
router.get('/:alias', urlController.urlRedirect);
router.delete('/:id', urlController.urlDelete);


module.exports = router;

