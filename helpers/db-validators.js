const Rol = require('../models/rol');
const Usuario = require('../models/usuario');

const esRolvalido = async (rol ='') => {       
    const existeRol = await Rol.findOne({rol});        
    if (!existeRol) {
        throw new Error(`El rol ${rol} no está en la base de datos`)
    }
}

const emailExiste = async (correo ='') => {       
    const existeMail = await Usuario.findOne({correo});        
    if (existeMail) {
        throw new Error(`El correo ya está registrado`)
    }
}

const existeUsuarioPorId = async (id ='') => {       
    const existeId = await Usuario.findById(id);        
    if (!existeId) {
        throw new Error(`El id ${id} no existe`)
    }
}


module.exports = {
    esRolvalido,
    emailExiste,
    existeUsuarioPorId 
}