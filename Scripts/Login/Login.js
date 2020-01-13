function Ingresar() {
    var usuario = document.getElementById("txtUsuario").value;
    var contraseña = document.getElementById("txtContraseña").value;
    if (usuario == "") {
        alert("Ingresar Usuario");
        return;
    }
    if (contraseña == "") {
        alert("Ingrese contraseña");
        return;
    }

    $.get("../Login/Validar/?usuario=" + usuario + "&contraseña=" + contraseña, function (data) {
        if (data == 1) {
            window.location.href = "../Visita";
        } else {
            alert("Ocurrio un error");
        }
    });
};