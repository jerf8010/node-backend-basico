const { response } = require("express");
const path = require('path');
const fs = require('fs');

const { subirArchivo } = require("../helpers/subir-archivo");
const { Usuario, Producto } = require('../models');


const cargarArchivo = async( req, res = response ) => {

    try {
        // txt, md
        // const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );
        
        // img
        const nombre = await subirArchivo( req.files, undefined, 'imgs' );
    
        res.json({ nombre })
    } catch (msg) {
        res.status(400).json({msg});
    }
    // Imagenes
    
  
}


const actualizarImagen = async( req, res = response ) => {
    

    const { id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});

    }

    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if( fs.existsSync( pathImagen ) ){
            fs.unlinkSync( pathImagen );
        }
    }

    modelo.img = await subirArchivo( req.files, undefined, coleccion );

    await modelo.save();

    res.json({
        modelo
    })
}

const mostrarImagen = async( req, res = response ) => {

    const {id, coleccion } = req.params;

    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});

    }

    // Limpiar imagenes previas
    if( modelo.img ){
        // Hay que borrar la imagen del servidor
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img );
        if( fs.existsSync( pathImagen ) ){
            return res.sendFile( pathImagen );
        }
    }

    const pathNoImage = path.join( __dirname, '../assets', 'no-image.jpg');
    res.sendFile( pathNoImage );
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}