var express = require("express");
var router = express.Router();
var proyecto = require("../models/proyecto");

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
    var proy = new proyecto({
        nombreProyecto: req.body.nombreProyecto,
        html: 'archivo.html',
        css: 'archivo.css',
        js: 'archivo.js',
        usuarioCreador: req.session.codigoUsuario,
        carpetaRaiz: req.body.idCarpeta
    });

    proy.save()
    .then(obj=>{
        res.send(obj);
    })
    .catch(error=>{
        res.send(obj);
    });

});

//Peticion para actualizar un proyecto
router.put("/:id",function(req,res){
    proyecto.update(
        {_id:req.params.id},
        {
            css : req.body.css,
            html : req.body.html,
            javascript:req.body.javascript,
            ultimaModificacion:req.body.ultimaModificacion
            
        }
    ).then(result=>{
        res.send(result);
    })
    .catch(error=>{
        res.send(error);
    });//El primero son los filtros, el segundo son los campos
});


//Peticion para actualizar un proyecto
router.put("/",function(req,res){
    proyecto.update(
        {_id:req.body.id},
        {
            nombre : req.body.nombre
            
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



module.exports = router;