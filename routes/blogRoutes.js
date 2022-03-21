const express =  require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/create', blogController.blog_create_get); // all urls are prepended by '/blogs' from app.jsk
router.get('/', blogController.blog_index); // callback function extracted to controller file
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

module.exports = router;