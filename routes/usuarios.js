const { Router } = require('express');
const { check } = require('express-validator');
const { UsuariosGet, UsuariosPost, UsuariosPut, UsuariosDelete } = require('../controllers/usuariosController');
const { esRolvalido, emailExiste , existeUsuarioPorId} = require('../helpers/db-validators');
const {validarCampos} = require('../middlewares/validar-campos');


const router = Router();

router.get('/', UsuariosGet )

 router.post('/',[
     check('nombre','El nombre es obligatorio').notEmpty(),
     check('contraseña','La contraseña debe ser mayor a 6 caracteres').notEmpty(),
     check('correo','El correo no es valido').isEmail(),
     check('correo').custom(emailExiste),
     check('rol').custom(esRolvalido ),
    validarCampos         
 ] ,UsuariosPost)

  router.put('/:id',[
      check('id', 'No es un id valido').isMongoId(),
      check('id').custom(existeUsuarioPorId),
      check('rol').custom(esRolvalido ),
      validarCampos
  ] ,UsuariosPut)
  
 router.delete('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
 ],UsuariosDelete)


















module.exports = router;