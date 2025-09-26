// ==== APP.JS ====
// Aquí está toda la lógica de la aplicación

/* ===== LOGIN ===== */
const USERS = {
  "admin": { pass: "1234", role: "admin", nombre: "Administrador" },
  "guardia": { pass: "0000", role: "guardia", nombre: "Guardia" }
};

function doLogin() {
  const u = document.getElementById("loginUser").value.trim().toLowerCase();
  const p = document.getElementById("loginPass").value.trim();

  if (!USERS[u] || USERS[u].pass !== p) {
    alert("Usuario o contraseña incorrectos.");
    return;
  }

  localStorage.setItem("rol", USERS[u].role);
  localStorage.setItem("user", USERS[u].nombre);
  bootApp(u);
}

function logout() {
  localStorage.clear();
  location.reload();
}

function bootApp(key) {
  const rol = localStorage.getItem("rol");
  const nom = localStorage.getItem("user");

  document.getElementById("hdrUser").textContent = `${nom} (${key})`;
  document.getElementById("hdrRol").textContent = rol;
  document.getElementById("loginView").style.display = "none";
  document.getElementById("appView").style.display = "block";

  // Mostrar Configuración solo a admin
  if (rol === "admin") {
    let btn = document.createElement("button");
    btn.className = "tabbtn";
    btn.dataset.target = "config";
    btn.textContent = "⚙️ Configuración";
    document.getElementById("tabs").appendChild(btn);
  }
}

/* ===== NAV ===== */
document.getElementById("tabs").addEventListener("click", e => {
  const b = e.target.closest(".tabbtn");
  if (!b) return;
  document.querySelectorAll(".tabbtn").forEach(x => x.classList.remove("active"));
  document.querySelectorAll(".section").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  document.getElementById(b.dataset.target).classList.add("active");
});

/* ===== UTILIDADES ===== */
function horaActual() {
  const d = new Date();
  return d.toLocaleTimeString();
}

function validar7dig(i, msg) {
  if (!/^\d{7}$/.test(i.value)) {
    alert(msg + " debe tener 7 dígitos");
    return false;
  }
  return true;
}

function autoGuardia(satId, nombreId) {
  const code = document.getElementById(satId).value.trim();
  document.getElementById(nombreId).value = guardiasData[code] || "";
}

/* ===== INGRESO LD ===== */
document.getElementById("movilIngreso").addEventListener("input", e => {
  const d = choferesData[e.target.value.trim()];
  document.getElementById("choferIngreso").value = d ? d.nombre : "";
  document.getElementById("cedulaIngreso").value = d ? d.cedula : "";
  document.getElementById("matriculaIngreso").value = d ? d.matricula : "";
});

function guardarIngreso() {
  const tbody = document.querySelector("#tablaIngreso tbody");
  const r = tbody.insertRow();

  r.insertCell().textContent = document.getElementById("movilIngreso").value;
  r.insertCell().textContent = document.getElementById("choferIngreso").value;
  r.insertCell().textContent = document.getElementById("cedulaIngreso").value;
  r.insertCell().textContent = document.getElementById("matriculaIngreso").value;
  r.insertCell().textContent = document.getElementById("destinoIngreso").value;
  r.insertCell().textContent = document.getElementById("estadoIngreso").value;
  r.insertCell().textContent = horaActual();

  document.getElementById("formIngreso").reset();
}
/* ===== AUDITORÍA LD ===== */
document.getElementById("movilAud").addEventListener("input", e => {
  const d = choferesData[e.target.value.trim()];
  document.getElementById("choferAud").value = d ? d.nombre : "";
  document.getElementById("cedulaAud").value = d ? d.cedula : "";
  document.getElementById("matriculaAud").value = d ? d.matricula : "";
});

function guardarAuditoria() {
  if (!validar7dig(document.getElementById("idCargaAud"), "ID Carga")) return;

  const tbody = document.querySelector("#tablaAuditoria tbody");
  const r = tbody.insertRow();

  r.insertCell().textContent = document.getElementById("movilAud").value;
  r.insertCell().textContent = document.getElementById("choferAud").value;
  r.insertCell().textContent = document.getElementById("cedulaAud").value;
  r.insertCell().textContent = document.getElementById("matriculaAud").value;
  r.insertCell().textContent = document.getElementById("idCargaAud").value;
  r.insertCell().textContent = document.getElementById("destinoAud").value;
  r.insertCell().textContent = document.getElementById("tipoCargaAud").value;
  r.insertCell().textContent = document.getElementById("satAud").value;
  r.insertCell().textContent = document.getElementById("guardiaAud").value;
  r.insertCell().textContent = document.getElementById("horaAud").value;
  r.insertCell().textContent = document.getElementById("tipoAud").value;
  r.insertCell().textContent = document.getElementById("obsAud").value;

  document.getElementById("formAuditoria").reset();
}

/* ===== MATERIA PRIMA ===== */
document.getElementById("matMP").addEventListener("input", e => {
  const d = mpData[e.target.value.trim()];
  document.getElementById("empresaMP").value = d ? d.empresa : "";
  document.getElementById("choferMP").value = d ? d.chofer : "";
  document.getElementById("productoMP").value = d ? d.producto : "";
});

function guardarMateria() {
  const tbody = document.querySelector("#tablaMateria tbody");
  const r = tbody.insertRow();

  r.insertCell().textContent = document.getElementById("matMP").value;
  r.insertCell().textContent = document.getElementById("empresaMP").value;
  r.insertCell().textContent = document.getElementById("choferMP").value;
  r.insertCell().textContent = document.getElementById("productoMP").value;
  r.insertCell().textContent = document.getElementById("cantMP").value;
  r.insertCell().textContent = document.getElementById("satMP").value;
  r.insertCell().textContent = document.getElementById("guardiaMP").value;
  r.insertCell().textContent = horaActual();

  // Hora salida editable + botón
  const salidaCell = r.insertCell();
  salidaCell.textContent = "";
  const accionCell = r.insertCell();
  const btn = document.createElement("button");
  btn.textContent = "Registrar salida";
  btn.onclick = () => {
    salidaCell.textContent = horaActual();
    btn.disabled = true;
  };
  accionCell.appendChild(btn);

  document.getElementById("formMateria").reset();
}
/* ===== AUDITORÍA PREVENTA ===== */
function guardarPreventa() {
  if (!validar7dig(document.getElementById("idCargoPrev"), "ID Cargo")) return;

  const tbody = document.querySelector("#tablaPreventa tbody");
  const r = tbody.insertRow();

  const hora = document.getElementById("horaPrev").value;
  const carga = document.getElementById("cargaPrev").value;
  const idCargo = document.getElementById("idCargoPrev").value;
  const pots = document.getElementById("potsPrev").value;
  const turno = document.getElementById("turnoPrev").value;
  const sat = document.getElementById("satPrev").value;
  const guardia = document.getElementById("guardiaPrev").value;
  const tipo = document.getElementById("tipoPrev").value;
  const obs = document.getElementById("obsPrev").value;

  r.insertCell().textContent = hora;
  r.insertCell().textContent = carga;
  r.insertCell().textContent = idCargo;
  r.insertCell().textContent = pots;
  r.insertCell().textContent = turno;
  r.insertCell().textContent = sat;
  r.insertCell().textContent = guardia;
  r.insertCell().textContent = tipo;
  r.insertCell().textContent = obs;

  document.getElementById("formPreventa").reset();

  // 👇 Nuevo: actualizar estados de programación
  let prog = window.programaciones.find(p => p.carga === carga);
  if (prog) {
    prog.auditada = true;
    prog.horaAuditoria = hora;
    prog.guardiaAuditor = guardia;
    prog.idCargo = idCargo;
  }
  actualizarEstadosProgramacion();
}

/* ===== LIBERACIÓN PREVENTA ===== */
function buscarLiberacion() {
  const valor = document.getElementById("buscarLib").value.trim();
  if (!valor) {
    alert("Ingrese un número de carga o ID Cargo");
    return;
  }

  const rows = document.querySelectorAll("#tablaPreventa tbody tr");
  let encontrado = null;
  rows.forEach(r => {
    const carga = r.cells[1].textContent;
    const idCargo = r.cells[2].textContent;
    if (carga === valor || idCargo === valor) {
      encontrado = {
        carga,
        idCargo,
        hora: r.cells[0].textContent,
        guardia: r.cells[6].textContent
      };
    }
  });

  if (!encontrado) {
    document.getElementById("resultadoLiberacion").innerHTML =
      `<p style="color:red;">❌ La carga/ID ${valor} no está auditada.</p>`;
    document.getElementById("saturnoLiberacion").style.display = "none";
    return;
  }

  if (window.liberados && window.liberados.includes(encontrado.carga)) {
    document.getElementById("resultadoLiberacion").innerHTML =
      `<p style="color:green;">✅ La carga ${encontrado.carga} ya fue liberada.</p>`;
    document.getElementById("saturnoLiberacion").style.display = "none";
    return;
  }

  cargaPendienteLiberar = encontrado.carga;
  idCargoPendienteLiberar = encontrado.idCargo;

  document.getElementById("resultadoLiberacion").innerHTML = `
    <p>✔️ Auditada: ${encontrado.carga} (ID: ${encontrado.idCargo})<br>
    Guardia Auditor: ${encontrado.guardia}<br>
    Hora Auditoría: ${encontrado.hora}</p>
  `;
  document.getElementById("saturnoLiberacion").style.display = "block";
}

function confirmarLiberacion() {
  const sat = document.getElementById("saturnoInput").value.trim();
  if (!sat) {
    alert("Ingrese el Saturno del guardia.");
    return;
  }

  // Buscar guardia en guardiasData (objeto con Saturno -> nombre)
  const guardiaNombre = guardiasData[sat];
  if (!guardiaNombre) {
    alert("Saturno no válido.");
    return;
  }

  // Registrar liberación en tabla
  const tbody = document.querySelector("#tablaLiberacion tbody");
  const r = tbody.insertRow();
  const now = new Date().toLocaleTimeString();
  r.insertCell().textContent = now;
  r.insertCell().textContent = cargaPendienteLiberar;
  r.insertCell().textContent = idCargoPendienteLiberar;
  r.insertCell().textContent = guardiaNombre;

  // Guardar en memoria
  if (!window.liberados) window.liberados = [];
  window.liberados.push(cargaPendienteLiberar);

  // Confirmación visual
  document.getElementById("resultadoLiberacion").innerHTML =
    `<p style="color:green;">✅ La carga ${cargaPendienteLiberar} fue liberada por ${guardiaNombre} (${sat})</p>`;
  document.getElementById("saturnoLiberacion").style.display = "none";

  // 👇 Nuevo: actualizar en programación
  let prog = window.programaciones.find(p => p.carga === cargaPendienteLiberar);
  if (prog) {
    prog.horaLiberacion = now;
    prog.guardiaLiberador = guardiaNombre;
  }

  // Actualizar estados en programación
  actualizarEstadosProgramacion();
}

/* ===== CONFIGURACIÓN DETALLADA ===== */
function abrirConfig(seccion) {
  let html = "";

  // ---- CHOFERES ----
  if (seccion === "choferes") {
    html = `
      <h4>🚛 Choferes</h4>
      <form onsubmit="agregarChofer(event)">
        <input type="text" id="newMovil" placeholder="N° Móvil" required />
        <input type="text" id="newNombre" placeholder="Nombre Chofer" required />
        <input type="text" id="newCedula" placeholder="Cédula" required />
        <input type="text" id="newMatricula" placeholder="Matrícula" required />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead><tr><th>Movil</th><th>Nombre</th><th>Cédula</th><th>Matrícula</th><th>Acción</th></tr></thead>
        <tbody id="tablaChoferes"></tbody>
      </table>
    `;
    setTimeout(listarChoferes, 50);
  }

  // ---- GUARDIAS ----
  if (seccion === "guardias") {
    html = `
      <h4>👮 Guardias</h4>
      <form onsubmit="agregarGuardia(event)">
        <input type="text" id="newSat" placeholder="Saturno" required />
        <input type="text" id="newGuardia" placeholder="Nombre Guardia" required />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead><tr><th>Saturno</th><th>Nombre</th><th>Acción</th></tr></thead>
        <tbody id="tablaGuardias"></tbody>
      </table>
    `;
    setTimeout(listarGuardias, 50);
  }

  // ---- MATERIA PRIMA ----
  if (seccion === "materia") {
    html = `
      <h4>🌾 Materia Prima</h4>
      <form onsubmit="agregarMP(event)">
        <input type="text" id="newMatMP" placeholder="Matrícula" required />
        <input type="text" id="newEmpresaMP" placeholder="Empresa" required />
        <input type="text" id="newChoferMP" placeholder="Chofer" required />
        <input type="text" id="newProdMP" placeholder="Producto" required />
        <button type="submit">Agregar</button>
      </form>
      <table>
        <thead><tr><th>Matrícula</th><th>Empresa</th><th>Chofer</th><th>Producto</th><th>Acción</th></tr></thead>
        <tbody id="tablaMP"></tbody>
      </table>
    `;
    setTimeout(listarMP, 50);
  }

  // ---- INFORMES ----
  if (seccion === "informes") {
    html = `
      <h4>📊 Informes</h4>
      <button onclick="exportarTabla('tablaIngreso','Informe_IngresoLD')">Ingreso LD</button>
      <button onclick="exportarTabla('tablaAuditoria','Informe_AuditoriaLD')">Auditoría LD</button>
      <button onclick="exportarTabla('tablaMateria','Informe_MateriaPrima')">Materia Prima</button>
      <button onclick="exportarTabla('tablaPreventa','Informe_AuditoriaPreventa')">Auditoría Preventa</button>
    `;
  }

  // ---- HISTORIALES ----
  if (seccion === "historiales") {
    html = `
      <h4>📅 Historiales</h4>
      <label>Tipo de informe:</label>
      <select id="tipoHist">
        <option value="tablaIngreso">Ingreso LD</option>
        <option value="tablaAuditoria">Auditoría LD</option>
        <option value="tablaMateria">Materia Prima</option>
        <option value="tablaPreventa">Auditoría Preventa</option>
      </select>
      <br><label>Fecha:</label>
      <input type="date" id="fechaHist" />
      <button onclick="mostrarHistorial()">Buscar</button>
      <div id="resultadoHistorial"></div>
    `;
  }

  // Render final
  document.getElementById("configContent").innerHTML = html;
}

/* ===== FUNCIONES DE CRUD ===== */
function agregarChofer(e) {
  e.preventDefault();
  const movil = document.getElementById("newMovil").value.trim();
  choferesData[movil] = {
    nombre: document.getElementById("newNombre").value.trim(),
    cedula: document.getElementById("newCedula").value.trim(),
    matricula: document.getElementById("newMatricula").value.trim()
  };
  listarChoferes();
  e.target.reset();
}

function listarChoferes() {
  const tbody = document.getElementById("tablaChoferes");
  tbody.innerHTML = "";
  for (let m in choferesData) {
    const c = choferesData[m];
    const r = tbody.insertRow();
    r.insertCell().textContent = m;
    r.insertCell().textContent = c.nombre;
    r.insertCell().textContent = c.cedula;
    r.insertCell().textContent = c.matricula;
    const del = r.insertCell();
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => { delete choferesData[m]; listarChoferes(); };
    del.appendChild(btn);
  }
}

function agregarGuardia(e) {
  e.preventDefault();
  const sat = document.getElementById("newSat").value.trim();
  guardiasData[sat] = document.getElementById("newGuardia").value.trim();
  listarGuardias();
  e.target.reset();
}

function listarGuardias() {
  const tbody = document.getElementById("tablaGuardias");
  tbody.innerHTML = "";
  for (let s in guardiasData) {
    const r = tbody.insertRow();
    r.insertCell().textContent = s;
    r.insertCell().textContent = guardiasData[s];
    const del = r.insertCell();
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => { delete guardiasData[s]; listarGuardias(); };
    del.appendChild(btn);
  }
}

function agregarMP(e) {
  e.preventDefault();
  const mat = document.getElementById("newMatMP").value.trim();
  mpData[mat] = {
    empresa: document.getElementById("newEmpresaMP").value.trim(),
    chofer: document.getElementById("newChoferMP").value.trim(),
    producto: document.getElementById("newProdMP").value.trim()
  };
  listarMP();
  e.target.reset();
}

function listarMP() {
  const tbody = document.getElementById("tablaMP");
  tbody.innerHTML = "";
  for (let m in mpData) {
    const d = mpData[m];
    const r = tbody.insertRow();
    r.insertCell().textContent = m;
    r.insertCell().textContent = d.empresa;
    r.insertCell().textContent = d.chofer;
    r.insertCell().textContent = d.producto;
    const del = r.insertCell();
    const btn = document.createElement("button");
    btn.textContent = "Eliminar";
    btn.onclick = () => { delete mpData[m]; listarMP(); };
    del.appendChild(btn);
  }
}
/* ===== EXPORTAR A EXCEL ===== */
function exportarTabla(tablaId, nombreArchivo) {
  const tabla = document.getElementById(tablaId);
  if (!tabla) {
    alert("No se encontró la tabla.");
    return;
  }

  // Convertir tabla HTML a hoja de Excel
  const wb = XLSX.utils.table_to_book(tabla, { sheet: "Hoja1" });

  // Descargar archivo
  XLSX.writeFile(wb, nombreArchivo + ".xlsx");
}
/* ===== HISTORIALES ===== */
function mostrarHistorial() {
  const tipo = document.getElementById("tipoHist").value;
  const fecha = document.getElementById("fechaHist").value;
  if (!fecha) {
    alert("Seleccione una fecha.");
    return;
  }

  // Buscar tabla original
  const tabla = document.getElementById(tipo);
  if (!tabla) return;

  // Crear nueva tabla filtrada
  let html = `<h5>Resultados del ${fecha}</h5>`;
  html += `<table border="1"><thead>${tabla.tHead.innerHTML}</thead><tbody>`;

  const rows = tabla.tBodies[0].rows;
  let encontrados = 0;
  for (let r of rows) {
    const cells = Array.from(r.cells).map(td => td.textContent);
    // Buscar fecha en alguna columna (última, donde suele estar hora o fecha completa)
    if (cells.join(" ").includes(fecha)) {
      html += `<tr>${cells.map(c => `<td>${c}</td>`).join("")}</tr>`;
      encontrados++;
    }
  }
  html += "</tbody></table>";

  if (encontrados === 0) {
    html = `❌ No se encontraron registros para ${fecha}.`;
  } else {
    html += `<br><button onclick="exportarHistorial('${tipo}','Historial_${tipo}_${fecha}')">Exportar a Excel</button>`;
  }

  document.getElementById("resultadoHistorial").innerHTML = html;
}

function exportarHistorial(tablaId, nombreArchivo) {
  const tabla = document.querySelector("#resultadoHistorial table");
  if (!tabla) return;
  const wb = XLSX.utils.table_to_book(tabla, { sheet: "Historial" });
  XLSX.writeFile(wb, nombreArchivo + ".xlsx");
}
/* ===== PROGRAMACIÓN PREVENTA ===== */
function guardarProgramacion() {
  const fecha = document.getElementById("fechaProg").value;
  const total = document.getElementById("totalProg").value;
  const cargas = document.getElementById("cargasProg").value;

  if (!fecha || !total || !cargas) {
    alert("Complete todos los campos");
    return;
  }

  if (!window.programaciones) window.programaciones = [];

  const tbody = document.querySelector("#tablaProg tbody");

  cargas.split(",").map(c => c.trim()).forEach(carga => {
    const prog = {
      fecha,
      carga,
      idCargo: null,
      horaAuditoria: null,
      guardiaAuditor: null,
      auditada: false,
      horaLiberacion: null,
      guardiaLiberador: null
    };
    window.programaciones.push(prog);
  });

  document.getElementById("formProg").reset();
  actualizarEstadosProgramacion();
}

function actualizarEstadosProgramacion() {
  const tbody = document.querySelector("#tablaProg tbody");
  if (!tbody) return;

  tbody.innerHTML = "";

  (window.programaciones || []).forEach(prog => {
    const r = tbody.insertRow();
    r.insertCell().textContent = prog.fecha;
    r.insertCell().textContent = prog.carga;
    r.insertCell().textContent = prog.idCargo || "-";
    r.insertCell().textContent = prog.horaAuditoria || "-";
    r.insertCell().textContent = prog.guardiaAuditor || "-";
    r.insertCell().textContent = prog.auditada ? "Auditada" : "Pendiente";
    r.insertCell().textContent = prog.horaLiberacion || "-";
    r.insertCell().textContent = prog.guardiaLiberador || "-";
  });
}