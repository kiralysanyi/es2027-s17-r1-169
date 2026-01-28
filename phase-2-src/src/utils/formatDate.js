import formatKlok from "./formatKlok";

/**
 * Format date to: YYYY-MM-DD HH:MM
 * @param {Date} date 
 */
const formatDate = (date) => {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${formatKlok(date.getHours())}:${formatKlok(date.getMinutes())}`
}

export default formatDate;