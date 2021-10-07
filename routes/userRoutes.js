const app = require('express');
const router = app.Router();
const {register, registerValidations, loginValidations, login } = require("../controllers/userController")
router.post('/register', registerValidations,  register);
router.post('/login', loginValidations, login )
module.exports = router;