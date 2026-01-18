import { days } from "../definitions/days";

/**
 * Get days for dates
 * @param {int} firstDay - First day (weekday) 
 * @param {number} dayCount - Total days (month length)
 * * @returns {Array<string>}
 */
const calcDayNames = (firstDay, dayCount) => {
    let lastWeekDay = firstDay - 1;
    let namedDays = [];

    for (let index = 1; index <= dayCount; index++) {
        namedDays.push(days[lastWeekDay])
        lastWeekDay++;
        if (lastWeekDay > 6) {
            lastWeekDay = 0
        }
    }

    console.log(namedDays)
    return namedDays
}

export default calcDayNames;