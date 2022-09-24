const express = require("express");
const router = express.Router();
const { type } = require("express/lib/response");
const { registroContactos, consultaContactos, consultaContactosId, actualizaContactos, actualizaTareas, actualizaComentarios, eliminaContactos, idExiste } = require("../controllers/contactosController");


// CODIGO DE API PARA CREAR UN NUEVO REGISTRO
router.post(`/crear-contactos`, async(req, res) => {
    try {
        const { nombre, apellido, email, telefono, direccion, tipo, origen } = req.body;
        const campos = [
            {
                nombres: "nombre",
                valor: nombre
            },
            {
                nombres: "apellido",
                valor: apellido
            },
            {
                nombres: "email",
                valor: email
            },
            {
                nombres: "telefono",
                valor: telefono
            },
            {
                nombres: "direccion",
                valor: direccion
            },
            {
                nombres: "tipo",
                valor: tipo
            },
            {
                nombres: "origen",
                valor: origen
            }
        ];

        const campoVacio = campos.find( item => !item.valor );

        if (campoVacio) {
            return res.status(400).json({
                message: `No ingreso el campo ${campoVacio.nombres}`,
                code: -1
            });
        }

        const ContactosRegistrado = await registroContactos(req);

        if (ContactosRegistrado) {
            res.status(200).json({
                message: "Se registro el Contacto correctamente",
                code: 1
            });
        } else {
            res.status(400).json({
                message: "No se registro el Contacto",
                code: -1
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ocurrio un error al registrar el contacto",
            code: -1
        })
    }
});


// CODIGO DE API PARA LISTAR TODOS LOS REGISTROS DE LA TABLA ContactoS
router.get('/contactos', async(req, res) => {
    try {
        const data = await consultaContactos(req);

        res.status(200).json({
            message: "Se realizo la consulta correctamente.",
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ocurrio un error al realizar la consulta.",
            code: -1
        })
    }
});

// CODIGO DE API PARA LISTAR EL REGISTRO DE UN Contactos POR ID
router.get('/consulta-Contactos-id/:id', async(req, res) =>{
    try {
        const id = req.params.id;

        console.log("El id del Contactos que desea consultar es: ", id);

        const Contactos = await consultaContactosId(id);
        res.status(200).json({
            message: "Se realizo correctamente la consulta del Contacto por id",
            Contactos
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Ocurrió un error con la consulta",
            code: -1
        })
    }
})


// CODIGO DE API PARA ACTUALIZAR UN REGISTRO
router.put('/actualizar-contactos/:id', async(req, res) =>{
    try {
        const id = req.params.id;

        const { nombre, apellido, email, telefono, direccion, tipo, origen } = req.body;
        const campos = [
            {
                nombres: "nombre",
                valor: nombre
            },
            {
                nombres: "apellido",
                valor: apellido
            },
            {
                nombres: "email",
                valor: email
            },
            {
                nombres: "telefono",
                valor: telefono
            },
            {
                nombres: "direccion",
                valor: direccion
            },
            {
                nombres: "tipo",
                valor: tipo
            },
            {
                nombres: "origen",
                valor: origen
            },
            {
                nombres: "id",
                valor: id
            }
        ];

        const campoVacio = await campos.find( item => !item.valor )

        if (campoVacio) {
            return res.status(400).json({
                msg: `Debe ingresar el campo: ${campoVacio.titulo}` 
            })
        }

        const existe = await idExiste(id)

        console.log(`Respuesta de id ${existe}`)

        if( !existe ){
            return res.status(400).json({
                msg: 'El Contacto ingresado no existe',
                code: -1
            })
        }

        const actualizado = await actualizaContactos(nombre, apellido, email, telefono, direccion, tipo, origen, id )
        console.log(`Respuesta de actualizacion de Contacto ${actualizado}`)

        if (actualizado) {
            
            res.status(200).json({
                msg: 'Se actualizo el Contacto correctamente',
                code: 1,
            })
        } else {
            res.status(400).json({
                msg: 'No se actualizo el Contacto',
                code: -1
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: `Ocurrio un error al actualizar la contacto ${error}`,
            code: -1
        })
    }
});

// CODIGO DE API PARA ACTUALIZAR UN REGISTRO
router.put('/actualizar-tarea', async(req, res) =>{
    try {
        const { tarea, crm, vence, responsable, id } = req.body;
        const campos = [
            {
                nombres: "tarea",
                valor: tarea
            },
            {
                nombres: "crm",
                valor: crm
            },
            {
                nombres: "vence",
                valor: vence
            },
            {
                nombres: "responsable",
                valor: responsable
            },
            {
                nombres: "id",
                valor: id
            }
        ];

        const campoVacio = await campos.find( item => !item.valor )

        if (campoVacio) {
            return res.status(400).json({
                msg: `Debe ingresar el campo: ${campoVacio.titulo}` 
            })
        }

        const existe = await idExiste(id)

        console.log(`Respuesta de id ${existe}`)

        if( !existe ){
            return res.status(400).json({
                msg: 'El Contacto ingresado no existe',
                code: -1
            })
        }

        const actualizado = await actualizaTareas(tarea, crm, vence, responsable, id)
        console.log(`Respuesta de actualizacion de Tarea ${actualizado}`)

        if (actualizado) {
            
            res.status(200).json({
                msg: 'Se actualizo el Tarea correctamente',
                code: 1,
            })
        } else {
            res.status(400).json({
                msg: 'No se actualizo el Tarea',
                code: -1
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: `Ocurrio un error al actualizar la Tarea ${error}`,
            code: -1
        })
    }
});

// CODIGO DE API PARA ACTUALIZAR UN REGISTRO
router.put('/actualizar-comentarios', async(req, res) =>{
    try {
        const { comentarios, id } = req.body;
        const campos = [
            {
                nombres: "comentarios",
                valor: comentarios
            },
            {
                nombres: "id",
                valor: id
            }
        ];

        const campoVacio = await campos.find( item => !item.valor )

        if (campoVacio) {
            return res.status(400).json({
                msg: `Debe ingresar el campo: ${campoVacio.titulo}` 
            })
        }

        const existe = await idExiste(id)

        console.log(`Respuesta de id ${existe}`)

        if( !existe ){
            return res.status(400).json({
                msg: 'El Contacto ingresado no existe',
                code: -1
            })
        }

        const actualizado = await actualizaComentarios( comentarios, id)
        console.log(`Respuesta de actualizacion de Comentario ${actualizado}`)

        if (actualizado) {
            
            res.status(200).json({
                msg: 'Se actualizo el Comentario correctamente',
                code: 1,
            })
        } else {
            res.status(400).json({
                msg: 'No se actualizo el Comentario',
                code: -1
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: `Ocurrio un error al actualizar la Comentario ${error}`,
            code: -1
        })
    }
});

//CODIGO PARA ELIMINAR ContactoS POR ID 
router.delete('/eliminar-contacto/:id', async(req, res) => {
    try {
        const id = req.params.id;

        const campos = [
            {
                titulo: "id",
                valor: id
            }
        ]
        const campoVacio = await campos.find( item => !item.valor)

        if (campoVacio) {
            return res.status(400).json({
                msg: `Debe ingresar el campo: ${campoVacio.titulo}`
            })
        }

        const existe = await idExiste(id)

        console.log(`Respuesta de id ${existe}`)

        if( !existe ){
            return res.status(400).json({
                msg: 'El Contacto ingresado no existe',
                code: -1
            })
        }

        const eliminado = await eliminaContactos(id)
        if (eliminado) {
            res.status(200).json({
                msg: 'El Contacto se elimino correctamente',
                code: 1
            })
        } else {
            res.status(400).json({
                msg: 'Ocurrio un error al eliminar el Contacto',
                code: -1
            })
        }
    } catch (error) {
        res.status(400).json({
            msg: `Ocurrio un error al eliminar el Contacto: ${error}`,
            code: -1
        })
    }
})
module.exports = router;