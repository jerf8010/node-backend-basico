const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = ( files, extensionesValidas = ['png', 'jpg','jpeg', 'gif'], carpeta = '' ) => {

    return new Promise( (resolve, reject) => {
        const { archivo } = files;
        const nombreCortado = archivo.name.split('.'); // ['pinguino', 'jpg']
        const extension = nombreCortado[ nombreCortado.length - 1 ];
        
        // Validar una extension

        if( !extensionesValidas.includes(extension) ){
            return reject( `La extension ${ extension } no es permitida - ${ extensionesValidas }` );
        }

        
        // generador de nombre
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname,  '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => { // mover a la carpeta uploads
            if (err) {
                reject(err);
            }

            resolve(nombreTemp );
        });
    })
    
}

module.exports = {
    subirArchivo
}