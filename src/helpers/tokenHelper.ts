import * as jwt from 'jsonwebtoken';

export const generarToken = (usuario : any ) => {
    //Objeto para codificar
    const usuarioForToken = {
        documento: usuario.documento,
        correo: usuario.correo
    }

    //Firmamos
    return jwt.sign(usuarioForToken, 'Token-Auth', { expiresIn: '30s' });
}