
/*Este script es para mostrar la información del ICCID, la idea es que luego se busquen sus valores en la base de datos y recién allí aparezca*/
function mostrarInfo() {
    const msisdnInfo = "56987787546";
    const nodoConcertIP = "10.228.56.1";
    const nodoCondorIP = "10.232.56.1";
    
    document.getElementById('msisdn_info').textContent = msisdnInfo;
    document.getElementById('nodo_concert_info').textContent = nodoConcertIP;
    document.getElementById('nodo_condor_ip').textContent = nodoCondorIP;
    document.getElementById('info_sim').style.display = 'block';
    document.getElementById('nuevo_iccid_section').style.display = 'block';
}

/*En esta función validamos que lo que se está insertando en los cuadros de texto cumple el formato solicitado
Además en esta parte se envia el mensaje de confirmación*/
function confirmarCambio() {
    const iccidAntiguo = document.getElementById('iccid_antiguo').value;
    const iccidNuevo = document.getElementById('iccid_nuevo').value;
    const msisdnInfo = document.getElementById('msisdn_info').textContent;
    const motivoCambio = document.getElementById('motivo_cambio').value;

    if (iccidNuevo.length < 19 || iccidNuevo.length > 20) {
        alert("El ICCID NUEVO debe tener entre 19 - 20 caracteres. Modifícalo y vuelve a intentar");
        return;
    }

    if (iccidAntiguo.length < 19 || iccidAntiguo.length > 20) {
        alert("El ICCID ANTIGUO debe tener 20 caracteres. Modifícalo y vuelve a intentar");
        return;
    }

    if (iccidAntiguo === iccidNuevo) {
        alert("El ICCID nuevo no puede ser igual al ICCID antiguo. Modifícalo y vuelve a intentar");
        return;
    }

    if (motivoCambio === "") {
        alert("Debe seleccionar un motivo para el cambio.");
        return;
    }

    if (confirm(`¿Estás seguro que quieres cambiar el ICCID ${iccidAntiguo} por el ICCID ${iccidNuevo} para el MSISDN ${msisdnInfo}?\nMotivo: ${motivoCambio}`)) {
        // Aquí puedes agregar la lógica para realizar el cambio en el servidor
        alert("El ICCID ha sido cambiado exitosamente.");
        // Recargar la página después del cambio
        location.reload();
    } else {
        alert("El cambio ha sido cancelado.");
    }
}

/*Con esta función estoy utlizano un editor WYSIWYG */

document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: 'textarea#observacion',
        plugins: 'lists link image table',
        toolbar: 'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'
    });
});


/*Me sigue saliendo el error de This domain is not registered in the TinyMCE Customer Portal
    Tengo que agregar el dominio a TinyMCE, actualmente no deja usarlo  */
tinymce.init({
    selector: 'textarea',  // Reemplaza con el selector adecuado para tu caso
    plugins: 'advlist autolink lists link image charmap preview anchor textcolor',
    toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
  });