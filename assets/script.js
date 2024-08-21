// #region HTML ListarVAL
    // Este Script es para mostrar los datos de data_listar_val en una tabla de excel, utilizando HANDSONTABLE
        document.addEventListener("DOMContentLoaded", function() {
            
            var data_listar_val = [
                ["280000011071", "7401107", "Barranca", "Terreno", "Operativo", "15-06-2024"],
                ["280000010852", "7401085", "Barranca", "Lab ZP", "Disponible", "03-07-2024"],
                ["280000009559", "7400955", "ZP 1001", "Terreno", "Operativo", "12-08-2024"],
                ["280000011330", "7401133", "ZP 1001", "Lab ZP", "En custodia", "22-06-2024"],
                ["280000013303", "7401330", "ZP 1001", "Terreno", "Operativo", "15-06-2024"],
                ["280000009061", "7400906", "Contingencia ZP Subus", "Lab ZP", "Disponible", "25-07-2024"],
                ["280000009344", "7400934", "Contingencia ZP Subus", "Terreno", "Operativo", "05-08-2024"],
                ["280000008774", "7400877", "Contingencia ZP Vule", "Lab ZP", "En custodia", "03-07-2024"],
                ["280000014898", "7401489", "Contingencia ZP Vule", "Terreno", "Operativo", "15-07-2024"],
                ["280000007173", "7400717", "Contingencia ZP Voy Santiago", "Lab ZP", "Disponible", "01-08-2024"],
                ["280000008743", "7400874", "Contingencia ZP Voy Santiago", "Terreno", "Operativo", "22-06-2024"],
                ["280000012832", "7401283", "Contingencia ZP Metropolitana", "Lab ZP", "En custodia", "15-07-2024"],
                ["280000039761", "7403976", "Contingencia ZP Metropolitana", "Terreno", "Operativo", "25-07-2024"],
                ["280000015208", "7401520", "Contingencia ZP STP", "Lab ZP", "Disponible", "12-08-2024"],
                ["280000012771", "7401277", "Contingencia ZP STP", "Terreno", "Operativo", "03-07-2024"],
                ["280000012016", "7401201", "Contingencia ZP 1008", "Lab ZP", "En custodia", "15-06-2024"],
                ["280000039808", "7403980", "Contingencia ZP 1008", "Terreno", "Operativo", "01-08-2024"],
                ["280000012719", "7401271", "Contingencia ZP 1009", "Lab ZP", "Disponible", "22-06-2024"],
                ["280000010807", "7401080", "Contingencia ZP 1009", "Terreno", "Operativo", "12-08-2024"],
                ["280000008835", "7400883", "Contingencia ZP 1010", "Lab ZP", "En custodia", "25-07-2024"],
                ["280000007371", "7400737", "Contingencia ZP 1010", "Terreno", "Operativo", "03-07-2024"],
                ["280000012382", "7401238", "Contingencia ZP 1011", "Lab ZP", "Disponible", "15-07-2024"],
                ["280000011750", "7401175", "Contingencia ZP 1011", "Terreno", "Operativo", "05-08-2024"],
                ["280000006282", "7400628", "Contingencia ZP 1012", "Lab ZP", "En custodia", "03-07-2024"],
                ["280000010890", "7401089", "Contingencia ZP 1012", "Terreno", "Operativo", "15-06-2024"],
                ["280000012580", "7401258", "Contingencia ZP 1013", "Lab ZP", "Disponible", "25-07-2024"],
                ["280000012283", "7401228", "Contingencia ZP 1013", "Terreno", "Operativo", "12-08-2024"],
                ["280000042556", "7404255", "ZP Fija 119", "Lab ZP", "En custodia", "15-07-2024"]

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
                colHeaders: ['SERIE', 'AMID', 'Observación', 'Ubicación', 'Estado', 'Fecha Movimiento'],
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


// #region HTML AgregarVAL

    /*Este script es para utilizand HANDSONTABLE y tener una tabla de excel para ingresar los datos. 
    Me gustaría utilizarla a futuro para listar SIM's y Val's*/
    //Es solo para agregar datos, no tiene valores a diferencia de la función de ListarVal
        document.addEventListener("DOMContentLoaded", function() {
            var container = document.getElementById('handsontable-container');
            var hot = new Handsontable(container, {
                data: [],
                rowHeaders: true,
                colHeaders: ['Serie', 'AMID'],
                columns: [
                    {data: 'serie', type: 'text'},
                    {data: 'amid', type: 'text'}
                ],
                colWidths: [300, 150],
                minSpareRows: 1,
                licenseKey: 'non-commercial-and-evaluation', // clave de licencia de evaluación
                filters: true,
                dropdownMenu: true
            });

            // Configuración del botón "Enviar Datos"
                document.getElementById('submit-button').addEventListener('click', function() {
                    var data = hot.getData();
                    // Aquí puedes enviar los datos al servidor, por ejemplo, usando fetch:
                    fetch('/your-backend-endpoint', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    }).then(response => {
                        if (response.ok) {
                            alert('Datos enviados exitosamente');
                        } else {
                            alert('Error al enviar datos');
                        }
                    }).catch(error => {
                        console.error('Error:', error);
                    });
                });

            // Configuración del botón "Limpiar"
                document.getElementById('clear-button').addEventListener('click', function() {
                    hot.loadData([]);  // Limpia los datos de la tabla
                });
        });
// #endregion HTML AgregarVAL




// #region HTML ListarSIM
    // Este Script es para mostrar los datos de data_listar_val en una tabla de excel, utilizando HANDSONTABLE
    document.addEventListener("DOMContentLoaded", function() {
            
        var data_listar_sim = [
            ["8956030163614000276", "56987787546", "10.228.56.1", "10.232.56.1", "PRESTAMO DESARROLLO Y TESTING", "En uso", "02-08-2024"],
            ["8956030163614000300", "56950013855", "10.228.56.2", "10.232.56.2", "PRESTAMO DESARROLLO Y TESTING", "En uso", "02-08-2024"],
            ["8956030163614000219", "56987789221", "10.228.56.3", "10.232.56.3", "01 LAB-ZP TERRENO", "Disponible", "02-08-2024"],
            ["8956030163614000243", "56987796828", "10.228.56.4", "10.232.56.4", "PRESTAMO DESARROLLO Y TESTING", "En uso", "02-08-2024"],
            ["8956030163614000292", "56987824539", "10.228.56.5", "10.232.56.5", "01 LAB-ZP TERRENO", "Disponible", "02-08-2024"],
            ["8956030163614000235", "56987884441", "10.228.56.6", "10.232.56.6", "01 LAB-ZP TERRENO", "Disponible", "02-08-2024"],
            ["8956030163614000250", "56986287970", "10.228.56.7", "10.232.56.7", "PRESTAMO DESARROLLO Y TESTING", "En uso", "02-08-2024"],
            ["8956030163614000375", "56987943173", "10.228.56.8", "10.232.56.8", "PRESTAMO DESARROLLO Y TESTING", "En uso", "01-07-2024"],
            ["8956030163614000367", "56987904021", "10.228.56.9", "10.232.56.9", "PRESTAMO DESARROLLO Y TESTING", "En uso", "02-08-2024"],
            ["8956030163614000284", "56987968926", "10.228.56.10", "10.232.56.10", "PRESTAMO DESARROLLO Y TESTING", "En uso", "02-08-2024"],
            ["8956030163614307531", "56987169554", "10.228.56.11", "10.232.56.11", "PERDIDO POD", "Robado", "01-02-2020"]
        ];
        
        


    // Contenedor en el que pondremos una tabla, cuando queramos ponerlo en el HTML tendremos que usar un div con ese id
        // Ejemplo: <div id="container_listar_val"></div>
        var container_listar_sim = document.getElementById('container_listar_val');

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
            colHeaders: ['SERIE', 'AMID', 'Observación', 'Ubicación', 'Estado', 'Fecha Movimiento'],
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

// #region HTML EditarSIM
/*Estos son los Scripts de el HTML EditarSIM*/
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

/*Con esta función estoy utilizando un editor WYSIWYG, Es de TinyMCE */
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
        selector: 'textarea',  
        plugins: 'advlist autolink lists link image charmap preview anchor textcolor',
        toolbar: 'undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help'
    });

// #endregion HTML EditarSIM
