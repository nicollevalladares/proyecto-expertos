var express = require("express");
var router = express.Router();
var subcarpeta = require("../models/subcarpeta");
var carpeta = require("../models/carpeta");
var mongoose = require("mongoose");

//Peticion para guardar una sub-carpeta
router.post("/", function(req, res){
    var subcarp = new subcarpeta({
        nombreSubCarpeta: req.body.subCarpeta,
        usuarioCreador: req.session.codigoUsuario,
        archivos: [],
        subcarpetas:[],
        proyectos: [],
        carpetaRaiz: req.body.carpetaRaiz
    });

    subcarp.save()
    .then(obj=>{
        carpeta.update(
            {
                _id:req.body.carpetaRaiz
            },
            {
                $push:{
                    subcarpetasCarpeta: mongoose.Types.ObjectId(obj._id)
            }
            }
        )
        .then(data=>{
            res.send(data);
        })
        .catch(error=>{
            res.send(error);
        });

        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});

//Peticion para agregar colaborador a una subcarpeta
router.post("/compartir", function(req, res){
    subcarpeta.update(
        { 
            _id: req.body.idSubCarpeta
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
        res.send(data);
    });
});

//Obtener los colaboladores de una subcarpeta en particular
router.get("/:id/usuarios",function(req,res){
    subcarpeta.aggregate([
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
            $project:{nombreSubCarpeta:1, usuarios:{usuario:1, _id:1}}
        }
    ])
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para eliminar un colaborador de una subCarpeta
router.delete("/eliminarColaborador/:idSubCarpeta/:idUsuario",function(req, res){
    subcarpeta.update(
        {
            _id: req.params.idSubCarpeta
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


//Obtener una subcarpeta en particular
router.get("/:id",function(req,res){
    subcarpeta.find({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});

//Peticion para actualizar una subcarpeta
router.put("/:id",function(req,res){
    subcarpeta.update(
        {_id:req.body.id}, 
        {
            nombreSubCarpeta : req.body.subCarpeta
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });
});



//Peticion para eliminar una subcarpeta
router.delete("/:id",function(req, res){
    subcarpeta.remove({_id:req.params.id})
    .then(data=>{
        res.send(data);
    })
    .catch(error=>{
        res.send(error);
    });
});


module.exports = router;