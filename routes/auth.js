const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin } = require('../controllers/authController');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contraseña', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
] ,login);

router.post('/google',[
    check('id_token', 'Token de Google es necesario').notEmpty(),
    validarCampos
] ,googleSignin);



module.exports = router;
