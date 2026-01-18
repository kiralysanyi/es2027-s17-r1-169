
/**
 * Calculate how many rows we need in the grid to display courses without overlap.
 * @param {*} courses 
 */
const calculateRowCount = (courses) => {
    const days = {};
    for (let i in courses) {
        let startDate = new Date(courses[i]["startDate"])
        let endDate = new Date(courses[i]["endDate"])
        //if course ends on same day we only bump row count once

        if (startDate.getDate() == endDate.getDate() && startDate.getMonth() == endDate.getMonth()) {
            if (days[startDate.getDate()] == undefined) {
                days[startDate.getDate()] = 0
            }


            days[startDate.getDate()] += 1
        } else {
            //if course multiple days, we bump row count for all of them (if in march)
            if (startDate.getMonth() == 2) {
                if (days[startDate.getDate()] == undefined) {
                    days[startDate.getDate()] = 0
                }

                days[startDate.getDate()] += 1
            }

            if (endDate.getMonth() == 2) {
                if (days[endDate.getDate()] == undefined) {
                    days[endDate.getDate()] = 0
                }

                days[endDate.getDate()] += 1
            }
        }
    }

    let rowCount = 0;

    for (let i in days) {
        if (days[i] > rowCount) {
            rowCount = days[i]
        }
    }

    console.log(days)

    return rowCount;
}

export default calculateRowCount;

// relax, take it easy