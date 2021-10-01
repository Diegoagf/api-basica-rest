const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bsencrypt = require('bcryptjs');


const UsuariosGet = async (req = request, res=response)=> {
    // const {nombre = 'No name', apikey}= req.query;
    const {limite=5, desde=0} = req.query;
    const query = {estado:true};
    //Valida que sean numeros
    if (isNaN(limite) || isNaN(desde)) {
      return res.status(400).json({
        msg:"limte o desde no es un numero"
    });
    }
    // const usuarios = await Usuario.find(query)
    //   .skip(Number(desde))                            
    //   .limit(Number(limite));
      
    //   const total = await Usuario.countDocuments(query);

      const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                .skip(Number(desde))                            
                .limit(Number(limite))
      ])
    res.json({
        total,
        usuarios
    });
  }

  const UsuariosPost = async (req, res=response)=> {

    

    const {nombre, correo, contraseña,rol}= req.body;
    const usuario = new Usuario({nombre,correo,contraseña,rol});

    //Encriptar la contraseña
    const salt = bsencrypt.genSaltSync();
    usuario.contraseña = bsencrypt.hashSync(contraseña,salt);

    //Guardar en DB
    await usuario.save();
    res.json({
        msg: 'POST-ApiTest-controlador',
        usuario
    });
  }

  const UsuariosPut = async (req, res=response)=> {
    const {id} = req.params;
    const {_id, contraseña, correo, google, ...resto} = req.body;

    if (contraseña) {
      const salt = bsencrypt.genSaltSync();
      resto.contraseña = bsencrypt.hashSync(contraseña,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({usuario});
  }

  const UsuariosDelete = async (req, res=response)=> {
    const {id} = req.params;
    // const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    res.json({
        usuario
    });
  }


  module.exports = {
      UsuariosGet,
      UsuariosPost,
      UsuariosPut,
      UsuariosDelete
  }