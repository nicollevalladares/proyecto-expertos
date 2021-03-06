var express = require("express");
var router = express.Router();
var proyecto = require("../models/proyecto");
var carpeta = require("../models/carpeta");
var mongoose = require("mongoose");
var archivo = require("../models/archivo");
var subcarpeta = require("../models/subcarpeta");

//Obtener el listado de todos los proyectos
router.get("/", function(req,res){
    proyecto.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener una proyecto en particular
router.get("/:id",function(req,res){
    proyecto.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para guardar una proyecto
router.post("/", function(req, res){
    proyecto.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        if(req.session.plan == mongoose.Types.ObjectId("5cc7993eb56d781460c5cddf")){
            if(data.length < 15){
                crearProyecto(req,res);
            } 
            else{
                respuesta={status:0, mensaje:'Límite de carpetas alcanzadas, si desea crear más, cambie de plan'}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc7994eb56d781460c5cde0")){
            if(data.length < 30){
                crearProyecto(req,res);
            } 
            else{
                respuesta={status:0}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc79970b56d781460c5cde1")){
            crearProyecto(req,res);
        }

    });
});

//Peticion para guardar una proyecto
router.post("/subcarpeta", function(req, res){
    proyecto.find({usuarioCreador:req.session.codigoUsuario})
    .then(data=>{
        if(req.session.plan == mongoose.Types.ObjectId("5cc7993eb56d781460c5cddf")){
            if(data.length < 15){
                crearProyectoSubCarpeta(req,res);
            } 
            else{
                respuesta={status:0, mensaje:'Límite de carpetas alcanzadas, si desea crear más, cambie de plan'}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc7994eb56d781460c5cde0")){
            if(data.length < 30){
                crearProyectoSubCarpeta(req,res);
            } 
            else{
                respuesta={status:0}
                res.send(respuesta);
            }
        }

        if(req.session.plan == mongoose.Types.ObjectId("5cc79970b56d781460c5cde1")){
            crearProyectoSubCarpeta(req,res);
        }

    });
});


function crearProyecto(req,res){
    var proyect = new proyecto({
        usuarioCreador: req.session.codigoUsuario,
        nombreProyecto: req.body.nombreProyecto,
        carpetaRaiz: req.body.idCarpeta
    });

    proyect.save()
    .then(obj=>{

        carpeta.update(
            {
                _id:req.body.idCarpeta
            },
            {
                $push:{
                    proyectosCarpeta: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(error=>{
            res.send(error);
        });

        var idArchivo1 = mongoose.Types.ObjectId();
        var idArchivo2 = mongoose.Types.ObjectId();
        var idArchivo3 = mongoose.Types.ObjectId();

        var arch1 = new archivo({
            _id: idArchivo1,
            nombreArchivo: 'archivo1',
            extension: 'html',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        var arch2 = new archivo({
            _id: idArchivo2,
            nombreArchivo: 'archivo2',
            extension: 'css',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        var arch3 = new archivo({
            _id: idArchivo3,
            nombreArchivo: 'archivo3',
            extension: 'js',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        arch1.save();
        arch2.save();
        arch3.save();

        idsArchivos = {
            html: idArchivo1,
            css: idArchivo2,
            js: idArchivo3
        }
        
        res.send(idsArchivos);

        proyecto.update(
            {
                _id: mongoose.Types.ObjectId(obj._id)
            },
            {
                $push:{
                    archivoHTML: idArchivo1,
                    archivoCSS: idArchivo2,
                    archivoJS: idArchivo3
            }
            }
        )
        .then(resp=>{
            res.send(resp);
            console.log(resp);
        })
        .catch(error=>{
            res.send(error);
        });

    res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });
}

function crearProyectoSubCarpeta(req,res){
    var proyect = new proyecto({
        usuarioCreador: req.session.codigoUsuario,
        nombreProyecto: req.body.nombreProyecto,
        carpetaRaiz: req.body.idSubCarpeta
    });

    proyect.save()
    .then(obj=>{

        subcarpeta.update(
            {
                _id:req.body.idSubCarpeta
            },
            {
                $push:{
                    proyectosSubcarpeta: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
            console.log(data);
        })
        .catch(error=>{
            res.send(error);
        });

        var idArchivo1 = mongoose.Types.ObjectId();
        var idArchivo2 = mongoose.Types.ObjectId();
        var idArchivo3 = mongoose.Types.ObjectId();

        var arch1 = new archivo({
            _id: idArchivo1,
            nombreArchivo: 'archivo1',
            extension: 'html',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        var arch2 = new archivo({
            _id: idArchivo2,
            nombreArchivo: 'archivo2',
            extension: 'css',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        var arch3 = new archivo({
            _id: idArchivo3,
            nombreArchivo: 'archivo3',
            extension: 'js',
            usuarioCreador: req.session.codigoUsuario,
            proyectoRaiz: mongoose.Types.ObjectId(obj._id)
        });

        arch1.save();
        arch2.save();
        arch3.save();

        idsArchivos = {
            html: idArchivo1,
            css: idArchivo2,
            js: idArchivo3
        }
        
        res.send(idsArchivos);

        proyecto.update(
            {
                _id: mongoose.Types.ObjectId(obj._id)
            },
            {
                $push:{
                    archivoHTML: idArchivo1,
                    archivoCSS: idArchivo2,
                    archivoJS: idArchivo3
            }
            }
        )
        .then(resp=>{
            res.send(resp);
            console.log(resp);
        })
        .catch(error=>{
            res.send(error);
        });

    res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });
}



//Peticion para actualizar un proyecto
router.put("/:id",function(req,res){
    proyecto.update(
        {_id:req.body.id}, 
        {
            nombreProyecto : req.body.nombreProyecto
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});



//Peticion para eliminar un proyecto
router.delete("/:id",function(req, res){
    proyecto.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener los archivos HTML de un proyecto en particular
router.get("/:id/archivosHTML",function(req,res){
    proyecto.aggregate([
        {
            $lookup:{
                from:"archivos",
                localField:"archivoHTML", 
                foreignField:"_id",
                as:"archivos"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        { 
            $project:{archivos:{contenido:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener los archivos CSS de un proyecto en particular
router.get("/:id/archivosCSS",function(req,res){
    proyecto.aggregate([
        {
            $lookup:{
                from:"archivos",
                localField:"archivoCSS", 
                foreignField:"_id",
                as:"archivos"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        { 
            $project:{archivos:{contenido:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener los archivos CSS de un proyecto en particular
router.get("/:id/archivosJS",function(req,res){
    proyecto.aggregate([
        {
            $lookup:{
                from:"archivos",
                localField:"archivoJS", 
                foreignField:"_id",
                as:"archivos"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        { 
            $project:{archivos:{contenido:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para agregar colaborador a un proyecto
router.post("/compartir", function(req, res){
    proyecto.update(
        { 
            _id: req.body.idProyecto
        },
        {
            $push:{
                colaboradores: mongoose.Types.ObjectId(req.body.idUsuario)
            }
        }
    )
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para eliminar un colaborador de un proyecto
router.delete("/eliminarColaborador/:idProyecto/:idUsuario",function(req, res){
    proyecto.update(
        {
            _id: req.params.idProyecto
        },
        {
            $pull:{
                colaboradores:mongoose.Types.ObjectId(req.params.idUsuario)
            }
            
        }
    ).then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Obtener los colaboladores de un proyecto en particular
router.get("/:id/usuarios",function(req,res){
    proyecto.aggregate([
        {
            $lookup:{
                from:"usuarios",
                localField:"colaboradores", 
                foreignField:"_id",
                as:"usuarios"
            }
        },
        {
            $match:{
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        { 
            $project:{nombreProyecto:1, usuarios:{usuario:1, _id:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//peticion para mostrar los proyectos compartidas
router.post("/compartidos",function(req,res){
    proyecto.find({
        colaboradores:mongoose.Types.ObjectId(req.session.codigoUsuario)
    },
    {_id:1,usuarioCreador:1, nombreProyecto:1})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para eliminar un colaborador de un proyecto
router.delete("/eliminarColaboracion/:idProyecto",function(req, res){
    proyecto.update(
        {
            _id: req.params.idProyecto
        },
        {
            $pull:{
                colaboradores:mongoose.Types.ObjectId(req.session.codigoUsuario)
            }
            
        }
    ).then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;