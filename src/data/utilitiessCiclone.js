export function nomCiclon(valor) {
  let desc = {};
  desc["Tropical Storm"] = "Tormenta Tropical";
  desc["Tropical Depression"] = "Depresión Tropical";
  desc["Subtropical Storm"] = "Tormenta Subtropical";
  desc["Subtropical Depression"] = "Depresión Subtropical";
  desc["Major Hurricane"] = "Huracán";
  desc["Post-tropical Cyclone Remnants Of"] = "Remanente";
  desc["Hurricane"] = "Huracán";

  for (const [key, value] of Object.entries(desc)) {
    if (valor.includes(key)) {
      valor = valor.replace(key, value);
    }
  }

  let desc_number = {};

  desc_number["ELEVEN"] = "ONCE";
  desc_number["TWELVE"] = "DOCE";
  desc_number["THIRTEEN"] = "TRECE";
  desc_number["FIFTEEN"] = "QUINCE";
  desc_number["SIXTEEN"] = "DIECISÉIS";
  desc_number["SEVENTEEN"] = "DIECISIETE";
  desc_number["EIGHTEEN"] = "DIECIOCHO";
  desc_number["NINETEEN"] = "DIECINUEVE";
  desc_number["TWENTY-ONE"] = "VEINTIUNO";
  desc_number["TWENTY-TWO"] = "VEINTIDÓS";
  desc_number["TWENTY-THREE"] = "VEINTITRÉS";
  desc_number["TWENTY-FOUR"] = "VEINTICUATRO";
  desc_number["TWENTY-FIVE"] = "VEINTICINCO";
  desc_number["TWENTY-SIX"] = "VEINTISÉIS";
  desc_number["TWENTY-SEVEN"] = "VEINTISIETE";
  desc_number["TWENTY-EIGHT"] = "VEINTIOCHO";
  desc_number["TWENTY-NINE"] = "VEINTINUEVE";
  desc_number["THIRTY"] = "TREINTA";
  desc_number["ONE"] = "UNO";
  desc_number["TWO"] = "DOS";
  desc_number["THREE"] = "TRES";
  desc_number["FOURTEEN"] = "CATORCE";
  desc_number["FOUR"] = "CUATRO";
  desc_number["FIVE"] = "CINCO";
  desc_number["SIX"] = "SEIS";
  desc_number["SEVEN"] = "SIETE";
  desc_number["EIGHT"] = "OCHO";
  desc_number["NINE"] = "NUEVE";
  desc_number["TEN"] = "DIEZ";
  desc_number["TWENTY"] = "VEINTE";

  for (const [key, value] of Object.entries(desc_number)) {
    if (valor.includes(key)) {
      valor = valor.replace(key, value);
    }
  }
  return valor;
}

export function convertirFechaUTCaLocal(fechaUTC) {
  // Convertir la fecha UTC a un objeto Date
  const fecha = new Date(fechaUTC);

  // Definir la zona horaria de CDMX
  const opciones = {
    timeZone: "America/Mexico_City",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "numeric",
    month: "long",
  };

  // Obtener la fecha y hora en CDMX
  const fechaLocal = fecha.toLocaleString("es-MX", opciones);
  return fechaLocal;
}

export const nombreCuenca = (id) => {
  const cuenca = {
    al: "atlantico",
    cp: "pacífico centro",
    ep: "pacífico este",
  };

  return cuenca[id] || "cuenca no encontrada";
};

export function stormType(id, ssnum) {
  const storm = {
    HU: "Huracán",
    MH: "Huracán Mayor",
    PTC: "Remanentes",
    STD: "Depresión Tropical",
    STS: "Tormenta Tropical",
    TD: "Depresión Tropical",
    TS: "Tormenta Tropical",
  };

  let typestorm = storm[id] || "Sin Dato";

  if (id === "MU" || id === "HU") {
    typestorm += " categoría " + ssnum;
  }

  return typestorm;
}

export function knotTokph(value) {
  return value + " Kt (" + Math.round(value * 1.852, 0) + " km/h)";
}
