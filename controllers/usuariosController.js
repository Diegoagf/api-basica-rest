const { response, request } = require('express');

const UsuariosGet = (req = request, res=response)=> {
    const {nombre = 'No name', apikey}= req.query;
    res.json({
        msg: 'GET-ApiTest-controlador',
        nombre,
        apikey
    });
  }

  const UsuariosPost = (req, res=response)=> {
    const {nombre,edad}= req.body;
    res.json({
        msg: 'POST-ApiTest-controlador',
        nombre,
        edad
    });
  }

  const UsuariosPut = (req, res=response)=> {
    const id = req.params.id;
    res.json({
        msg: 'PUT-ApiTest-controlador',
        id
    });
  }

  const UsuariosDelete = (req, res=response)=> {
    res.json({
        msg: 'DELETE-ApiTest'
    });
  }


  module.exports = {
      UsuariosGet,
      UsuariosPost,
      UsuariosPut,
      UsuariosDelete
  }