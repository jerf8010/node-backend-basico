const { response, request  } = require('express');


const usuariosGet = ( req = request, res = response ) => {

    const { q, nombre = 'no name', apikey } = req.query;

    res.json( {
        //ok: true, // No es necesario mandarlo
        msg: 'get API - controlador',
        q,
        nombre,
        apikey
    });
}

const usuariosPut = ( req, res = response ) => {

    const {id }= req.params;

    res.json( {
        //ok: true, // No es necesario mandarlo
        msg: 'put API - usuariosPut',
        id
    } );
}

const usuariosPost = ( req, res = response ) => {
    
    const {nombre, edad } = req.body;

    res.json( {
        //ok: true, // No es necesario mandarlo
        msg: 'post API - usuariosPost',
        nombre,
        edad
    } );
}

const usuariosPatch = ( req, res = response ) => {
    res.json( {
        //ok: true, // No es necesario mandarlo
        msg: 'patch API - usuariosPatch'
    } );
}

const usuariosDelete = ( req, res = response ) => {
    res.json( {
        //ok: true, // No es necesario mandarlo
        msg: 'delete API - usuariosDelete'
    } );
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch

}