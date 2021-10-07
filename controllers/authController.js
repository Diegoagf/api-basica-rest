const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs= require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


const login = async (req, res = response) =>{
    const {correo, contraseña} = req.body;

    try {

        //Verificar que el correo existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg:'El usuario no es correcto'
            });
        }

        //SI el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg:'El usuario no está activo'
            });
        }

        //verificar la contraseña
        const contraseñaValida= bcryptjs.compareSync(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(400).json({
                msg:'La contraseña es incorrecta'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })  

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Contactese con el administrador'
        })
        
    }
   

}

module.exports = {
    login
}