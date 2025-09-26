// ==== DATA.JS ====
// Aquí guardamos la base de datos en memoria (puede crecer después)

// 🚛 Choferes (ejemplo con 3 para probar; después añadimos más)
const choferesData = {
  "201": { nombre: "Luis F. Lezcano", cedula: "5331573", matricula: "HEP840" },
  "202": { nombre: "Lorenzo Mosqueira", cedula: "582957", matricula: "BPT454" },
  "203": { nombre: "Jorge Cáceres", cedula: "2076575", matricula: "KBC180" }
};

// 🌾 Materia Prima (matrícula -> datos)
const mpData = {
  "HEP840": { empresa: "AgroPar", chofer: "Luis F. Lezcano", producto: "Soja" },
  "BPT454": { empresa: "Campo Sur", chofer: "Lorenzo Mosqueira", producto: "Maíz" },
  "KBC180": { empresa: "Agro Norte", chofer: "Jorge Cáceres", producto: "Trigo" }
};

// 👮 Guardias (Saturno -> nombre)
const guardiasData = {
  "20628": "ISIDRO ORTIZ",
  "20629": "JUAN PÉREZ",
  "20630": "MARTA GÓMEZ"
};
