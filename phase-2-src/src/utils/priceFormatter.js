/**
 * Format price for better readability
 * @param {number} price 
 */
const priceFormatter = (price) => {
    return price.toLocaleString("en-US")
}

export default priceFormatter;