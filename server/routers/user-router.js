const UserRouter = require("express").Router;
const userController = require("../controllers/user-controller");
const {body} = require("express-validator");

const router = new UserRouter();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activation);
router.get('/refresh', userController.refresh);
router.get('/users', userController.getUsers);
router.get('/user/:nickname', userController.getUser)

module.exports = router;
