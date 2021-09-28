const { response } = require("express");
const { ObjectId } =require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
];

const buscarUsuarios = async( termino = '', res = response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    const regexp = new RegExp( termino, 'i' ); // busca todos los usuarios cuyo nombre or correo coincida con test (sin importar may o mi)
    
    const usuarios = await Usuario.find({ 
        $or: [ { nombre: regexp }, { correo: regexp }],
        $and: [{ estado: true }]
    });
    
    res.json({
        results: usuarios
    })
}

const buscarCategoria = async( termino = '', res = response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const regexp = new RegExp( termino, 'i' ); // busca todos los usuarios cuyo nombre or correo coincida con test (sin importar may o mi)
    
    const categorias = await Categoria.find({ nombre: regexp, estado: true });
    
    res.json({
        results: categorias
    })
}


const buscarProducto = async( termino = '', res = response ) =>{

    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const producto = await Producto.findById( termino )
                        .populate('categoria', 'nombre');
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regexp = new RegExp( termino, 'i' ); // busca todos los usuarios cuyo nombre or correo coincida con test (sin importar may o mi)
    
    const productos = await Producto.find({ nombre: regexp, estado: true })
                        .populate('categoria', 'nombre');
    
    res.json({
        results: productos
    })
}


const buscar = ( req, res = response ) => {

    const { coleccion, termino } = req.params;
    if ( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ coleccionesPermitidas }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
            break;

        case 'categoria':
            buscarCategoria( termino, res );
            break;
        case 'productos':
            buscarProducto( termino, res );
            break;
        default:
            res.status(500).json({
                msg: 'Se me olvido hacer esta busqueda'
            })
            break;
    }
}

module.exports = {
    buscar
}