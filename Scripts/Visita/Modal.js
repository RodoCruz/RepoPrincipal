escribir();
//Creación de Modal
function escribir(){
    var contenido = "";
    contenido += '<div class="row justify-content-around">';
    //Boton para agregar visita
    contenido += '<button onclick="borrarDatos()" type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#AgregarModal">'
    contenido += 'Agregar Visita';
    contenido += '</button>';
    contenido += '<button onclick="listarVisitas()" type="button" class="btn btn-warning btn-lg">'
    contenido += 'Visitas Actuales';
    contenido += '</button>';
    contenido += '<button onclick="listaTotal()" type="button" class="btn btn-info btn-lg">'
    contenido += 'Lista Visitas';
    contenido += '</button>';

    contenido += '<div class="modal fade" id="AgregarModal" tabindex="-1" role="dialog" aria-hidden="true">';
    contenido += '<div class="modal-dialog" role="document">';
    contenido += '<div class="modal-content">';
    //Modal Header
    contenido += '<div class="modal-header">';
    contenido += '<h5 class="modal-title">Agregar Nuevo Visitante</h5>';
    contenido += '<button type="button" class="close" data-dismiss="modal" aria-label="Close">';
    contenido += '<span aria-hidden="true">&times;</span>';
    contenido += '</button>';
    contenido += '</div>';
    //Modal Body
    contenido += '<div class="modal-body">';
    contenido += '<table style="width:80%; margin:auto">';
    contenido += '<tr>';
    //Agregar Nombre Visita
    contenido += '<td width="40%">Nombre</td>';
    contenido += '<td width="60%"><input class="borrar obligatorio form-control" type="text" id="txtNombre" /></td >';
    contenido += '</tr>';
    //Agregar Apellido Paterno Visita
    contenido += '<tr>';
    contenido += '<td>Apellido Paterno</td>';
    contenido += '<td><input class="borrar obligatorio form-control" type="text" id="txtaPaterno" /></td >';
    contenido += '</tr>';
    //Agregar Apellido Materno Visita
    contenido += '<tr>';
    contenido += '<td>Apellido Materno</td>';
    contenido += '<td><input class="borrar obligatorio form-control" type="text" id="txtaMaterno" /></td >';
    contenido += '</tr>';
    //Espaciado
    contenido += '<tr><td><label></label></td></tr>';
    //Seleccionar Departamento que Visita
    contenido += '<tr>';
    contenido += '<td><label>Departamento</label></td>';
    contenido += '<td><select class="borrar obligatorio form-control" onchange="ListarEmpleados()" id="departamentos"></select></td>';
    contenido += '</tr>';
    //Seleccionar Empleado que Visita
    contenido += '<tr>';
    contenido += '<td><label>Empleado que Visita</label></td>';
    contenido += '<td><select  class="borrar obligatorio form-control" id="empleados"></select></td>';
    contenido += '</tr>';
    //Espaciado
    contenido += '<tr><td><label></label></td></tr>';
    //Seleccionar si es Visita, Proveedor o Cliente
    contenido += '<tr>';
    contenido += '<td><label>Tipo de Visita</label></td>';
    contenido += '<td><select class="borrar obligatorio form-control" onchange="ListarGafetes()" id="visita">';
    contenido += '<option value="">--Seleccione--</option>';
    contenido += '<option value="V">Visita</option>';
    contenido += '<option value="P">Proveedor</option>';
    contenido += '<option value="C">Cliente</option>';
    contenido += '</select>';
    contenido += '</td>';
    contenido += '</tr>';
    contenido += '<tr>';
    contenido += '<td><label>Gafete</label></td>';
    contenido += '<td><select class="borrar obligatorio form-control" id="gafetes"></select></td>';
    contenido += '</tr>';
    contenido += '</table>';
    contenido += '</div>';
    //Modal Footer
    contenido += '<div class="modal-footer">';
    contenido += '<button type="button" onclick="Guardar()" class="btn btn-primary">Guardar</button>';
    contenido += '<button type="button" id="btnCancelar" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>';
    contenido += '</div>';
    contenido += '</div>';
    contenido += '</div>';
    contenido += '</div>';
    contenido += '</div>';
    contenido += '';

    document.getElementById("ModalPropio").innerHTML = contenido;
};