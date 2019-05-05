$(document).ready(function(){
    console.log("El DOM ha sido cargado");
    $.ajax({
        url:"/carpetas/compartidas",
        method:"POST",
        dataType:"json",
        success:function(res){
            console.log(res);

            document.getElementById('carpetasCompartidas').innerHTML='';
                
                    if(res.length == 0){
                        document.getElementById('carpetasCompartidas').innerHTML=`
                        <div style="width:50%" class="alert alert-danger" role="alert">
                            No hay carpetas compartidas
                        </div>`;
                    }
                    else{
                        document.getElementById('carpetasCompartidas').innerHTML='';
                        for (var i = 0; i < res.length; i++) {
                        document.getElementById('carpetasCompartidas').innerHTML+=`
                        <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center"> 
                                    <button type="button" class="btn btn-proyecto" onclick="contenidoCarpeta('${res[i]._id}')">
                                        <i class="fas fa-folder-open"></i><br>
                                        ${res[i].nombreCarpeta} <Br>
                                        Creador: <span id='nombre-${res[i].usuarioCreador}-${i}'></span>
                                    </button>
                                    <div style="width:300px; margin-top:-115px">
                                        <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarCarpetaCompartida('${res[i]._id}')">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        generarNombreCreador(res[i].usuarioCreador,i);
                        }
                    }
                
            }   ,
            error: function (e) {
             //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
            },
    });

    $.ajax({
        url:"/proyectos/compartidos",
        method:"POST",
        dataType:"json",
        success:function(res){
            console.log(res);

            document.getElementById('proyectosCompartidos').innerHTML='';
                
            if(res.length == 0){
                document.getElementById('proyectosCompartidos').innerHTML=`
                <div  style="width:50%" class="alert alert-danger" role="alert">
                    No hay proyectos compartidos
                </div>`;
            }
            else{
                document.getElementById('proyectosCompartidos').innerHTML='' ;
                for (var i = 0; i < res.length; i++) {
                document.getElementById('proyectosCompartidos').innerHTML+=`
                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[i]._id}')">
                                <i class="far fa-file-alt"></i><br>
                                ${res[i].nombreProyecto} <Br>
                                Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-proyecto'></span>
                            </button>
                            <div style="width:300px; margin-top:-115px">
                                <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarProyectosCompartidos('${res[i]._id}')">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
                generarNombreCreadorProyecto(res[i].usuarioCreador,i);
                }
            }  
        },
        error: function (e) {
        },
    });

    $.ajax({
        url:"/archivos/prueba",
        method:"POST",
        dataType:"json",
        success:function(res){
            console.log(res);

            document.getElementById('archivosCompartidos').innerHTML='';
                
            if(res.length < 1){
                document.getElementById('archivosCompartidos').innerHTML=`
                <div style="width:50%" class="alert alert-danger" role="alert">
                    No hay archivos compartidos
                </div>`;
            }
            else{
                document.getElementById('archivosCompartidos').innerHTML='';
                for (var i = 0; i < res.length; i++) {
                if(res[i].extension == "html"){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}')">
                            <i class="fab fa-html5"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <div style="width:300px; margin-top:-115px">
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'css'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fab fa-css3-alt"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <div style="width:300px; margin-top:-115px">
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'js'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i class="fab fa-js-square"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <div style="width:300px; margin-top:-115px">
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'py'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i style="font-size: 70px; color:#273c7c" class="fab fa-python"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <div style="width:300px; margin-top:-115px">
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>`;
                }

                else if(res[i].extension == 'php'){
                    document.getElementById('archivosCompartidos').innerHTML += `
                    <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                    <div class="card-body">
                    
                    <div class="d-flex justify-content-between align-items-center"> 
                        <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[i]._id}', '${idCarpeta}')">
                            <i style="font-size: 70px; color:purple" class="fab fa-php"></i><br>
                            ${res[i].nombreArchivo}.${res[i].extension} <br>
                            Creador: <span id='nombre-${res[i].usuarioCreador}-${i}-archivo'></span>
                        </button>
                        <div style="width:300px; margin-top:-115px">
                            <button class="btn btn-danger btn-circle btn-sm" onclick="eliminarArchivosCompartidos('${res[i]._id}')">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    </div>
                </div>`;
                }
                generarNombreCreadorArchivo(res[i].usuarioCreador,i);
                }
            }  
        },
        error: function (e) {
        console.log('ERROR ARCHIVOS', e);
        },
    });

});

function generarNombreCreador(idCreador, i){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(res){
            document.getElementById(`nombre-${idCreador}-${i}`).innerHTML = res[0].nombre+' '+res[0].apellido; 
		},
	}); 
}

function generarNombreCreadorProyecto(idCreador, i){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(res){
            document.getElementById(`nombre-${idCreador}-${i}-proyecto`).innerHTML = res[0].nombre+' '+res[0].apellido; 
		},
	}); 
}

function generarNombreCreadorArchivo(idCreador, i){
    $.ajax({
		url:`/user/${idCreador}/creador`,
		method:"GET",
		dataType:"JSON",
		success:function(res){
            document.getElementById(`nombre-${idCreador}-${i}-archivo`).innerHTML = res[0].nombre+' '+res[0].apellido;
		},
	}); 
}

function cargarProyecto(idProyecto){
    window.location = "nuevoproyecto.html?idProyecto="+idProyecto;
}

function editorArchivos(idArchivo){
    window.location = "editor.html?idArchivo=" + idArchivo;
}

function contenidoCarpeta(idCarpeta){
    $.ajax({
        url:`/carpetas/${idCarpeta}/proyectos`,
        method:"GET",
        dataType:"JSON",
        success:function(res){
                //window.location = "contenido-carpeta.html"
                console.log(res);
                document.getElementById('pagina-compartidos').innerHTML = `
                <div>
                    <div id="nombre-pagina">
                        <h1>CARPETAS</h1>
                        <button class="btn btn-primary" data-toggle="modal" data-target="#modalCarpeta">Nueva Carpeta</button>
                    </div>
                    <div class="row" id="carpetas">
                        
                    </div>

                </div> `;
                document.getElementById('nombre-pagina').innerHTML =`
                <h1>CONTENIDO CARPETA: ${res[0].nombreCarpeta}</h1>
                <button class="btn btn-primary" data-toggle="modal" data-target="#modalNuevosDocs"><i class="fas fa-plus"></i>Nuevo</button>`;
                document.getElementById('carpetas').innerHTML = '';
                for(var i=0;i<res[0].proyectos.length;i++){
                    document.getElementById('carpetas').innerHTML += 
                    `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                        <div class="card-body">
                        
                        <div class="d-flex justify-content-between align-items-center"> 
                            <button type="button" class="btn btn-proyecto" onclick="cargarProyecto('${res[0].proyectos[i]._id}')">
                                <i class="far fa-file-alt"></i><br>
                                ${res[0].proyectos[i].nombreProyecto}
                            </button>
                        </div>
                        </div>
                    </div>`;
                }

                $.ajax({
                    url:`/carpetas/${idCarpeta}/subcarpetas`,
                    method:"GET",
                    dataType:"JSON",
                    success:function(res){
                            //window.location = "contenido-carpeta.html"
                            console.log(res);
                            for(var i=0;i<res[0].subcarpetas.length;i++){
                                document.getElementById('carpetas').innerHTML += 
                                `<div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                    <div class="card-body">
                                    
                                    <div class="d-flex justify-content-between align-items-center"> 
                                        <button type="button" class="btn btn-proyecto" onclick="cargarSubCarpeta('${res[0].subcarpetas[i]._id}')">
                                            <i class="fas fa-folder-open"></i><br>
                                            ${res[0].subcarpetas[i].nombreSubCarpeta}
                                        </button>
                                    </div>
                                    </div>
                                </div>`;
                            }

                            $.ajax({
                                url:`/carpetas/${idCarpeta}/archivos`,
                                method:"GET",
                                dataType:"JSON",
                                success:function(res){
                                        //window.location = "contenido-carpeta.html"
                                        console.log(res);
                                        for(var i=0;i<res[0].archivos.length;i++){
                                            if(res[0].archivos[i].extension == "html"){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fab fa-html5"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                                            else if(res[0].archivos[i].extension == 'css'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fab fa-css3-alt"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                        
                                            else if(res[0].archivos[i].extension == 'js'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i class="fab fa-js-square"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                        
                                            else if(res[0].archivos[i].extension == 'py'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i style="font-size: 70px; color:#273c7c" class="fab fa-python"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                        
                                            else if(res[0].archivos[i].extension == 'php'){
                                                document.getElementById('carpetas').innerHTML += `
                                                <div class="py-3 col-lg-4 col-md-6 col-sm-12">
                                                <div class="card-body">
                                                
                                                <div class="d-flex justify-content-between align-items-center"> 
                                                    <button type="button" class="btn btn-proyecto" onclick="editorArchivos('${res[0].archivos[i]._id}', '${idCarpeta}')">
                                                        <i style="font-size: 70px; color:purple" class="fab fa-php"></i><br>
                                                        ${res[0].archivos[i].nombreArchivo}.${res[0].archivos[i].extension}
                                                    </button>
                                                </div>
                                                </div>
                                            </div>`;
                                            }
                                        }
                                },
                                error: function (e) {
                                //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
                                },
                            });
                    },
                    error: function (e) {
                    //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
                    },
                });
        },
        error: function (e) {
        //document.getElementById("div-proyectos").innerHTML = 'Ha ocurrido un error al conectar con el servidor.';
        },
    });
}