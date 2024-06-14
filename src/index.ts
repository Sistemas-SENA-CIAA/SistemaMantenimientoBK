import app from './app'

import { AppDataSource } from "./database/conexion";

//Función Principal
async function main(){
    try {
        await AppDataSource.initialize();
        console.log('Base de datos conectada');
        
        app.listen(6506, () => {
            console.log("Server activo");
        });
    } catch (err) {
        if(err instanceof Error){
            console.log(err.message);
        }
    }
}

main();