const { response, request  } = require('express');
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');


// Obtener informacion de la base de datos
const usuariosGet = async ( req = request, res = response ) => {

    //const { q, nombre = 'no name', apikey } = req.query;
    const { limite = 5, desde = 0 } = req.query; // localhost:8080/api/usuarios?limite=4&desde=5

    /* const usuarios = await Usuario.find({ estado: true }) // Solo toma en cuenta usuarios activos
        .skip( Number( desde ) )
        .limit( Number( limite ) );

    const total = await Usuario.countDocuments({ estado: true}); */ 

    const [ total, usuarios] = await Promise.all( [ // se ponen en una sola pues una no depende de la otra y se evita esperar mas tiempo
        Usuario.countDocuments({ estado: true}),
        Usuario.find({ estado: true }) // Solo toma en cuenta usuarios activos
            .skip( Number( desde ) )
            .limit( Number( limite ) ) // Promise.all ejecuta ambas de manera simultanea
    ] )
    res.json( {
        //ok: true, // No es necesario mandarlo
        //msg: 'get API - controlador',
        /* q,
        nombre,
        apikey */
        total,
        usuarios
    });
}

// Actualizar datos
const usuariosPut = async ( req, res = response ) => {

    const {id }= req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    // Validar contra base de datos
    if ( password ) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt )
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto );

    res.json( {
        //ok: true, // No es necesario mandarlo
        //msg: 'put API - usuariosPut',
        usuario
    } );
}

const usuariosPost = async ( req, res = response ) => {

    // Validacion del correo
    
    
    const{ nombre, correo, password, rol } = req.body;
    const usuario = new Usuario( { nombre, correo, password, rol } );

    

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );

    // Guardar en DB
    await usuario.save();

    res.json( {
        //ok: true, // No es necesario mandarlo
        //msg: 'post API - usuariosPost',
        usuario
    } );
}

const usuariosPatch = ( req, res = response ) => {
    res.json( {
        //ok: true, // No es necesario mandarlo
        msg: 'patch API - usuariosPatch'
    } );
}

const usuariosDelete = async ( req, res = response ) => {
    const { id } = req.params;

    // Se borra fisicamente
    //const usuario = await Usuario.findByIdAndDelete( id );

    // Cambiar el estado del usuario
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false } )
    res.json( {
        //ok: true, // No es necesario mandarlo
        //msg: 'delete API - usuariosDelete'
        usuario
    } );
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}