/**
 * Get a color for a specific category
 * @param {string} category 
 */
const getCategoryColor = (category) => {
    switch (category) {
        case "Technology & Software":
            return "green"
    
        case "Design & UX/UI":
            return "pink"

        default:
            return "red"
    }
}

export default getCategoryColor