/**
 * Format clock values for example you have 9 minutes, this will format it to 09
 * @param {*} val 
 */
const formatKlok = (val) => {
    return val < 10 ? "0" + val : val;
}

export default formatKlok