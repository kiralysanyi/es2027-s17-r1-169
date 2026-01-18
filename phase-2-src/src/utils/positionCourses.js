/**
 * Function to add row numbers to course objects in an array
 * @param {Array<Object>} courses - Courses array
 */
const positionCourses = (courses) => {
    // store used rows per column
    const columns = {}

    // cycle through courses and reserve columns / set row number
    // day = column
    for (let i in courses) {
        let startDate = new Date(courses[i].startDate)
        let endDate = new Date(courses[i].endDate)

        let firstDay = startDate.getDate();
        let endDay = endDate.getMonth() == 2 ? endDate.getDate() : 31

        // calculate course days
        let courseDays = [startDate.getDate()]

        for (let index = 0; index < endDay - startDate.getDate(); index++) {
            courseDays.push(startDate.getDate() + index)
        }

        console.log("Days/columns to reserve: ", courseDays)

        for (let i in courseDays) {
            // init column if not existing
            if (columns[courseDays[i]] == undefined) {
                // first row reserved for header
                columns[courseDays[i]] = [0]
            }
        }

        // get first row that has enough space in specified columns
        let targetRow = 1;
        while (courseDays.some(day => columns[day].includes(targetRow))) {
            targetRow++;
        }

        // Reserve that specific row and assign it
        courseDays.forEach(day => columns[day].push(targetRow));
        courses[i]["row"] = targetRow;
    }

    console.log("Columns", columns)
    console.log("Positioned: ", courses)
    return courses;
}

export default positionCourses