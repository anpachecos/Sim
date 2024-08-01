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

