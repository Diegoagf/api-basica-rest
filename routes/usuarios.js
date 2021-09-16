const { Router } = require('express');
const { UsuariosGet, UsuariosPost, UsuariosPut, UsuariosDelete } = require('../controllers/usuariosController');

const router = Router();

router.get('/', UsuariosGet )

 router.post('/', UsuariosPost)

  router.put('/:id', UsuariosPut)
  
 router.delete('/', UsuariosDelete)


















module.exports = router;