/**
 * Return a flag for a language, the flags won't display on windows btw
 * @param {string} language 
 * @returns 
 */
const getFlagForLang = (language) => {
    switch (language) {
        case "Hungarian":
            return "🇭🇺"
        
        case "English":
            return "🇺🇸"

        case "Chinese":
            return "🇨🇳"
    
        default:
            return "🚩"
    }
}


export { getFlagForLang }