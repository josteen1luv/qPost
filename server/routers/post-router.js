const UserRouter = require("express").Router;
const postController = require('../controllers/post-controller')
const authMiddleware = require('../middlewares/auth-middleware');

const router = new UserRouter();

router.get('/posts', postController.getPosts);
router.post('/publish', authMiddleware, postController.publishPost);
router.post('/like/:postId', authMiddleware, postController.likePost);
router.patch('/edit/:postId', authMiddleware, postController.editPost);
router.delete('/delete/:postId', authMiddleware, postController.deletePost);

module.exports = router;
