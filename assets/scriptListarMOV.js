// #region HTML ListarVAL
    // Este Script es para mostrar los datos de data_listar_val en una tabla de excel, utilizando HANDSONTABLE
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
        
        


    // Contenedor en el que pondremos una tabla, cuando queramos ponerlo en el HTML tendremos que usar un div con ese id
        // Ejemplo: <div id="container_listar_val"></div>
        var container_listar_MOV = document.getElementById('container_listar_MOV');

    // Filtros disponibles
        var filterDropdown = document.getElementById('filter-dropdown');
        var filtroUbicaciones = document.getElementById('filtro_ubicaciones');
        var filtroEstados = document.getElementById('filtro_estados');
        var fechaDesde = document.getElementById('fecha-desde');
        var fechaHasta = document.getElementById('fecha-hasta');
        var filtrarFechasBtn = document.getElementById('filtrar-fechas');

    // Configuración de la tabla
        var hot = new Handsontable(container_listar_MOV, {
            data: data_listar_MOV,
            colHeaders :['AMID', 'ICCID', 'Ubicación', 'Estado', 'Observación', 'Fecha Movimiento'],
            rowHeaders: true,
            filters: true,
            dropdownMenu: true,
            manualColumnResize: true,
            contextMenu: {
                items: {
                    "row_above": {}, // Mantener opción de insertar fila arriba
                    "row_below": {}, // Mantener opción de insertar fila abajo
                    "remove_row": {}, // Mantener opción de eliminar fila
                    "undo": {}, // Mantener opción de deshacer
                    "redo": {}, // Mantener opción de rehacer
                    "make_read_only": {}, // Mantener opción de solo lectura
                    "alignment": {}, // Mantener opción de alineación
                    "filter_by_value": {}, // Mantener opción de filtro por valor
                    "filter_action_bar": {}, // Mantener opción de barra de acciones de filtro
                    "---------": {}, // Separador
                    "copy": {}, // Mantener opción de copiar
                    "cut": {}, // Mantener opción de cortar
                    "hidden_columns_hide": {}, // Mantener opción de ocultar columnas
                    "hidden_columns_show": {}, // Mantener opción de mostrar columnas ocultas
                    // Opciones a eliminar:
                    "col_left": false, // Eliminar opción de agregar columna a la izquierda
                    "col_right": false, // Eliminar opción de agregar columna a la derecha
                    "remove_col": false, // Eliminar opción de eliminar columna
                    "clear_column": false, // Eliminar opción de limpiar columna
                }
            },
            licenseKey: 'non-commercial-and-evaluation',
            cells: function(row, col, prop) {
                var cellProperties = {};
                cellProperties.readOnly = true; // Aquí se establece la celda como solo lectura, si no tuviera esto se podría editar
                return cellProperties;
            }
        });

    // Obtener las opciones únicas para el filtro
        var uniqueObservations = Array.from(new Set(data_listar_MOV.map(row => row[2]))).sort();
        var ubicacionesUnicas = Array.from(new Set(data_listar_MOV.map(row => row[3]))).sort();
        var estadosUnicas = Array.from(new Set(data_listar_val.MOV(row => row[4]))).sort();

    // Agregar las opciones al menú desplegable (Observación y Ubicación)
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


    // Filtrar la tabla cuando se seleccione una opción del menú desplegable
        function applyFilters() {
            var selectedObservation = filterDropdown.value;
            var selectedUbicacion = filtroUbicaciones.value;
            var selectedEstado = filtroEstados.value;
            var fechaDesdeValue = fechaDesde.value ? new Date(fechaDesde.value) : null;
            var fechaHastaValue = fechaHasta.value ? new Date(fechaHasta.value) : null;

            var filteredData = data_listar_val.filter(function(row) {
                var observationMatch = !selectedObservation || row[2] === selectedObservation;
                var ubicacionMatch = !selectedUbicacion || row[3] === selectedUbicacion;
                var estadoMatch = !selectedEstado || row[4] === selectedEstado;

                var fecha = new Date(row[5].split('-').reverse().join('-')); // Convertir a formato YYYY-MM-DD
                
                var dateMatch = true;
                if (fechaDesdeValue) {
                    dateMatch = fecha >= fechaDesdeValue;
                }
                if (fechaHastaValue) {
                    dateMatch = dateMatch && fecha <= fechaHastaValue;
                }

                return observationMatch && ubicacionMatch && estadoMatch && dateMatch;
            });

        // Aquí deberías actualizar la vista con los datos filtrados
            // Por ejemplo, si estás usando Handsontable:
            hot.loadData(filteredData);
        }

        function clearFilters() {
            filterDropdown.value = "";
            filtroUbicaciones.value = "";
            filtroEstados.value = "";

            // Recargar la tabla con todos los datos
                hot.loadData(data_listar_MOV);
        }

        filterDropdown.addEventListener('change', applyFilters);
        filtroUbicaciones.addEventListener('change', applyFilters);
        filtroEstados.addEventListener('change', applyFilters);
        filtrarFechasBtn.addEventListener('click', applyFilters);;

        document.getElementById('clear-filters').addEventListener('click', clearFilters);

    });
// #endregion HTML ListarVAL

