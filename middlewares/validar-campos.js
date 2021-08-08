const { validationResult } = require('express-validator');

// Los middlewares tienen el argumetno next
const validarCampos = ( req, res, next ) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    } 
    next(); // Sigue con el siguiente middleware y si no hay, se va con el controlador
}


module.exports = {
    validarCampos


}