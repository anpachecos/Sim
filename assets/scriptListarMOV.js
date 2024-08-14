document.addEventListener("DOMContentLoaded", function() {

    var data_listar_MOV = [
        ["7401107", "8956032185521837308", "LAB ZP", "Operativo", "Barranca", "13-08-2024"],
        ["7401085", "8956030163614288798", "LAB ZP", "Operativo", "Barranca", "13-08-2024"],
        ["7400955", "8956030163614315013", "LAB ZP", "Operativo", "ZP 1001", "13-08-2024"],
        ["7401133", "8956030163614287592", "LAB ZP", "Operativo", "ZP 1001", "13-08-2024"],
        ["7401330", "8956030163614310170", "LAB ZP", "Operativo", "ZP 1001", "13-08-2024"],
        ["7400906", "8956030163614290000", "LAB ZP", "Operativo", "Contingencia ZP Subus", "13-08-2024"],
        ["7400934", "8956030163614312838", "LAB ZP", "Operativo", "Contingencia ZP Subus", "13-08-2024"],
        ["7400877", "8956030163614310162", "LAB ZP", "Operativo", "Contingencia ZP Vule", "13-08-2024"],
        ["7401489", "8956030163614287931", "LAB ZP", "Operativo", "Contingencia ZP Vule", "13-08-2024"],
        ["7400717", "8956030163614310774", "LAB ZP", "Operativo", "Contingencia ZP Voy Santiago", "13-08-2024"],
        ["7400874", "8956030163614291271", "LAB ZP", "Operativo", "Contingencia ZP Voy Santiago", "13-08-2024"],
        ["7401280", "8956030163614287774", "SONDA", "PRÉSTAMO", "Roberto Saa", "28-04-2024"],
        ["7501119", "8956030163614288582", "SONDA", "PRÉSTAMO", "Testing (Andrea Delpino)", "28-04-2024"],
        ["7501218", "8956030163614288913", "SONDA", "PRÉSTAMO", "Testing (Andrea Delpino)", "28-04-2024"],
        ["7500804", "8956032206578393316", "SONDA", "PRÉSTAMO", "Testing (Andrea Delpino)", "28-04-2024"]
    ];

    var container_listar_MOV = document.getElementById('container_listar_MOV');

    var filterDropdown = document.getElementById('filter-dropdown');
    var filtroUbicaciones = document.getElementById('filtro_ubicaciones');
    var filtroEstados = document.getElementById('filtro_estados');
    var fechaDesde = document.getElementById('fecha-desde');
    var fechaHasta = document.getElementById('fecha-hasta');
    var filtrarFechasBtn = document.getElementById('filtrar-fechas');

    var hot = new Handsontable(container_listar_MOV, {
        data: data_listar_MOV,
        colHeaders: ['AMID', 'ICCID', 'Ubicación', 'Estado', 'Observación', 'Fecha Movimiento'],
        rowHeaders: true,
        filters: true,
        dropdownMenu: true,
        manualColumnResize: true,
        contextMenu: {
            items: {
                "row_above": {}, 
                "row_below": {}, 
                "remove_row": {}, 
                "undo": {}, 
                "redo": {}, 
                "make_read_only": {}, 
                "alignment": {}, 
                "filter_by_value": {}, 
                "filter_action_bar": {}, 
                "---------": {}, 
                "copy": {}, 
                "cut": {}, 
                "hidden_columns_hide": {}, 
                "hidden_columns_show": {}, 
                "col_left": false, 
                "col_right": false, 
                "remove_col": false, 
                "clear_column": false, 
            }
        },
        licenseKey: 'non-commercial-and-evaluation',
        cells: function(row, col, prop) {
            var cellProperties = {};
            cellProperties.readOnly = true; 
            return cellProperties;
        }
    });

    var uniqueObservations = Array.from(new Set(data_listar_MOV.map(row => row[4]))).sort();
    var ubicacionesUnicas = Array.from(new Set(data_listar_MOV.map(row => row[2]))).sort();
    var estadosUnicas = Array.from(new Set(data_listar_MOV.map(row => row[3]))).sort();

    uniqueObservations.forEach(function(observation) {
        var option = document.createElement('option');
        option.value = observation;
        option.textContent = observation;
        filterDropdown.appendChild(option);
    });

    ubicacionesUnicas.forEach(function(ubicacion) {
        var option = document.createElement('option');
        option.value = ubicacion;
        option.textContent = ubicacion;
        filtroUbicaciones.appendChild(option);
    });

    estadosUnicas.forEach(function(estado) {
        var option = document.createElement('option');
        option.value = estado;
        option.textContent = estado;
        filtroEstados.appendChild(option);
    });

    function applyFilters() {
        var selectedObservation = filterDropdown.value;
        var selectedUbicacion = filtroUbicaciones.value;
        var selectedEstado = filtroEstados.value;
        var fechaDesdeValue = fechaDesde.value ? new Date(fechaDesde.value) : null;
        var fechaHastaValue = fechaHasta.value ? new Date(fechaHasta.value) : null;


        console.log("Fecha Desde:", fechaDesdeValue);
        console.log("Fecha Hasta:", fechaHastaValue);
    
        var filteredData = data_listar_MOV.filter(function(row) {
            var observationMatch = !selectedObservation || row[4] === selectedObservation;
            var ubicacionMatch = !selectedUbicacion || row[2] === selectedUbicacion;
            var estadoMatch = !selectedEstado || row[3] === selectedEstado;
    
            // Convertir la fecha de la tabla a un objeto Date
            var fechaParts = row[5].split('-');
            var fecha = new Date(fechaParts[2], fechaParts[1] - 1, fechaParts[0]);
    
            var dateMatch = true;
            if (fechaDesdeValue) {
                dateMatch = fecha >= fechaDesdeValue;
            }
            if (fechaHastaValue) {
                dateMatch = dateMatch && fecha <= fechaHastaValue;
            }
    
            return observationMatch && ubicacionMatch && estadoMatch && dateMatch;
        });
    
        hot.loadData(filteredData);
    }
    

    function clearFilters() {
        filterDropdown.value = "";
        filtroUbicaciones.value = "";
        filtroEstados.value = "";

        hot.loadData(data_listar_MOV);
    }

    filtrarFechasBtn.addEventListener('click', function(event) {
        event.preventDefault();  // Prevenir que el formulario se envíe
        applyFilters();
    });


    filterDropdown.addEventListener('change', applyFilters);
    filtroUbicaciones.addEventListener('change', applyFilters);
    filtroEstados.addEventListener('change', applyFilters);
    filtrarFechasBtn.addEventListener('click', applyFilters);

    document.getElementById('clear-filters').addEventListener('click', clearFilters);

});
