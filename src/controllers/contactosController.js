const pool = require("../../database/dbConnection");
const res = require("express/lib/response");

//REGISTRO DE UN NUEVO Contactos

const registroContactos = async(req) => {
    try {
        const { nombre, apellido, email, telefono, direccion, tipo, origen } = req.body;

        let respuesta = await pool.query(`SELECT * FROM f_insert_contactos($1, $2, $3, $4, $5, $6, $7)`,
            [
                nombre,
                apellido,
                email,
                telefono,
                direccion,
                tipo,
                origen
            ]
        );

        return respuesta.rows[0];    

    } catch (error) {
        throw new Error(`Ocurrio un error al realizar el registro: ${error}`);
    }
}


//CONSULTAR LOS REGISTROS DE LA TABLA ContactosS

const consultaContactos = async(req) => {
    try {
        let query = "SELECT * FROM contactos";

        const contactos = await pool.query(query);
        console.log(contactos.rows);
        return contactos.rows;

    } catch (error) {
        throw new Error(`Ocurrio un error al realizar el registro: ${error}`);
    }
}

const consultaContactosId = async(id) => {
    try {
        let respuesta = await pool.query('SELECT * FROM contactos WHERE id = $1', [id]);

        if (JSON.stringify(respuesta.rows) === '[]') {
            respuesta = null;            
        } else {
            respuesta = respuesta.rows[0];

            return respuesta;
        }
    } catch (error) {
        throw new Error(`Ocurrio un error al consultar: ${error}`);
    }
} 


//ACTUALIZAR LOS REGISROS DE LA TABLA POR ID
const actualizaContactos = async (nombre, apellido, email, telefono, direccion, tipo, origen, id) =>{
    try {
         
        let respuesta = pool.query('UPDATE contactos SET nombre = $1, apellido = $2, email = $3, telefono = $4, direccion = $5, tipo = $6, origen = $7 WHERE id = $8', [nombre, apellido, email, telefono, direccion, tipo, origen, id])

        console.log(`Se actualizo el registro del Contactos: ${respuesta}`)
        return respuesta

    } catch (error) {
        throw new Error(`No se actualizo el registro del Contactos: ${error}`)
    }
}

//ACTUALIZAR LOS TAREAS DE LA TABLA POR ID
const actualizaTareas = async (tarea, crm, vence, responsable, id) =>{
    try {
         
        let respuesta = pool.query('UPDATE contactos SET tarea = $1, crm = $2, vence = $3, responsable = $4 WHERE id = $5', [tarea, crm, vence, responsable, id])

        console.log(`Se actualizo el registro del Tarea: ${respuesta}`)
        return respuesta

    } catch (error) {
        throw new Error(`No se actualizo el registro del Tarea: ${error}`)
    }
}

//ACTUALIZAR LOS TAREAS DE LA TABLA POR ID
const actualizaComentarios = async (comentarios, id) =>{
    try {
         
        let respuesta = pool.query('UPDATE contactos SET comentarios = $1 WHERE id = $2', [comentarios, id])

        console.log(`Se actualizo el registro del Comentario: ${respuesta}`)
        return respuesta

    } catch (error) {
        throw new Error(`No se actualizo el registro del comentario: ${error}`)
    }
}


//ELIMINAR REGISTROS DE LA TABLA POR ID
const eliminaContactos = async(id) => {
    try {
        let respuesta = await pool.query(`DELETE FROM contactos WHERE id = $1`, [id])
        return respuesta;
    } catch (error) {
        throw new Error(`Se genera el error ${error}`)
    }
}

const idExiste = async (id) => {
    try {
        let respuesta = await pool.query('SELECT * FROM contactos WHERE id = $1',[id])

        if (JSON.stringify(respuesta) === '[]'){
            respuesta = null
        }
        console.log(`RESPUESTA DEL CONTROLADOR ${respuesta.rowCount}`)
        return respuesta.rowCount

    } catch (error) {
        throw new Error(`No se encuentra el id ingresado en la base de datos: ${error}`)
    }
}

module.exports = { registroContactos, consultaContactos, consultaContactosId, actualizaContactos, actualizaTareas, actualizaComentarios, eliminaContactos, idExiste };
