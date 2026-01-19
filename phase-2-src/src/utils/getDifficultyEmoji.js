/**
 * Get emoji for difficulty
 * @param {string} difficulty 
 * @returns 
 */
const getDifficultyEmoji = (difficulty) => {
    switch (difficulty) {
        case "Beginner":
            return "🥰";

        case "Intermediate":
            return "☺️"

        case "Expert":
            return "😭"
    
        default:
            return "💀💀"
    }
}

export default getDifficultyEmoji;

//eastern egg