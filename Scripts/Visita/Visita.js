window.onload = function () {
    listarVisitas();
    listarDepartamento();
    selectEmpleadoIni();
};

//Función para inicializar SELECT con solo la opción --Seleccione--
function selectEmpleadoIni() {
    var contenido = '';
    contenido += '<option value = "">';
    contenido += '--Seleccione--';
    contenido += '</option>';
    document.getElementById("empleados").innerHTML = contenido;
    document.getElementById("gafetes").innerHTML = contenido;
};

//Función para listar visitas que aun no han marcado salida
function listarVisitas() {
    fetch("http://192.168.0.10:8081/api/Visita")
        .then(res => res.json())
        .then(res => {
            mostrarVisitas(res);
        });
};

//Función para mostrar todas las visitas
function listaTotal() {
    fetch("http://192.168.0.10:8081/api/ListaVisitas")
        .then(res => res.json())
        .then(res => {
            listadoTotal(res);
        });
};

//Función para consumir Wep Api con lista de los Departamentos existentes
function listarDepartamento() {
    fetch("http://192.168.0.10:8081/api/Departamento")
        .then(res => res.json())
        .then(res => {
            mostrarDepartamento(res, true);
        });
};

//Función para consumir Wep Api con lista de los Empleados existentes
function ListarEmpleados() {
    var iidDepartamento = document.getElementById("departamentos").value;
    fetch("http://192.168.0.10:8081/api/Empleado/?iidDepartamento=" + iidDepartamento)
        .then(res => res.json())
        .then(res => {
            mostrarEmpleado(res, true);
        });
};

//Función para consumir Wep Api con lista de los Gafetes existentes
function ListarGafetes() {
    var letra = document.getElementById("visita").value;
    fetch("http://192.168.0.10:8081/api/Gafete/?letra=" + letra)
        .then(res => res.json())
        .then(res => {
            mostrarGafete(res, true);
        })
};

//Llenado de función Select para Departamentos
function mostrarDepartamento(res, primerElemento) {
    var contenido = '';
    if (primerElemento == true) {
        contenido += '<option value = "">';
        contenido += '--Seleccione--';
        contenido += '</option>';
    }
    for (var i = 0; i < res.length; i++) {
        contenido += '<option value="' + res[i].idDepartamentoCLS + '"> ';
        contenido += res[i].nombreDepartamentoCLS;
        contenido += '</option>';
    }
    document.getElementById("departamentos").innerHTML = contenido;
};

//Llenado de función Select para Empleados
function mostrarEmpleado(res, primerElemento) {
    var contenido = '';
    if (primerElemento == true) {
        contenido += '<option value = "">';
        contenido += '--Seleccione--';
        contenido += '</option>';
    }
    for (var i = 0; i < res.length; i++) {
        contenido += '<option value="' + res[i].idEmpleadoCLS + '"> ';
        contenido += res[i].nombreEmpCLS + ' ' + res[i].aParternoEmpCLS;
        contenido += '</option>';
    }
    document.getElementById("empleados").innerHTML = contenido;
};

//Llenado de función Select para Gafetes
function mostrarGafete(res, primerElemento) {
    var contenido = '';
    if (primerElemento == true) {
        contenido += '<option value = "">';
        contenido += '--Seleccione--';
        contenido += '</option>';
    }
    for (var i = 0; i < res.length; i++) {
        contenido += '<option value="' + res[i].idGafeteCLS + '"> ';
        contenido += res[i].nombreGafCLS;
        contenido += '</option>';
    }
    document.getElementById("gafetes").innerHTML = contenido;
}

//Mostrar Visitas en caso de que haya
function mostrarVisitas(res) {
    var contenido = '';
    if (res == 0) {
        contenido += '<div class="text-center"><h1>No hay visitas por el momento :(</h1></div>';
    } else {
        contenido += '<table id="tabla-visita" class="table table-striped">';
        contenido += '<thead>';
        contenido += '<tr><td>Id</td>';
        contenido += '<td>Nombre</td>';
        contenido += '<td>Apellido Paterno</td>';
        contenido += '<td>Apellido Materno</td>';
        contenido += '<td>Entrada Visitante</td>';
        contenido += '<td>Gafete</td>';
        contenido += '<td>Empleado Nombre</td>';
        contenido += '<td>Empleado Apellido</td>';
        contenido += '<td>Departamento</td>';
        contenido += '<td>Acciones</td></tr>';
        contenido += '</thead>';

        var llaves = Object.keys(res[0]);
        contenido += '<tbody>';
        for (var i = 0; i < res.length; i++) {
            contenido += '<tr>';
            for (j = 0; j < llaves.length; j++) {
                var valorLlaves = llaves[j];
                contenido += '<td>';
                contenido += res[i][valorLlaves];
                contenido += '</td>';
            }
            var llaveId = llaves[0];
            contenido += '<td>';
            contenido += '<button class="btn-danger" onclick="Salida(' + res[i][llaveId] + ') ">Salida</button>';
            contenido += '</td>';
            contenido += '</tr>';
        }
        contenido += '</tbody>';
        contenido += '</table>';
    }
    document.getElementById("TablaPropia").innerHTML = contenido;
};

//Crear nueva visita
function Guardar() {
    if (datosObligatorios() == true) {
        var nombre = document.getElementById("txtNombre").value;
        var aPaterno = document.getElementById("txtaPaterno").value;
        var aMaterno = document.getElementById("txtaMaterno").value;
        var idEmpleado = document.getElementById("empleados").value;
        var idGafete = document.getElementById("gafetes").value;
        var entrada = new Date();
        var entradaVis = entrada.getFullYear() + "-" + (entrada.getMonth() + 1) + "-" + entrada.getDate() + " " + entrada.getHours() + ":" + entrada.getMinutes() + ":" + entrada.getSeconds();

        fetch("http://192.168.0.10:8081/api/Visita", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                "nombreVis": nombre,
                "aPaternoVis": aPaterno,
                "aMaternoVis": aMaterno,
                "EntradaVis": entradaVis,
                "idGafete": idGafete,
                "idEmpleado": idEmpleado
            })
        }).then(res => res.json())
            .then(res => {
                if (res == 1) {
                    alert("Se ejecuto correctamente");
                    listarVisitas();
                    document.getElementById("btnCancelar").click();
                } else {
                    alert("Hubo un error");
                }
            })
    }
    else {

    }
    
};

//Marcar salida de la visita
function Salida(iidVisita) {
    var salida = new Date();
    var salidaVis = salida.getFullYear() + "-" + (salida.getMonth() + 1) + "-" + salida.getDate() + " " + salida.getHours() + ":" + salida.getMinutes() + ":" + salida.getSeconds();
    if (confirm("Confirmar salida de Visita") == 1) {
        fetch("http://192.168.0.10:8081/api/Visita?iidVisita=" + iidVisita + "&oSalidaVis=" + salidaVis, {
            method: "PUT",
        }).then(res => res.json())
            .then(res => {
                if (res == 1) {
                    alert("Salida completada!");
                    listarVisitas();
                } else {
                    alert("Ocurrio un error");
                }
            })
    }
};

//Mostrar lista de todas las visitas que ya salieron
function listadoTotal(res) {
    var contenido = '';
    if (res == 0) {
        contenido += '<div class="text-center"><h1>No hay visitas por el momento :(</h1></div>';
    } else {
        contenido += '<table id="tabla-visita" class="table table-striped">';
        contenido += '<thead>';
        contenido += '<tr><td>Nombre</td>';
        contenido += '<td>Apellido Paterno</td>';
        contenido += '<td>Apellido Materno</td>';
        contenido += '<td>Entrada Visitante</td>';
        contenido += '<td>Salida Visitante</td>';
        contenido += '<td>Departamento</td>';
        contenido += '<td>Empleado Nombre</td>';
        contenido += '<td>Empleado Apellido</td>';
        contenido += '<td>Gafete</td></tr>';
        contenido += '</thead>';

        var llaves = Object.keys(res[0]);
        contenido += '<tbody>';
        for (var i = 0; i < res.length; i++) {
            contenido += '<tr>';
            for (j = 0; j < llaves.length; j++) {
                var valorLlaves = llaves[j];
                contenido += '<td>';
                contenido += res[i][valorLlaves];
                contenido += '</td>';
            }
            contenido += '</tr>';
        }
        contenido += '</tbody>';
        contenido += '</table>';
    }
    document.getElementById("TablaPropia").innerHTML = contenido;
};

//Borrar Modal
function borrarDatos() {
    var controles = document.getElementsByClassName("borrar");
    var ncontroles = controles.length;
    for (var i = 0; i < ncontroles; i++) {
        controles[i].value = "";
    }
}

function datosObligatorios() {
    var exito = true;
    var controlesObligatorio = document.getElementsByClassName("obligatorio");
    var ncontroles = controlesObligatorio.length;
    for (var i = 0; i < ncontroles; i++) {
        if (controlesObligatorio[i].value == "") {
            exito = false;
            controlesObligatorio[i].parentNode.classList.add("error");
        }
        else {
            controlesObligatorio[i].parentNode.classList.remove("error");
        }
    }
    return exito;
}