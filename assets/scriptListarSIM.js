// #region HTML ListarVAL
    // Este Script es para mostrar los datos de data_listar_val en una tabla de excel, utilizando HANDSONTABLE
    document.addEventListener("DOMContentLoaded", function() {
            
        var data_listar_val = [
            ["8956030163614000276", "56987787546", "10.228.56.1", "10.232.56.1", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "02-08-2024"],
            ["8956030163614000300", "56950013855", "10.228.56.2", "10.232.56.2", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "02-08-2024"],
            ["8956030163614000219", "56987789221", "10.228.56.3", "10.232.56.3", "LAB ZP", "Disponible", "01 LAB-ZP TERRENO", "02-08-2024"],
            ["8956030163614000243", "56987796828", "10.228.56.4", "10.232.56.4", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "02-08-2024"],
            ["8956030163614000292", "56987824539", "10.228.56.5", "10.232.56.5", "LAB ZP", "Disponible", "01 LAB-ZP TERRENO", "02-08-2024"],
            ["8956030163614000235", "56987884441", "10.228.56.6", "10.232.56.6", "LAB ZP", "Disponible", "01 LAB-ZP TERRENO", "02-08-2024"],
            ["8956030163614000250", "56986287970", "10.228.56.7", "10.232.56.7", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "02-08-2024"],
            ["8956030163614000375", "56987943173", "10.228.56.8", "10.232.56.8", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "01-07-2024"],
            ["8956030163614000367", "56987904021", "10.228.56.9", "10.232.56.9", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "02-08-2024"],
            ["8956030163614000284", "56987968926", "10.228.56.10", "10.232.56.10", "SONDA", "En uso", "PRESTAMO DESARROLLO Y TESTING", "02-08-2024"],
            ["8956030163614307531", "56987169554", "10.228.56.11", "10.232.56.11", "DESCONOCIDO", "Robado", "PERDIDO POD", "01-02-2020"]
        ];
        

        


    // Contenedor en el que pondremos una tabla, cuando queramos ponerlo en el HTML tendremos que usar un div con ese id
        // Ejemplo: <div id="container_listar_val"></div>
        var container_listar_val = document.getElementById('container_listar_val');

    // Filtros disponibles
        var filterDropdown = document.getElementById('filter-dropdown');
        var filtroUbicaciones = document.getElementById('filtro_ubicaciones');
        var filtroEstados = document.getElementById('filtro_estados');
        var fechaDesde = document.getElementById('fecha-desde');
        var fechaHasta = document.getElementById('fecha-hasta');
        var filtrarFechasBtn = document.getElementById('filtrar-fechas');

    // Configuración de la tabla
        var hot = new Handsontable(container_listar_val, {
            data: data_listar_val,
            colHeaders : ['SIM', 'MSISDN', 'Nodo Concert IP', 'Nodo Condor IP', 'Ubicación', 'Estado', 'Observación', 'Asignado Desde'],
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
        var uniqueObservations = Array.from(new Set(data_listar_val.map(row => row[2]))).sort();
        var ubicacionesUnicas = Array.from(new Set(data_listar_val.map(row => row[3]))).sort();
        var estadosUnicas = Array.from(new Set(data_listar_val.map(row => row[4]))).sort();

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
                hot.loadData(data_listar_val);
        }

        filterDropdown.addEventListener('change', applyFilters);
        filtroUbicaciones.addEventListener('change', applyFilters);
        filtroEstados.addEventListener('change', applyFilters);
        filtrarFechasBtn.addEventListener('click', applyFilters);;

        document.getElementById('clear-filters').addEventListener('click', clearFilters);

    });
// #endregion HTML ListarVAL

