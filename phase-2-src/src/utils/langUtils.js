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