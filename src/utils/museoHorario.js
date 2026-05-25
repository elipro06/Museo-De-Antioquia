// utils/museoHorario.js
// Utilidad para obtener el horario dinámico del Museo de Antioquia

// Importación compatible con CommonJS para React/ESM
let getColombiaHolidaysByYear;
try {
  // eslint-disable-next-line global-require
  getColombiaHolidaysByYear = require('colombia-holidays').getColombiaHolidaysByYear;
} catch (e) {
  // fallback para entornos donde require no está disponible
  getColombiaHolidaysByYear = null;
}

// Formato de horas
const OPEN_HOUR = '10:00 a.m.';
const CLOSE_HOUR_WEEKDAY = '5:30 p.m.';
const CLOSE_HOUR_WEEKEND = '4:30 p.m.';

/**
 * Retorna true si la fecha es festivo en Colombia
 * @param {Date} date
 * @returns {Promise<boolean>}
 */
export async function isColombianHoliday(date) {
  if (!getColombiaHolidaysByYear) return false;
  const holidays = getColombiaHolidaysByYear(date.getFullYear());
  const dateStr = date.toISOString().slice(0, 10);
  return holidays.some(h => h.holiday === dateStr);
}

/**
 * Retorna el horario de apertura y cierre para la fecha dada
 * @param {Date} date
 * @returns {Promise<{open: string, close: string}>}
 */
export async function getMuseoHorario(date = new Date()) {
  const day = date.getDay(); // 0=Domingo, 6=Sábado
  const isWeekend = day === 0 || day === 6;
  const festivo = await isColombianHoliday(date);
  return {
    open: OPEN_HOUR,
    close: (isWeekend || festivo) ? CLOSE_HOUR_WEEKEND : CLOSE_HOUR_WEEKDAY,
  };
}
