
const Role = require('../models/role');
const { Usuario, Categoria, Producto } = require('../models');


const esRoleValido = async ( rol = '' ) => {
    const existeRol = await Role.findOne( { rol } );
    if( !existeRol ){
            throw new Error(`El rol ${ rol } no esta registrado en la BD`);
    }
} 


// Verificar si el correo existe
const emailExiste = async ( correo = '' ) => {
    const existeEmail = await Usuario.findOne( { correo } )

    if( existeEmail ) {
        /*  return res.status(400).json({
            msg: 'El correo ya esta registrado' 
            
        }); */
        throw new Error(`El correo ${ correo } ya esta registrado`);
    }
    
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await Usuario.findById(id);

    if( !existeUsuario ) {
     
        throw new Error(`El id ${ id } no existe`);
    }
    
}

const existeCategoriaPorId = async ( id ) => {
    const existeCategoria = await Categoria.findById(id);

    if( !existeCategoria ) {
     
        throw new Error(`El id ${ id } no existe`);
    }
}

const existeProductoPorId = async ( id ) => {
    const existeProducto = await Producto.findById(id);

    if( !existeProducto ) {
     
        throw new Error(`El id ${ id } no existe`);
    }
}



module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}