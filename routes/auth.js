const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
] ,login);



module.exports = router;
